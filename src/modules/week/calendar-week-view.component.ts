import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject,
  TemplateRef
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  WeekDay,
  CalendarEvent,
  WeekViewEvent,
  WeekView,
  ViewPeriod,
  WeekViewHour,
  WeekViewHourSegment
} from 'calendar-utils';
import { ResizeEvent } from 'angular-resizable-element';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import {
  CalendarEventTimesChangedEvent,
  CalendarEventTimesChangedEventType
} from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import {
  validateEvents,
  trackByIndex,
  roundToNearest,
  trackByWeekDayHeaderDate
} from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { DragEndEvent, DropEvent } from 'angular-draggable-droppable';
import { PlacementArray } from 'positioning';

export interface WeekViewEventResize {
  originalOffset: number;
  originalSpan: number;
  edge: string;
}

export interface CalendarWeekViewBeforeRenderEvent {
  header: WeekDay[];
  period: ViewPeriod;
}

/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
@Component({
  selector: 'mwl-calendar-week-view',
  template: `
    <div class="cal-week-view">
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="eventDropped({dropData: $event}, $event.newStart)">
      </mwl-calendar-week-view-header>
      <div
        class="cal-all-day-events"
        #allDayEventsContainer
        mwlDroppable
        (drop)="eventDroppedWithinContainer = true"
        *ngIf="view.eventRows.length > 0">
        <div class="cal-day-columns">
          <div
            class="cal-day-column" 
            *ngFor="let day of days; trackBy:trackByWeekDayHeaderDate"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="eventDropped($event, day.date)">
          </div>
        </div>
        <div
          *ngFor="let eventRow of view.eventRows; trackBy:trackByIndex"
          #eventRowContainer
          class="cal-events-row">
          <div
            *ngFor="let weekEvent of eventRow.row; trackBy:trackByEventId"
            #event
            class="cal-event-container"
            [class.cal-draggable]="weekEvent.event.draggable"
            [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
            [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
            [ngClass]="weekEvent.event?.cssClass"
            [style.width]="((100 / days.length) * weekEvent.span) + '%'"
            [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'"
            mwlResizable
            [resizeEdges]="{
              left: weekEvent.event?.resizable?.beforeStart, 
              right: weekEvent.event?.resizable?.afterEnd
            }"
            [resizeSnapGrid]="{left: dayColumnWidth, right: dayColumnWidth}"
            [validateResize]="validateResize"
            (resizeStart)="resizeStarted(eventRowContainer, weekEvent, $event)"
            (resizing)="resizing(weekEvent, $event, dayColumnWidth)"
            (resizeEnd)="resizeEnded(weekEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{event: weekEvent.event, isInternal: true}"
            [dragAxis]="{
              x: weekEvent.event.draggable && currentResizes.size === 0,
              y: !snapDraggedEvents && weekEvent.event.draggable && currentResizes.size === 0
            }"
            [dragSnapGrid]="snapDraggedEvents ? {x: dayColumnWidth} : {}"
            [validateDrag]="snapDraggedEvents ? validateDrag : false"
            (dragPointerDown)="dragStarted(eventRowContainer, event)"
            (dragEnd)="dragEnded(weekEvent, $event, dayColumnWidth)">
            <mwl-calendar-week-view-event
              [weekEvent]="weekEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              (eventClicked)="eventClicked.emit({event: weekEvent.event})">
            </mwl-calendar-week-view-event>
          </div>
        </div>
      </div>
      <div class="cal-hour-events">
        <div class="cal-hour" *ngFor="let hour of hours; trackBy:trackByHour">
          <mwl-calendar-week-view-hour-segment
            *ngFor="let segment of hour.segments; trackBy:trackByHourSegment"
            [style.height.px]="hourSegmentHeight"
            [segment]="segment"
            [segmentHeight]="hourSegmentHeight"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (hourSegmentClicked)="hourSegmentClicked.emit({date: $event.date})"
            (eventDropped)="eventDropped($event.dropEvent, $event.date)">
          </mwl-calendar-week-view-hour-segment>
        </div>
      </div>
    </div>
  `
})
export class CalendarWeekViewComponent implements OnChanges, OnInit, OnDestroy {
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string;

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement: PlacementArray = 'auto';

  /**
   * A custom template to use for the event tooltips
   */
  @Input() tooltipTemplate: TemplateRef<any>;

