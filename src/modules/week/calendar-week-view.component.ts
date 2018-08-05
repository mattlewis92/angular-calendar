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
  DayViewEvent,
  DayViewHourSegment,
  DayViewHour
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
  getMinutesMoved,
  getDefaultEventEnd,
  getMinimumEventHeightInMinutes,
  addDaysWithExclusions,
  trackByDayOrWeekEvent,
  isDraggedWithinPeriod,
  shouldFireDroppedEvent
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

export interface CalendarWeekViewBeforeRenderEvent extends WeekView {
  header: WeekDay[];
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
        (eventDropped)="eventDropped({dropData: $event}, $event.newStart, true)">
      </mwl-calendar-week-view-header>
      <div
        class="cal-all-day-events"
        #allDayEventsContainer
        *ngIf="view.allDayEventRows.length > 0"
        mwlDroppable
        (dragEnter)="eventDragEnter = eventDragEnter + 1"
        (dragLeave)="eventDragEnter = eventDragEnter - 1">
        <div class="cal-day-columns">
          <div
            class="cal-time-label-column"
            [ngTemplateOutlet]="allDayEventsLabelTemplate">
          </div>
          <div
            class="cal-day-column"
            *ngFor="let day of days; trackBy:trackByWeekDayHeaderDate"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="eventDropped($event, day.date, true)">
          </div>
        </div>
        <div
          *ngFor="let eventRow of view.allDayEventRows; trackBy:trackByIndex"
          #eventRowContainer
          class="cal-events-row">
          <div
            *ngFor="let allDayEvent of eventRow.row; trackBy:trackByDayOrWeekEvent"
            #event
            class="cal-event-container"
            [class.cal-draggable]="allDayEvent.event.draggable && allDayEventResizes.size === 0"
            [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
            [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
            [ngClass]="allDayEvent.event?.cssClass"
            [style.width]="((100 / days.length) * allDayEvent.span) + '%'"
            [style.marginLeft]="((100 / days.length) * allDayEvent.offset) + '%'"
            mwlResizable
            [resizeEdges]="{
              left: allDayEvent.event?.resizable?.beforeStart, 
              right: allDayEvent.event?.resizable?.afterEnd
            }"
            [resizeSnapGrid]="{left: dayColumnWidth, right: dayColumnWidth}"
            [validateResize]="validateResize"
            (resizeStart)="allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)"
            (resizing)="allDayEventResizing(allDayEvent, $event, dayColumnWidth)"
            (resizeEnd)="allDayEventResizeEnded(allDayEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{event: allDayEvent.event}"
            [dragAxis]="{
              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,
              y: !snapDraggedEvents && allDayEvent.event.draggable && allDayEventResizes.size === 0
            }"
            [dragSnapGrid]="snapDraggedEvents ? {x: dayColumnWidth} : {}"
            [validateDrag]="snapDraggedEvents ? validateDrag : false"
            (dragPointerDown)="dragStarted(eventRowContainer, event)"
            (dragEnd)="dragEnded(allDayEvent, $event, dayColumnWidth)">
            <mwl-calendar-week-view-event
              [weekEvent]="allDayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              (eventClicked)="eventClicked.emit({event: allDayEvent.event})">
            </mwl-calendar-week-view-event>
          </div>
        </div>
      </div>
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="eventDragEnter = eventDragEnter + 1"
        (dragLeave)="eventDragEnter = eventDragEnter - 1">
        <div class="cal-time-label-column" *ngIf="view.hourColumns.length > 0">
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
          [class.cal-resize-active]="timeEventResizes.size > 0"
          #dayColumns>
          <div
            class="cal-day-column"
            *ngFor="let column of view.hourColumns; trackBy:trackByHourColumn">
            <div
              *ngFor="let timeEvent of column.events; trackBy:trackByDayOrWeekEvent"
              #event
              class="cal-event-container"
              [class.cal-draggable]="timeEvent.event.draggable && timeEventResizes.size === 0"
              [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
              [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
              [ngClass]="timeEvent.event.cssClass"
              [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
              [style.top.px]="timeEvent.top"
              [style.height.px]="timeEvent.height"
              [style.left.%]="timeEvent.left"
              [style.width.%]="timeEvent.width"
              mwlResizable
              [resizeSnapGrid]="{left: dayColumnWidth, right: dayColumnWidth, top: eventSnapSize || hourSegmentHeight, bottom: eventSnapSize || hourSegmentHeight}"
              [validateResize]="validateResize"
              [allowNegativeResizes]="true"
              (resizeStart)="timeEventResizeStarted(dayColumns, timeEvent, $event)"
              (resizing)="timeEventResizing(timeEvent, $event)"
              (resizeEnd)="timeEventResizeEnded(timeEvent)"
              mwlDraggable
              dragActiveClass="cal-drag-active"
              [dropData]="{event: timeEvent.event}"
              [dragAxis]="{
                x: timeEvent.event.draggable && timeEventResizes.size === 0,
                y: timeEvent.event.draggable && timeEventResizes.size === 0
              }"
              [dragSnapGrid]="snapDraggedEvents ? {x: dayColumnWidth, y: eventSnapSize || hourSegmentHeight} : {}"
              [ghostDragEnabled]="!snapDraggedEvents"
              [validateDrag]="snapDraggedEvents ? validateDrag : false"
              (dragPointerDown)="dragStarted(dayColumns, event, timeEvent)"
              (dragging)="dragMove(timeEvent, $event)"
              (dragEnd)="dragEnded(timeEvent, $event, dayColumnWidth, true)">
              <div
                class="cal-resize-handle cal-resize-handle-before-start"
                *ngIf="timeEvent.event?.resizable?.beforeStart && !timeEvent.startsBeforeDay"
                mwlResizeHandle
                [resizeEdges]="{
                  left: true,
                  top: true
                }">
              </div>
              <mwl-calendar-week-view-event
                [weekEvent]="timeEvent"
                [tooltipPlacement]="tooltipPlacement"
                [tooltipTemplate]="tooltipTemplate"
                [tooltipAppendToBody]="tooltipAppendToBody"
                [tooltipDisabled]="dragActive || timeEventResizes.size > 0"
                [customTemplate]="eventTemplate"
                [eventTitleTemplate]="eventTitleTemplate"
                (eventClicked)="eventClicked.emit({event: timeEvent.event})">
              </mwl-calendar-week-view-event>
              <div
                class="cal-resize-handle cal-resize-handle-after-end"
                *ngIf="timeEvent.event?.resizable?.afterEnd && !timeEvent.endsAfterDay"
                mwlResizeHandle
                [resizeEdges]="{
                  right: true,
                  bottom: true
                }">
              </div>
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
                (mwlClick)="hourSegmentClicked.emit({date: segment.date})"
                mwlDroppable
                [dragOverClass]="!dragActive || !snapDraggedEvents ? 'cal-drag-over' : null"
                dragActiveClass="cal-drag-active"
                (drop)="eventDropped($event, segment.date, false)">
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
  @Input()
  viewDate: Date;

