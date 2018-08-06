import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject,
  OnInit,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import {
  CalendarEvent,
  DayView,
  DayViewHour,
  DayViewHourSegment,
  DayViewEvent,
  ViewPeriod,
  WeekViewAllDayEvent
} from 'calendar-utils';
import { Subject, Subscription } from 'rxjs';
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
  trackByEventId,
  trackByHour,
  trackByHourSegment,
  getMinutesMoved,
  getDefaultEventEnd,
  getMinimumEventHeightInMinutes,
  trackByDayOrWeekEvent,
  isDraggedWithinPeriod,
  shouldFireDroppedEvent
} from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { DragEndEvent } from 'angular-draggable-droppable';
import { PlacementArray } from 'positioning';

export interface CalendarDayViewBeforeRenderEvent {
  body: {
    hourGrid: DayViewHour[];
    allDayEvents: CalendarEvent[];
  };
  period: ViewPeriod;
}

/**
 * @hidden
 */
export interface DayViewEventResize {
  originalTop: number;
  originalHeight: number;
  edge: string;
}

/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
@Component({
  selector: 'mwl-calendar-day-view',
  template: `
    <div class="cal-day-view">
      <div
        class="cal-all-day-events"
        mwlDroppable
        dragOverClass="cal-drag-over"
        dragActiveClass="cal-drag-active"
        (drop)="eventDropped($event, view.period.start, true)">
        <mwl-calendar-day-view-event
          *ngFor="let event of view.allDayEvents; trackBy:trackByEventId"
          [dayEvent]="{event: event}"
          [tooltipPlacement]="tooltipPlacement"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipAppendToBody]="tooltipAppendToBody"
          [customTemplate]="eventTemplate"
          [eventTitleTemplate]="eventTitleTemplate"
          [eventActionsTemplate]="eventActionsTemplate"
          (eventClicked)="eventClicked.emit({event: event})"
          [class.cal-draggable]="!snapDraggedEvents && event.draggable"
          mwlDraggable
          dragActiveClass="cal-drag-active"
          [dropData]="{event: event}"
          [dragAxis]="{x: !snapDraggedEvents && event.draggable, y: !snapDraggedEvents && event.draggable}">
        </mwl-calendar-day-view-event>
      </div>
      <div
        class="cal-hour-rows"
        #dayEventsContainer
        mwlDroppable
        (dragEnter)="eventDragEnter = eventDragEnter + 1"
        (dragLeave)="eventDragEnter = eventDragEnter - 1">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events; trackBy:trackByDayEvent"
            class="cal-event-container"
            [class.cal-draggable]="dayEvent.event.draggable"
            [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
            [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
            [ngClass]="dayEvent.event.cssClass"
            mwlResizable
            [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"
            [resizeSnapGrid]="{top: eventSnapSize || hourSegmentHeight, bottom: eventSnapSize || hourSegmentHeight}"
            [validateResize]="validateResize"
            (resizeStart)="resizeStarted(dayEvent, $event, dayEventsContainer)"
            (resizing)="resizing(dayEvent, $event)"
            (resizeEnd)="resizeEnded(dayEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{event: dayEvent.event}"
            [dragAxis]="{x: !snapDraggedEvents && dayEvent.event.draggable && currentResizes.size === 0, y: dayEvent.event.draggable && currentResizes.size === 0}"
            [dragSnapGrid]="snapDraggedEvents ? {y: eventSnapSize || hourSegmentHeight} : {}"
            [validateDrag]="snapDraggedEvents ? validateDrag : false"
            (dragPointerDown)="dragStarted(event, dayEventsContainer)"
            (dragEnd)="dragEnded(dayEvent, $event)"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1">
            <mwl-calendar-day-view-event
              [dayEvent]="dayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              (eventClicked)="eventClicked.emit({event: dayEvent.event})">
            </mwl-calendar-day-view-event>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours; trackBy:trackByHour" [style.minWidth.px]="view?.width + 70">
          <mwl-calendar-day-view-hour-segment
            *ngFor="let segment of hour.segments; trackBy:trackByHourSegment"
            [style.height.px]="hourSegmentHeight"
            [segment]="segment"
            [segmentHeight]="hourSegmentHeight"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (mwlClick)="hourSegmentClicked.emit({date: segment.date})"
            mwlDroppable
            dragOverClass="cal-drag-over"
            dragActiveClass="cal-drag-active"
            (drop)="eventDropped($event, segment.date, false)">
          </mwl-calendar-day-view-hour-segment>
        </div>
      </div>
    </div>
  `
})
export class CalendarDayViewComponent implements OnChanges, OnInit, OnDestroy {
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
   * The width in pixels of each event on the view
   */
  @Input()
  eventWidth: number = 150;

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
   * The grid size to snap resizing and dragging of events to
   */
  @Input()
  eventSnapSize: number;

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
   * A custom template to use to replace the hour segment
   */
  @Input()
  hourSegmentTemplate: TemplateRef<any>;

  /**
   * A custom template to use for day view events
   */
  @Input()
  eventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  @Input()
  eventTitleTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event actions
   */
  @Input()
  eventActionsTemplate: TemplateRef<any>;

  /**
   * Whether to snap events to a grid when dragging
   */
  @Input()
  snapDraggedEvents: boolean = true;

  /**
   * Called when an event title is clicked
   */
  @Output()
  eventClicked = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
   * Called when an hour segment is clicked
   */
  @Output()
  hourSegmentClicked = new EventEmitter<{
    date: Date;
  }>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output()
  eventTimesChanged = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * An output that will be called before the view is rendered for the current day.
   * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
   */
  @Output()
  beforeViewRender = new EventEmitter<CalendarDayViewBeforeRenderEvent>();

