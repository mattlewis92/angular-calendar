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
  WeekViewAllDayEvent,
  WeekView,
  ViewPeriod,
  WeekViewHourColumn,
  DayViewHourSegment,
  DayViewHour,
  DayViewEvent
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
  trackByWeekDayHeaderDate,
  trackByHourSegment,
  trackByHour,
  getMinutesMoved
} from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
import {
  DragEndEvent,
  DropEvent,
  DragMoveEvent
} from 'angular-draggable-droppable';
import { PlacementArray } from 'positioning';

export interface WeekViewAllDayEventResize {
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
        (drop)="internalEventDropped(true, $event.dropData.event)"
        *ngIf="view.allDayEventRows.length > 0">
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
          *ngFor="let eventRow of view.allDayEventRows; trackBy:trackByIndex"
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
        <div class="cal-time-label-column">
          <div
            *ngFor="let hour of view.hourColumns[0].hours; trackBy:trackByHour; let odd = odd"
            class="cal-hour"
            [class.cal-hour-odd]="odd">
            <mwl-calendar-week-view-hour-segment
              *ngFor="let segment of hour.segments; trackBy:trackByHourSegment"
              [style.height.px]="hourSegmentHeight"
              [segment]="segment"
              [segmentHeight]="hourSegmentHeight"
              [locale]="locale"
              [customTemplate]="hourSegmentTemplate"
              [isTimeLabel]="true">
            </mwl-calendar-week-view-hour-segment>
          </div>
        </div>
        <div
          class="cal-day-columns"
          #dayColumns
          mwlDroppable
          (drop)="internalEventDropped(false, $event.dropData.event)">
          <div
            class="cal-day-column"
            *ngFor="let column of view.hourColumns; trackBy:trackByHourColumn">
            <div
              *ngFor="let weekEvent of column.events; trackBy:trackByEventId"
              #event
              class="cal-event-container"
              [class.cal-draggable]="weekEvent.event.draggable"
              [class.cal-starts-within-day]="!weekEvent.startsBeforeDay"
              [class.cal-ends-within-day]="!weekEvent.endsAfterDay"
              [ngClass]="weekEvent.event.cssClass"
              [hidden]="weekEvent.height === 0 && weekEvent.width === 0"
              [style.top.px]="weekEvent.top"
              [style.height.px]="weekEvent.height"
              [style.left.%]="weekEvent.left"
              [style.width.%]="weekEvent.width"
              mwlDraggable
              dragActiveClass="cal-drag-active"
              [dropData]="{event: weekEvent.event, isInternal: true}"
              [dragAxis]="{
                x: weekEvent.event.draggable && currentResizes.size === 0,
                y: weekEvent.event.draggable && currentResizes.size === 0
              }"
              [dragSnapGrid]="snapDraggedEvents ? {x: dayColumnWidth + 0.5, y: eventSnapSize || hourSegmentHeight} : {}"
              [ghostDragEnabled]="!snapDraggedEvents"
              [validateDrag]="snapDraggedEvents ? validateDrag : false"
              (dragPointerDown)="dragStarted(dayColumns, event, weekEvent)"
              (dragging)="dragMove(weekEvent, $event)"
              (dragEnd)="dragEnded(weekEvent, $event, dayColumnWidth, true)">
              <mwl-calendar-week-view-event
                [weekEvent]="weekEvent"
                [tooltipPlacement]="tooltipPlacement"
                [tooltipTemplate]="tooltipTemplate"
                [tooltipAppendToBody]="tooltipAppendToBody"
                [tooltipDisabled]="dragActive"
                [customTemplate]="eventTemplate"
                [eventTitleTemplate]="eventTitleTemplate"
                (eventClicked)="eventClicked.emit({event: weekEvent.event})">
              </mwl-calendar-week-view-event>
            </div>

            <div
              *ngFor="let hour of column.hours; trackBy:trackByHour; let odd = odd"
              class="cal-hour"
              [class.cal-hour-odd]="odd">
              <mwl-calendar-week-view-hour-segment
                *ngFor="let segment of hour.segments; trackBy:trackByHourSegment"
                [style.height.px]="hourSegmentHeight"
                [segment]="segment"
                [segmentHeight]="hourSegmentHeight"
                [locale]="locale"
                [customTemplate]="hourSegmentTemplate"
                (click)="hourSegmentClicked.emit({date: segment.date})"
                mwlDroppable
                [dragOverClass]="!dragActive || !snapDraggedEvents ? 'cal-drag-over' : null"
                dragActiveClass="cal-drag-active"
                (drop)="eventDropped($event, segment.date)">
              </mwl-calendar-week-view-hour-segment>
            </div>
          </div>
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
   * The grid size to snap resizing and dragging of hourly events to
   */
  @Input() eventSnapSize: number;

  /**
   * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
   */
  @Output()
  dayHeaderClicked = new EventEmitter<{
    day: WeekDay;
  }>();

  /**
   * Called when the event title is clicked
   */
  @Output()
  eventClicked = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output()
  eventTimesChanged = new EventEmitter<CalendarEventTimesChangedEvent>();

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
  currentResizes: Map<
    WeekViewAllDayEvent,
    WeekViewAllDayEventResize
  > = new Map();

  /**
   * @hidden
   */
  eventDroppedWithinContainer = false;

  /**
   * @hidden
   */
  dragActive = false;

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
  trackByIndex = trackByIndex;

  /**
   * @hidden
   */
  trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;

  /**
   * @hidden
   */
  trackByHourSegment = trackByHourSegment;

  /**
   * @hidden
   */
  trackByHour = trackByHour;

  /**
   * @hidden
   */
  trackByHourColumn = (index: number, column: WeekViewHourColumn) =>
    column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;

  /**
   * @hidden
   */
  trackByEventId = (index: number, weekEvent: WeekViewAllDayEvent) =>
    weekEvent.event.id ? weekEvent.event.id : weekEvent.event;

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

    if (
      changes.viewDate ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.hourSegments ||
      changes.weekStartsOn ||
      changes.weekendDays ||
      changes.excludeDays ||
      changes.hourSegmentHeight ||
      changes.events
    ) {
      this.refreshBody();
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
    weekEvent: WeekViewAllDayEvent,
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
    weekEvent: WeekViewAllDayEvent,
    resizeEvent: ResizeEvent,
    dayWidth: number
  ): void {
    const currentResize: WeekViewAllDayEventResize = this.currentResizes.get(
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
  resizeEnded(weekEvent: WeekViewAllDayEvent): void {
    const currentResize: WeekViewAllDayEventResize = this.currentResizes.get(
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

  /**
   * @hidden
   */
  eventDropped(
    dropEvent: DropEvent<{ event?: CalendarEvent; isInternal?: boolean }>,
    date: Date
  ): void {
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
  dragStarted(
    eventsContainer: HTMLElement,
    event: HTMLElement,
    dayEvent?: DayViewEvent
  ): void {
    this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(
      eventsContainer,
      event
    );
    this.validateDrag = ({ x, y }) =>
      this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
    this.eventDroppedWithinContainer = false;
    this.dragActive = true;
    if (!this.snapDraggedEvents && dayEvent) {
      this.view.hourColumns.forEach(column => {
        const linkedEvent = column.events.find(
          columnEvent =>
            columnEvent.event === dayEvent.event && columnEvent !== dayEvent
        );
        // hide any linked events while dragging
        if (linkedEvent) {
          linkedEvent.width = 0;
          linkedEvent.height = 0;
        }
      });
    }
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  dragMove(dayEvent: DayViewEvent, dragEvent: DragMoveEvent) {
    if (this.snapDraggedEvents) {
      const newEventTimes = this.getDragMovedEventTimes(
        dayEvent,
        dragEvent,
        this.dayColumnWidth,
        true
      );
      const originalEvent = dayEvent.event;
      const adjustedEvent = { ...originalEvent, ...newEventTimes };
      const tempEvents = this.events.map(event => {
        if (event === originalEvent) {
          return adjustedEvent;
        }
        return event;
      });
      this.view = this.getWeekView(tempEvents);
      this.view.hourColumns.forEach(column => {
        const existingColumnEvent = column.events.find(
          columnEvent => columnEvent.event === adjustedEvent
        );
        if (existingColumnEvent) {
          // restore the original event so trackBy kicks in and the dom isn't changed
          existingColumnEvent.event = originalEvent;
        } else {
          // add a dummy event to the drop so if the event was removed from the original column the drag doesn't end early
          column.events.push({
            event: originalEvent,
            left: 0,
            top: 0,
            height: 0,
            width: 0,
            startsBeforeDay: false,
            endsAfterDay: false
          });
        }
      });
    }
  }

  /**
   * @hidden
   */
  dragEnded(
    weekEvent: WeekViewAllDayEvent | DayViewEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false
  ): void {
    this.view = this.getWeekView(this.events);
    this.dragActive = false;
    if (this.eventDroppedWithinContainer) {
      const { start, end } = this.getDragMovedEventTimes(
        weekEvent,
        dragEndEvent,
        dayWidth,
        useY
      );
      this.eventTimesChanged.emit({
        newStart: start,
        newEnd: end,
        event: weekEvent.event,
        type: CalendarEventTimesChangedEventType.Drag
      });
    }
  }

  /**
   * @hidden
   */
  internalEventDropped(isAllDay: boolean, event: CalendarEvent) {
    if ((isAllDay && event.allDay) || (!isAllDay && !event.allDay)) {
      this.eventDroppedWithinContainer = true;
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
    this.view = this.getWeekView(this.events);
    this.emitBeforeViewRender();
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

  private emitBeforeViewRender(): void {
    if (this.days && this.view) {
      this.beforeViewRender.emit({
        header: this.days,
        period: this.view.period
      });
    }
  }

  private getWeekView(events: CalendarEvent[]) {
    return this.utils.getWeekView({
      events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays
    });
  }

  private getDragMovedEventTimes(
    weekEvent: WeekViewAllDayEvent | DayViewEvent,
    dragEndEvent: DragEndEvent | DragMoveEvent,
    dayWidth: number,
    useY: boolean
  ) {
    const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
    const minutesMoved = useY
      ? getMinutesMoved(
          dragEndEvent.y,
          this.hourSegments,
          this.hourSegmentHeight,
          this.eventSnapSize
        )
      : 0;

    const start = this.dateAdapter.addMinutes(
      this.dateAdapter.addDays(weekEvent.event.start, daysDragged),
      minutesMoved
    );
    let end: Date;
    if (weekEvent.event.end) {
      end = this.dateAdapter.addMinutes(
        this.dateAdapter.addDays(weekEvent.event.end, daysDragged),
        minutesMoved
      );
    }

    return { start, end };
  }
}