  /**
   * An array of events to display on view
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input()
  events: CalendarEvent[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input()
  excludeDays: number[] = [];

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input()
  refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input()
  locale: string;

  /**
   * The placement of the event tooltip
   */
  @Input()
  tooltipPlacement: PlacementArray = 'auto';

  /**
   * A custom template to use for the event tooltips
   */
  @Input()
  tooltipTemplate: TemplateRef<any>;

  /**
   * Whether to append tooltips to the body or next to the trigger element
   */
  @Input()
  tooltipAppendToBody: boolean = true;

  /**
   * The start number of the week
   */
  @Input()
  weekStartsOn: number;

  /**
   * A custom template to use to replace the header
   */
  @Input()
  headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use for week view events
   */
  @Input()
  eventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  @Input()
  eventTitleTemplate: TemplateRef<any>;

  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input()
  precision: 'days' | 'minutes' = 'days';

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  @Input()
  weekendDays: number[];

  /**
   * Whether to snap events to a grid when dragging
   */
  @Input()
  snapDraggedEvents: boolean = true;

  /**
   * The number of segments in an hour. Must be <= 6
   */
  @Input()
  hourSegments: number = 2;

  /**
   * The height in pixels of each hour segment
   */
  @Input()
  hourSegmentHeight: number = 30;