  /**
   * Whether to append tooltips to the body or next to the trigger element
   */
  @Input() tooltipAppendToBody: boolean = true;

  /**
   * The start number of the week
   */
  @Input() weekStartsOn: number;

  /**
   * A custom template to use to replace the header
   */
  @Input() headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use for week view events
   */
  @Input() eventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  @Input() eventTitleTemplate: TemplateRef<any>;

  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input() precision: 'days' | 'minutes' = 'days';

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  @Input() weekendDays: number[];

  /**
   * Whether to snap events to a grid when dragging
   */
  @Input() snapDraggedEvents: boolean = true;

  /**
   * The number of segments in an hour. Must be <= 6
   */
  @Input() hourSegments: number = 2;

  /**
   * The height in pixels of each hour segment
   */
  @Input() hourSegmentHeight: number = 30;

  /**
   * The day start hours in 24 hour time. Must be 0-23
   */
  @Input() dayStartHour: number = 0;

  /**
   * The day start minutes. Must be 0-59
   */
  @Input() dayStartMinute: number = 0;

  /**
   * The day end hours in 24 hour time. Must be 0-23
   */
  @Input() dayEndHour: number = 23;

  /**
   * The day end minutes. Must be 0-59
   */
  @Input() dayEndMinute: number = 59;

  /**
   * A custom template to use to replace the hour segment
   */
  @Input() hourSegmentTemplate: TemplateRef<any>;

  /**
   * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
   */
  @Output()
  dayHeaderClicked: EventEmitter<{ day: WeekDay }> = new EventEmitter<{
    day: WeekDay;
  }>();

  /**
   * Called when the event title is clicked
   */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output()
  eventTimesChanged: EventEmitter<
    CalendarEventTimesChangedEvent
  > = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * An output that will be called before the view is rendered for the current week.
   * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
   */
  @Output()
  beforeViewRender = new EventEmitter<CalendarWeekViewBeforeRenderEvent>();

  /**
   * Called when an hour segment is clicked
   */
  @Output()
  hourSegmentClicked = new EventEmitter<{
    date: Date;
  }>();

  /**
   * @hidden
   */
  days: WeekDay[];

  /**
   * @hidden
   */
  view: WeekView;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  currentResizes: Map<WeekViewEvent, WeekViewEventResize> = new Map();

  /**
   * @hidden
   */
  eventDroppedWithinContainer = false;

  /**
   * @hidden
   */
  validateDrag: (args: any) => boolean;

  /**
   * @hidden
   */
  validateResize: (args: any) => boolean;

  /**
   * @hidden
   */
  dayColumnWidth: number;

  /**
   * @hidden
   */
  hours: WeekViewHour[] = [];

  /**
   * @hidden
   */
  trackByIndex = trackByIndex;

  /**
   * @hidden
   */
  trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;

  /**
   * @hidden
   */
  trackByHourSegment = (index: number, segment: WeekViewHourSegment) =>
    segment.days[0].date.toISOString();

  /**
   * @hidden
   */
  trackByHour = (index: number, hour: WeekViewHour) =>
    hour.segments[0].days[0].date.toISOString();

  /**
   * @hidden
   */
  trackByEventId = (index: number, weekEvent: WeekViewEvent) =>
    weekEvent.event.id ? weekEvent.event.id : weekEvent;

