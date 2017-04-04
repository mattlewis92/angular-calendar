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
  getDayView,
  getDayViewHourGrid,
  CalendarEvent,
  DayView,
  DayViewHour,
  DayViewHourSegment,
  DayViewEvent
} from 'calendar-utils';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ResizeEvent } from 'angular-resizable-element';
import addMinutes from 'date-fns/add_minutes';
import { CalendarDragHelper } from '../../providers/calendarDragHelper.provider';
import { CalendarResizeHelper } from '../../providers/calendarResizeHelper.provider';
import { CalendarEventTimesChangedEvent } from '../../interfaces/calendarEventTimesChangedEvent.interface';

/**
 * @hidden
 */
const SEGMENT_HEIGHT: number = 30;

/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * &lt;mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/mwl-calendar-day-view&gt;
 * ```
 */
@Component({
  selector: 'mwl-calendar-day-view',
  template: `
    <div class="cal-day-view" #dayViewContainer>
      <mwl-calendar-all-day-event
        *ngFor="let event of view.allDayEvents"
        [event]="event"
        (eventClicked)="eventClicked.emit({event: event})">
      </mwl-calendar-all-day-event>
      <div class="cal-hour-rows">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events"
            mwlResizable
            [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"
            [resizeSnapGrid]="{top: eventSnapSize, bottom: eventSnapSize}"
            [validateResize]="validateResize"
            (resizeStart)="resizeStarted(dayEvent, $event, dayViewContainer)"
            (resizing)="resizing(dayEvent, $event)"
            (resizeEnd)="resizeEnded(dayEvent)"
            mwlDraggable
            [dragAxis]="{x: false, y: dayEvent.event.draggable && !currentResize}"
            [dragSnapGrid]="{y: eventSnapSize}"
            [validateDrag]="validateDrag"
            (dragStart)="dragStart(event, dayViewContainer)"
            (dragEnd)="eventDragged(dayEvent, $event.y)"
            class="cal-event"
            [style.marginTop.px]="dayEvent.top"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.height.px]="dayEvent.height"
            [style.width.px]="dayEvent.width - 1"
            [style.backgroundColor]="dayEvent.event.color.secondary"
            [style.borderColor]="dayEvent.event.color.primary"
            [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
            [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
            [class.cal-draggable]="dayEvent.event.draggable"
            [ngClass]="dayEvent.event.cssClass"
            [mwlCalendarTooltip]="dayEvent.event.title | calendarEventTitle:'dayTooltip':dayEvent.event"
            [tooltipPlacement]="tooltipPlacement">
            <mwl-calendar-event-title
              [event]="dayEvent.event"
              view="day"
              (click)="eventClicked.emit({event: dayEvent.event})">
            </mwl-calendar-event-title>
            <mwl-calendar-event-actions [event]="dayEvent.event"></mwl-calendar-event-actions>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="view?.width + 70">
          <mwl-calendar-day-view-hour-segment
            *ngFor="let segment of hour.segments"
            [segment]="segment"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (click)="hourSegmentClicked.emit({date: segment.date})"
            [class.cal-drag-over]="segment.dragOver"
            mwlDroppable
            (dragEnter)="segment.dragOver = true"
            (dragLeave)="segment.dragOver = false"
            (drop)="segment.dragOver = false; eventDropped($event, segment)">
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
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * The number of segments in an hour. Must be <= 6
   */
  @Input() hourSegments: number = 2;

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
   * The width in pixels of each event on the view
   */
  @Input() eventWidth: number = 150;

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string;

  /**
   * A function that will be called before each hour segment is called. The first argument will contain the hour segment.
   * If you add the `cssClass` property to the segment it will add that class to the hour segment in the template
   */
  @Input() hourSegmentModifier: Function;

  /**
   * The grid size to snap resizing and dragging of events to
   */
  @Input() eventSnapSize: number = 30;

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement: string = 'top';

  /**
   * A custom template to use to replace the hour segment
   */
  @Input() hourSegmentTemplate: TemplateRef<any>;

  /**
   * Called when an event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  /**
   * Called when an hour segment is clicked
   */
  @Output() hourSegmentClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output() eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

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
  currentResize: {
    originalTop: number,
    originalHeight: number,
    edge: string
  };

  /**
   * @hidden
   */
  validateDrag: Function;

  /**
   * @hidden
   */
  validateResize: Function;

  /**
   * @hidden
   */
  constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
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
      changes.dayEndMinute
    ) {
      this.refreshHourGrid();
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

  eventDropped(dropEvent: {dropData?: {event?: CalendarEvent}}, segment: DayViewHourSegment): void {
    if (dropEvent.dropData && dropEvent.dropData.event) {
      this.eventTimesChanged.emit({event: dropEvent.dropData.event, newStart: segment.date});
    }
  }

  resizeStarted(event: DayViewEvent, resizeEvent: ResizeEvent, dayViewContainer: HTMLElement): void {
    this.currentResize = {
      originalTop: event.top,
      originalHeight: event.height,
      edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
    };
    const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(dayViewContainer);
    this.validateResize = ({rectangle}) => resizeHelper.validateResize({rectangle});
    this.cdr.markForCheck();
  }

  resizing(event: DayViewEvent, resizeEvent: ResizeEvent): void {
    if (resizeEvent.edges.top) {
      event.top = this.currentResize.originalTop + +resizeEvent.edges.top;
      event.height = this.currentResize.originalHeight - +resizeEvent.edges.top;
    } else if (resizeEvent.edges.bottom) {
      event.height = this.currentResize.originalHeight + +resizeEvent.edges.bottom;
    }
  }

  resizeEnded(dayEvent: DayViewEvent): void {

    let segments: number;
    if (this.currentResize.edge === 'top') {
      segments = (dayEvent.top - this.currentResize.originalTop) / this.eventSnapSize;
    } else {
      segments = (dayEvent.height - this.currentResize.originalHeight) / this.eventSnapSize;
    }

    dayEvent.top = this.currentResize.originalTop;
    dayEvent.height = this.currentResize.originalHeight;

    const segmentAmountInMinutes: number = 60 / this.hourSegments;
    const minutesMoved: number = segments * segmentAmountInMinutes;
    let newStart: Date = dayEvent.event.start;
    let newEnd: Date = dayEvent.event.end;
    if (this.currentResize.edge === 'top') {
      newStart = addMinutes(newStart, minutesMoved);
    } else if (newEnd) {
      newEnd = addMinutes(newEnd, minutesMoved);
    }

    this.eventTimesChanged.emit({newStart, newEnd, event: dayEvent.event});
    this.currentResize = null;

  }

  dragStart(event: HTMLElement, dayViewContainer: HTMLElement): void {
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(dayViewContainer, event);
    this.validateDrag = ({x, y}) => !this.currentResize && dragHelper.validateDrag({x, y});
    this.cdr.markForCheck();
  }

  eventDragged(dayEvent: DayViewEvent, draggedInPixels: number): void {
    const segments: number = draggedInPixels / this.eventSnapSize;
    const segmentAmountInMinutes: number = 60 / this.hourSegments;
    const minutesMoved: number = segments * segmentAmountInMinutes;
    const newStart: Date = addMinutes(dayEvent.event.start, minutesMoved);
    let newEnd: Date;
    if (dayEvent.event.end) {
      newEnd = addMinutes(dayEvent.event.end, minutesMoved);
    }
    this.eventTimesChanged.emit({newStart, newEnd, event: dayEvent.event});
  }

  private refreshHourGrid(): void {
    this.hours = getDayViewHourGrid({
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
    if (this.hourSegmentModifier) {
      this.hours.forEach(hour => {
        hour.segments.forEach(segment => this.hourSegmentModifier(segment));
      });
    }
  }

  private refreshView(): void {
    this.view = getDayView({
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
      segmentHeight: SEGMENT_HEIGHT
    });
  }

  private refreshAll(): void {
    this.refreshHourGrid();
    this.refreshView();
  }

}