  /**
   * The day start hours in 24 hour time. Must be 0-23
   */
  @Input()
  dayStartHour: number = 0;

  /**
   * The day start minutes. Must be 0-59
   */
  @Input()
  dayStartMinute: number = 0;

  /**
   * The day end hours in 24 hour time. Must be 0-23
   */
  @Input()
  dayEndHour: number = 23;

  /**
   * The day end minutes. Must be 0-59
   */
  @Input()
  dayEndMinute: number = 59;

  /**
   * A custom template to use to replace the hour segment
   */
  @Input()
  hourSegmentTemplate: TemplateRef<any>;

  /**
   * The grid size to snap resizing and dragging of hourly events to
   */
  @Input()
  eventSnapSize: number;

  /**
   * A custom template to use for the all day events label text
   */
  @Input()
  allDayEventsLabelTemplate: TemplateRef<any>;

  /**
   * The number of days in a week. Can be used to create a shorter or longer week view.
   * The first day of the week will always be the `viewDate`
   */
  @Input()
  daysInWeek: number;

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
  allDayEventResizes: Map<
    WeekViewAllDayEvent,
    WeekViewAllDayEventResize
  > = new Map();

  /**
   * @hidden
   */
  timeEventResizes: Map<CalendarEvent, ResizeEvent> = new Map();

  /**
   * @hidden
   */
  eventDragEnter = 0;

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
  trackByDayOrWeekEvent = trackByDayOrWeekEvent;