  /**
   * @hidden
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private utils: CalendarUtils,
    @Inject(LOCALE_ID) locale: string,
    private dateAdapter: DateAdapter
  ) {
    this.locale = locale;
  }

  /**
   * @hidden
   */
  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
    if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
      this.refreshHeader();
    }

    if (changes.events) {
      validateEvents(this.events);
    }

    if (changes.events || changes.viewDate || changes.excludeDays) {
      this.refreshBody();
    }

    if (
      changes.viewDate ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.hourSegments
    ) {
      this.refreshHourGrid();
    }
  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  resizeStarted(
    allDayEventsContainer: HTMLElement,
    weekEvent: WeekViewEvent,
    resizeEvent: ResizeEvent
  ): void {
    this.currentResizes.set(weekEvent, {
      originalOffset: weekEvent.offset,
      originalSpan: weekEvent.span,
      edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
    });
    this.dayColumnWidth = this.getDayColumnWidth(allDayEventsContainer);
    const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(
      allDayEventsContainer,
      this.dayColumnWidth
    );
    this.validateResize = ({ rectangle }) =>
      resizeHelper.validateResize({ rectangle });
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  resizing(
    weekEvent: WeekViewEvent,
    resizeEvent: ResizeEvent,
    dayWidth: number
  ): void {
    const currentResize: WeekViewEventResize = this.currentResizes.get(
      weekEvent
    );

    if (resizeEvent.edges.left) {
      const diff: number = Math.round(+resizeEvent.edges.left / dayWidth);
      weekEvent.offset = currentResize.originalOffset + diff;
      weekEvent.span = currentResize.originalSpan - diff;
    } else if (resizeEvent.edges.right) {
      const diff: number = Math.round(+resizeEvent.edges.right / dayWidth);
      weekEvent.span = currentResize.originalSpan + diff;
    }
  }

  /**
   * @hidden
   */
  resizeEnded(weekEvent: WeekViewEvent): void {
    const currentResize: WeekViewEventResize = this.currentResizes.get(
      weekEvent
    );

    const resizingBeforeStart = currentResize.edge === 'left';
    let daysDiff: number;
    if (resizingBeforeStart) {
      daysDiff = weekEvent.offset - currentResize.originalOffset;
    } else {
      daysDiff = weekEvent.span - currentResize.originalSpan;
    }

    weekEvent.offset = currentResize.originalOffset;
    weekEvent.span = currentResize.originalSpan;

    let newStart: Date = weekEvent.event.start;
    let newEnd: Date = weekEvent.event.end || weekEvent.event.start;
    if (resizingBeforeStart) {
      newStart = this.dateAdapter.addDays(newStart, daysDiff);
    } else {
      newEnd = this.dateAdapter.addDays(newEnd, daysDiff);
    }

    this.eventTimesChanged.emit({
      newStart,
      newEnd,
      event: weekEvent.event,
      type: CalendarEventTimesChangedEventType.Resize
    });
    this.currentResizes.delete(weekEvent);
  }

  /**
   * @hidden
   */
  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }

  eventDropped(
    dropEvent: DropEvent<{ event?: CalendarEvent; isInternal?: boolean }>,
    date: Date
  ): void {
    console.log(dropEvent);
    if (
      dropEvent.dropData &&
      dropEvent.dropData.event &&
      !dropEvent.dropData.isInternal
    ) {
      this.eventTimesChanged.emit({
        type: CalendarEventTimesChangedEventType.Drop,
        event: dropEvent.dropData.event,
        newStart: date
      });
    }
  }

  /**
   * @hidden
   */
  dragStarted(allDayEventsContainer: HTMLElement, event: HTMLElement): void {
    this.dayColumnWidth = this.getDayColumnWidth(allDayEventsContainer);
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(
      allDayEventsContainer,
      event
    );
    this.validateDrag = ({ x, y }) =>
      this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
    this.eventDroppedWithinContainer = false;
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  dragEnded(
    weekEvent: WeekViewEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number
  ): void {
    if (this.eventDroppedWithinContainer) {
      const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
      const newStart = this.dateAdapter.addDays(
        weekEvent.event.start,
        daysDragged
      );
      let newEnd: Date;
      if (weekEvent.event.end) {
        newEnd = this.dateAdapter.addDays(weekEvent.event.end, daysDragged);
      }

      this.eventTimesChanged.emit({
        newStart,
        newEnd,
        event: weekEvent.event,
        type: CalendarEventTimesChangedEventType.Drag
      });
    }
  }

  private refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
    this.emitBeforeViewRender();
  }

  private refreshBody(): void {
    this.view = this.utils.getWeekView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true
    });
    this.emitBeforeViewRender();
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.refreshHourGrid();
    this.emitBeforeViewRender();
  }

  private emitBeforeViewRender(): void {
    if (this.days && this.view && this.hours) {
      this.beforeViewRender.emit({
        header: this.days,
        period: this.view.period
      });
    }
  }

  private refreshHourGrid(): void {
    this.hours = this.utils.getWeekViewHourGrid({
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      },
      weekStartsOn: this.weekStartsOn,
      weekendDays: this.weekendDays,
      excluded: this.excludeDays
    });
    this.emitBeforeViewRender();
  }
}