  /**
   * @hidden
   */
  hours: DayViewHour[] = [];

  /**
   * @hidden
   */
  view: DayView;

  /**
   * @hidden
   */
  width: number = 0;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  currentResizes: Map<DayViewEvent, DayViewEventResize> = new Map();

  /**
   * @hidden
   */
  eventDragEnter = 0;

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
  trackByEventId = trackByEventId;

  /**
   * @hidden
   */
  trackByHour = trackByHour;

  /**
   * @hidden
   */
  trackByHourSegment = trackByHourSegment;

  /**
   * @hidden
   */
  trackByDayEvent = trackByDayOrWeekEvent;

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
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
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

    if (changes.events) {
      validateEvents(this.events);
    }

    if (
      changes.viewDate ||
      changes.events ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.eventWidth
    ) {
      this.refreshView();
    }
  }

  eventDropped(
    dropEvent: { dropData?: { event?: CalendarEvent } },
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

  resizeStarted(
    event: DayViewEvent,
    resizeEvent: ResizeEvent,
    dayEventsContainer: HTMLElement
  ): void {
    this.currentResizes.set(event, {
      originalTop: event.top,
      originalHeight: event.height,
      edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
    });
    const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(
      dayEventsContainer
    );
    this.validateResize = ({ rectangle }) =>
      resizeHelper.validateResize({ rectangle });
    this.cdr.markForCheck();
  }

  resizing(event: DayViewEvent, resizeEvent: ResizeEvent): void {
    const currentResize: DayViewEventResize = this.currentResizes.get(event);
    if (resizeEvent.edges.top) {
      event.top = currentResize.originalTop + +resizeEvent.edges.top;
      event.height = currentResize.originalHeight - +resizeEvent.edges.top;
    } else if (resizeEvent.edges.bottom) {
      event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
    }
  }

  resizeEnded(dayEvent: DayViewEvent): void {
    const currentResize: DayViewEventResize = this.currentResizes.get(dayEvent);

    const resizingBeforeStart = currentResize.edge === 'top';
    let pixelsMoved: number;
    if (resizingBeforeStart) {
      pixelsMoved = dayEvent.top - currentResize.originalTop;
    } else {
      pixelsMoved = dayEvent.height - currentResize.originalHeight;
    }

    dayEvent.top = currentResize.originalTop;
    dayEvent.height = currentResize.originalHeight;

    const minutesMoved = getMinutesMoved(
      pixelsMoved,
      this.hourSegments,
      this.hourSegmentHeight,
      this.eventSnapSize
    );

    let newStart: Date = dayEvent.event.start;
    let newEnd: Date = getDefaultEventEnd(
      this.dateAdapter,
      dayEvent.event,
      getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight)
    );
    if (resizingBeforeStart) {
      newStart = this.dateAdapter.addMinutes(newStart, minutesMoved);
    } else {
      newEnd = this.dateAdapter.addMinutes(newEnd, minutesMoved);
    }

    this.eventTimesChanged.emit({
      newStart,
      newEnd,
      event: dayEvent.event,
      type: CalendarEventTimesChangedEventType.Resize
    });
    this.currentResizes.delete(dayEvent);
  }

  dragStarted(event: HTMLElement, dayEventsContainer: HTMLElement): void {
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(
      dayEventsContainer,
      event
    );
    this.validateDrag = ({ x, y }) =>
      this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
    this.eventDragEnter = 0;
    this.cdr.markForCheck();
  }

  dragEnded(dayEvent: DayViewEvent, dragEndEvent: DragEndEvent): void {
    if (this.eventDragEnter > 0) {
      let minutesMoved = getMinutesMoved(
        dragEndEvent.y,
        this.hourSegments,
        this.hourSegmentHeight,
        this.eventSnapSize
      );
      let newStart: Date = this.dateAdapter.addMinutes(
        dayEvent.event.start,
        minutesMoved
      );
      if (dragEndEvent.y < 0 && newStart < this.view.period.start) {
        minutesMoved += this.dateAdapter.differenceInMinutes(
          this.view.period.start,
          newStart
        );
        newStart = this.view.period.start;
      }
      let newEnd: Date;
      if (dayEvent.event.end) {
        newEnd = this.dateAdapter.addMinutes(dayEvent.event.end, minutesMoved);
      }
      if (isDraggedWithinPeriod(newStart, newEnd, this.view.period)) {
        this.eventTimesChanged.emit({
          newStart,
          newEnd,
          event: dayEvent.event,
          type: CalendarEventTimesChangedEventType.Drag
        });
      }
    }
  }

  private refreshHourGrid(): void {
    this.hours = this.utils.getDayViewHourGrid({
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      }
    });
    this.emitBeforeViewRender();
  }

  private refreshView(): void {
    this.view = this.utils.getDayView({
      events: this.events,
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
      eventWidth: this.eventWidth,
      segmentHeight: this.hourSegmentHeight
    });
    this.emitBeforeViewRender();
  }

  private refreshAll(): void {
    this.refreshHourGrid();
    this.refreshView();
  }

  private emitBeforeViewRender(): void {
    if (this.hours && this.view) {
      this.beforeViewRender.emit({
        body: {
          hourGrid: this.hours,
          allDayEvents: this.view.allDayEvents
        },
        period: this.view.period
      });
    }
  }
}