  /**
   * @hidden
   */
  trackByHourColumn = (index: number, column: WeekViewHourColumn) =>
    column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;

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
    if (
      changes.viewDate ||
      changes.excludeDays ||
      changes.weekendDays ||
      changes.daysInWeek
    ) {
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
      changes.events ||
      changes.daysInWeek
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

  private resizeStarted(eventsContainer: HTMLElement, minWidth?: number) {
    this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
    const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(
      eventsContainer,
      minWidth
    );
    this.validateResize = ({ rectangle }) =>
      resizeHelper.validateResize({ rectangle });
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  timeEventResizeStarted(
    eventsContainer: HTMLElement,
    timeEvent: DayViewEvent,
    resizeEvent: ResizeEvent
  ): void {
    this.timeEventResizes.set(timeEvent.event, resizeEvent);
    this.resizeStarted(eventsContainer);
  }

  /**
   * @hidden
   */
  timeEventResizing(timeEvent: DayViewEvent, resizeEvent: ResizeEvent) {
    this.timeEventResizes.set(timeEvent.event, resizeEvent);
    const adjustedEvents = new Map<CalendarEvent, CalendarEvent>();

    const tempEvents = [...this.events];

    this.timeEventResizes.forEach((lastResizeEvent, event) => {
      const newEventDates = this.getTimeEventResizedDates(
        event,
        lastResizeEvent
      );
      const adjustedEvent = { ...event, ...newEventDates };
      adjustedEvents.set(adjustedEvent, event);
      const eventIndex = tempEvents.indexOf(event);
      tempEvents[eventIndex] = adjustedEvent;
    });

    this.restoreOriginalEvents(tempEvents, adjustedEvents);
  }

  /**
   * @hidden
   */
  timeEventResizeEnded(timeEvent: DayViewEvent) {
    this.view = this.getWeekView(this.events);
    const lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
    this.timeEventResizes.delete(timeEvent.event);
    const newEventDates = this.getTimeEventResizedDates(
      timeEvent.event,
      lastResizeEvent
    );
    this.eventTimesChanged.emit({
      newStart: newEventDates.start,
      newEnd: newEventDates.end,
      event: timeEvent.event,
      type: CalendarEventTimesChangedEventType.Resize
    });
  }

  /**
   * @hidden
   */
  allDayEventResizeStarted(
    allDayEventsContainer: HTMLElement,
    allDayEvent: WeekViewAllDayEvent,
    resizeEvent: ResizeEvent
  ): void {
    this.allDayEventResizes.set(allDayEvent, {
      originalOffset: allDayEvent.offset,
      originalSpan: allDayEvent.span,
      edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
    });
    this.resizeStarted(
      allDayEventsContainer,
      this.getDayColumnWidth(allDayEventsContainer)
    );
  }

  /**
   * @hidden
   */
  allDayEventResizing(
    allDayEvent: WeekViewAllDayEvent,
    resizeEvent: ResizeEvent,
    dayWidth: number
  ): void {
    const currentResize: WeekViewAllDayEventResize = this.allDayEventResizes.get(
      allDayEvent
    );

    if (resizeEvent.edges.left) {
      const diff: number = Math.round(+resizeEvent.edges.left / dayWidth);
      allDayEvent.offset = currentResize.originalOffset + diff;
      allDayEvent.span = currentResize.originalSpan - diff;
    } else if (resizeEvent.edges.right) {
      const diff: number = Math.round(+resizeEvent.edges.right / dayWidth);
      allDayEvent.span = currentResize.originalSpan + diff;
    }
  }

  /**
   * @hidden
   */
  allDayEventResizeEnded(allDayEvent: WeekViewAllDayEvent): void {
    const currentResize: WeekViewAllDayEventResize = this.allDayEventResizes.get(
      allDayEvent
    );

    const allDayEventResizingBeforeStart = currentResize.edge === 'left';
    let daysDiff: number;
    if (allDayEventResizingBeforeStart) {
      daysDiff = allDayEvent.offset - currentResize.originalOffset;
    } else {
      daysDiff = allDayEvent.span - currentResize.originalSpan;
    }

    allDayEvent.offset = currentResize.originalOffset;
    allDayEvent.span = currentResize.originalSpan;

    let newStart: Date = allDayEvent.event.start;
    let newEnd: Date = allDayEvent.event.end || allDayEvent.event.start;
    if (allDayEventResizingBeforeStart) {
      newStart = this.dateAdapter.addDays(newStart, daysDiff);
    } else {
      newEnd = this.dateAdapter.addDays(newEnd, daysDiff);
    }

    this.eventTimesChanged.emit({
      newStart,
      newEnd,
      event: allDayEvent.event,
      type: CalendarEventTimesChangedEventType.Resize
    });
    this.allDayEventResizes.delete(allDayEvent);
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
    dropEvent: DropEvent<{ event?: CalendarEvent }>,
    date: Date,
    allDay: boolean
  ): void {
    if (shouldFireDroppedEvent(dropEvent, date, allDay, this.events)) {
      this.eventTimesChanged.emit({
        type: CalendarEventTimesChangedEventType.Drop,
        event: dropEvent.dropData.event,
        newStart: date,
        allDay
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
      this.allDayEventResizes.size === 0 &&
      this.timeEventResizes.size === 0 &&
      dragHelper.validateDrag({ x, y });
    this.dragActive = true;
    this.eventDragEnter = 0;
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
      this.restoreOriginalEvents(
        tempEvents,
        new Map([[adjustedEvent, originalEvent]])
      );
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
    const { start, end } = this.getDragMovedEventTimes(
      weekEvent,
      dragEndEvent,
      dayWidth,
      useY
    );
    if (
      this.eventDragEnter > 0 &&
      isDraggedWithinPeriod(start, end, this.view.period)
    ) {
      this.eventTimesChanged.emit({
        newStart: start,
        newEnd: end,
        event: weekEvent.event,
        type: CalendarEventTimesChangedEventType.Drag,
        allDay: !useY
      });
    }
  }

  private refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader(
      this.adjustDaysInWeek({
        viewDate: this.viewDate,
        weekStartsOn: this.weekStartsOn,
        excluded: this.excludeDays,
        weekendDays: this.weekendDays
      })
    );
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
        ...this.view
      });
    }
  }

  private getWeekView(events: CalendarEvent[]) {
    return this.utils.getWeekView(
      this.adjustDaysInWeek({
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
      })
    );
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

  private restoreOriginalEvents(
    tempEvents: CalendarEvent[],
    adjustedEvents: Map<CalendarEvent, CalendarEvent>
  ) {
    this.view = this.getWeekView(tempEvents);
    const adjustedEventsArray = tempEvents.filter(event =>
      adjustedEvents.has(event)
    );
    this.view.hourColumns.forEach(column => {
      adjustedEventsArray.forEach(adjustedEvent => {
        const originalEvent = adjustedEvents.get(adjustedEvent);
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
    });
    adjustedEvents.clear();
  }

  private getTimeEventResizedDates(
    calendarEvent: CalendarEvent,
    resizeEvent: ResizeEvent
  ) {
    const minimumEventHeight = getMinimumEventHeightInMinutes(
      this.hourSegments,
      this.hourSegmentHeight
    );
    const newEventDates = {
      start: calendarEvent.start,
      end: getDefaultEventEnd(
        this.dateAdapter,
        calendarEvent,
        minimumEventHeight
      )
    };
    const { end, ...eventWithoutEnd } = calendarEvent;
    const smallestResizes = {
      start: this.dateAdapter.addMinutes(
        newEventDates.end,
        minimumEventHeight * -1
      ),
      end: getDefaultEventEnd(
        this.dateAdapter,
        eventWithoutEnd,
        minimumEventHeight
      )
    };

    if (resizeEvent.edges.left) {
      const daysDiff = Math.round(
        +resizeEvent.edges.left / this.dayColumnWidth
      );
      const newStart = this.dateAdapter.addDays(newEventDates.start, daysDiff);
      if (newStart < smallestResizes.start) {
        newEventDates.start = newStart;
      } else {
        newEventDates.start = smallestResizes.start;
      }
    } else if (resizeEvent.edges.right) {
      const daysDiff = Math.round(
        +resizeEvent.edges.right / this.dayColumnWidth
      );
      const newEnd = this.dateAdapter.addDays(newEventDates.end, daysDiff);
      if (newEnd > smallestResizes.end) {
        newEventDates.end = newEnd;
      } else {
        newEventDates.end = smallestResizes.end;
      }
    }

    if (resizeEvent.edges.top) {
      const minutesMoved = getMinutesMoved(
        resizeEvent.edges.top as number,
        this.hourSegments,
        this.hourSegmentHeight,
        this.eventSnapSize
      );
      const newStart = this.dateAdapter.addMinutes(
        newEventDates.start,
        minutesMoved
      );
      if (newStart < smallestResizes.start) {
        newEventDates.start = newStart;
      } else {
        newEventDates.start = smallestResizes.start;
      }
    } else if (resizeEvent.edges.bottom) {
      const minutesMoved = getMinutesMoved(
        resizeEvent.edges.bottom as number,
        this.hourSegments,
        this.hourSegmentHeight,
        this.eventSnapSize
      );
      const newEnd = this.dateAdapter.addMinutes(
        newEventDates.end,
        minutesMoved
      );
      if (newEnd > smallestResizes.end) {
        newEventDates.end = newEnd;
      } else {
        newEventDates.end = smallestResizes.end;
      }
    }

    return newEventDates;
  }

  private adjustDaysInWeek(args: any): any {
    if (this.daysInWeek) {
      args.viewStart = this.dateAdapter.startOfDay(args.viewDate);
      args.viewEnd = this.dateAdapter.endOfDay(
        addDaysWithExclusions(
          this.dateAdapter,
          args.viewStart,
          this.daysInWeek - 1,
          this.excludeDays
        )
      );
    }
    return args;
  }
}
