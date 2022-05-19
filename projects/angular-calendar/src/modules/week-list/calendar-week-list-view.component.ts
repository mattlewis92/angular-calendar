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
  TemplateRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  WeekDay,
  CalendarEvent,
  WeekViewAllDayEvent,
  WeekView,
  WeekViewHourColumn,
  WeekViewAllDayEventRow,
  WeekViewTimeEvent,
} from 'calendar-utils';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import {
  CalendarEventTimesChangedEvent,
  CalendarEventTimesChangedEventType,
} from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import {
  validateEvents,
  roundToNearest,
  trackByWeekDayHeaderDate,
  trackByHourSegment,
  trackByHour,
  addDaysWithExclusions,
  isDraggedWithinPeriod,
  shouldFireDroppedEvent,
  getWeekViewPeriod,
} from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
import {
  DragEndEvent,
  DropEvent,
  DragMoveEvent,
  ValidateDrag,
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
  selector: 'mwl-calendar-week-list-view',
  template: `
    <div class="cal-week-list-view" [ngClass]="{ fillHeight: fillHeight }">
      <mwl-calendar-week-list-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="
          eventDropped({ dropData: $event }, $event.newStart, true)
        "
      >
      </mwl-calendar-week-list-view-header>
      <div class="cal-note-header-container">
        <div
          class="cal-note-header"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
        >
          <ng-template
            [ngTemplateOutlet]="cellWeekNoteHeaderTemplate"
            [ngTemplateOutletContext]="{
              day: day
            }"
          >
          </ng-template>
        </div>
      </div>
      <div
        class="notes-container"
        *ngIf="notesView?.allDayEventRows.length > 0"
      >
        <div class="cal-notes-columns">
          <div
            class="cal-note-column"
            *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          ></div>
        </div>
        <div class="cal-events-row-container">
          <div
            #eventRowContainer
            class="cal-events-row"
            *ngFor="
              let eventRow of notesView.allDayEventRows;
              trackBy: trackById
            "
          >
            <div
              *ngFor="let allDayEvent of eventRow.row"
              #event
              class="cal-event-container"
              [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
              [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
              [ngClass]="allDayEvent.event?.cssClass"
              [style.width.%]="(100 / days.length) * allDayEvent.span"
              [style.left.%]="(100 / days.length) * allDayEvent.offset"
            >
              <ng-template
                [ngTemplateOutlet]="cellWeekNoteTemplate"
                [ngTemplateOutletContext]="{
                  allDayEvent: allDayEvent
                }"
              >
              </ng-template>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="eventDragEnter = eventDragEnter + 1"
        (dragLeave)="eventDragEnter = eventDragEnter - 1"
      >
        <div class="cal-day-columns" #dayColumns>
          <div
            class="cal-day-column"
            #dayColumn
            *ngFor="
              let column of view.hourColumns;
              let i = index;
              trackBy: trackByHourColumn
            "
          >
            <mwl-calendar-week-list-view-day
              [column]="column"
              [day]="days ? days[i] : null"
              [eventTemplate]="eventTemplate"
              [dragActive]="dragActive"
              [customTemplate]="dayTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipDelay]="tooltipDelay"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [validateDrag]="validateDrag"
              (dragStart)="
                dragStarted(dayColumns, $event.event, $event.timeEvent)
              "
              (dragMove)="dragMove($event.timeEvent, $event.event)"
              (dragEnded)="dragEnded($event.timeEvent, $event.event)"
              mwlDroppable
              (drop)="eventDropped($event, days ? days[i].date : null, false)"
            >
            </mwl-calendar-week-list-view-day>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarWeekListViewComponent
  implements OnChanges, OnInit, OnDestroy {
  @Input() notes: CalendarEvent[];

  @Input() cellWeekNoteTemplate: TemplateRef<any>;

  @Input() cellWeekNoteHeaderTemplate: TemplateRef<any>;
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
  @Input() refresh: Subject<boolean>;

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
   * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
   * will be displayed immediately.
   */
  @Input() tooltipDelay: number | null = null;

  /**
   * The start number of the week. This is ignored when the `daysInWeek` input is also set as the `viewDate` will be used as the start of the week instead
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
   * A custom template to use for event actions
   */
  @Input() eventActionsTemplate: TemplateRef<any>;

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
  @Input() snapDraggedEvents: boolean = false;

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
   * A custom template to use for the all day events label text
   */
  @Input() allDayEventsLabelTemplate: TemplateRef<any>;

  /**
   * The number of days in a week. Can be used to create a shorter or longer week view.
   * The first day of the week will always be the `viewDate` and `weekStartsOn` if set will be ignored
   */
  @Input() daysInWeek: number;

  /**
   * Whether to fill all the available height
   */
  @Input() fillHeight: boolean = true;

  /**
   * bottom padding for the future days in pixels
   */
  @Input() bottomPadding: number;

  /**
   * A custom template to use to replace the day column
   */
  @Input()
  dayTemplate: TemplateRef<any>;

  /**
   * The current timezone
   */
  @Input()
  timezone: string;

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
   * Called when the mouse enters a day
   */
  @Output()
  mouseEnter = new EventEmitter<{ day: WeekDay; element: HTMLElement }>();

  /**
   * Called when the mouse leaves a day
   */
  @Output()
  mouseLeave = new EventEmitter<{ day: WeekDay; element: HTMLElement }>();

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
  notesView: WeekView;

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
  eventDragEnter = 0;

  /**
   * @hidden
   */
  dragActive = false;

  /**
   * @hidden
   */
  dragAlreadyMoved = false;

  /**
   * @hidden
   */
  validateDrag: ValidateDrag;

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
  calendarId = Symbol('angular calendar week list view id');

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
  trackByHourColumn = (index: number, column: WeekViewHourColumn) =>
    column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;

  /**
   * @hidden
   */
  trackById = (index: number, row: WeekViewAllDayEventRow) => row.id;

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
    const refreshHeader =
      changes.viewDate ||
      changes.excludeDays ||
      changes.weekendDays ||
      changes.daysInWeek ||
      changes.weekStartsOn;

    const refreshBody =
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
      changes.notes ||
      changes.daysInWeek;

    if (refreshHeader) {
      this.refreshHeader();
    }

    if (changes.events) {
      validateEvents(this.events);
    }

    if (refreshBody) {
      this.refreshBody();
    }

    if (refreshHeader || refreshBody) {
      this.emitBeforeViewRender();
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
  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }

  /**
   * @hidden
   */
  eventDropped(
    dropEvent: DropEvent<{ event?: CalendarEvent; calendarId?: symbol }>,
    date: Date,
    allDay: boolean
  ): void {
    const startDate = dropEvent.dropData.event.start;
    if (date !== startDate) {
      const year: number = this.dateAdapter.getYear(date);
      const month: number = this.dateAdapter.getMonth(date);
      const day: number = this.dateAdapter.getDate(date);
      const newStart: Date = this.dateAdapter.setDate(
        this.dateAdapter.setMonth(
          this.dateAdapter.setYear(startDate, year),
          month
        ),
        day
      );
      if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId)) {
        this.eventTimesChanged.emit({
          type: CalendarEventTimesChangedEventType.Drop,
          event: dropEvent.dropData.event,
          newStart,
          allDay,
        });
      }
    }
  }

  /**
   * @hidden
   */
  dragStarted(
    eventsContainer: HTMLElement,
    event: HTMLElement,
    dayEvent?: WeekViewTimeEvent
  ): void {
    this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(
      eventsContainer,
      event
    );
    this.validateDrag = ({ x, y, transform }) =>
      this.allDayEventResizes.size === 0 &&
      dragHelper.validateDrag({
        x,
        y,
        snapDraggedEvents: this.snapDraggedEvents,
        dragAlreadyMoved: this.dragAlreadyMoved,
        transform,
      });
    this.dragActive = true;
    this.dragAlreadyMoved = false;
    this.eventDragEnter = 0;
    if (!this.snapDraggedEvents && dayEvent) {
      this.view.hourColumns.forEach((column) => {
        const linkedEvent = column.events.find(
          (columnEvent) =>
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
  dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    if (this.snapDraggedEvents) {
      const newEventTimes = this.getDragMovedEventTimes(
        dayEvent,
        dragEvent,
        this.dayColumnWidth
      );
      const originalEvent = dayEvent.event;
      const adjustedEvent = { ...originalEvent, ...newEventTimes };
      const tempEvents = this.events.map((event) => {
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
    this.dragAlreadyMoved = true;
  }

  /**
   * @hidden
   */
  allDayEventDragMove() {
    this.dragAlreadyMoved = true;
  }

  /**
   * @hidden
   */
  dragEnded(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
    dragEndEvent: DragEndEvent
  ): void {
    this.view = this.getWeekView(this.events);
    this.dragActive = false;
    const { start, end } = this.getDragMovedEventTimes(
      weekEvent,
      dragEndEvent,
      this.dayColumnWidth
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
        allDay: false,
      });
    }
  }

  private refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader(
      {
        viewDate: this.viewDate,
        weekStartsOn: this.weekStartsOn,
        excluded: this.excludeDays,
        weekendDays: this.weekendDays,
        ...getWeekViewPeriod(
          this.dateAdapter,
          this.viewDate,
          this.weekStartsOn,
          this.excludeDays,
          this.daysInWeek,
          this.timezone
        ),
      },
      this.timezone
    );
  }

  private refreshBody(): void {
    this.view = this.getWeekView(this.events);
    this.notesView = this.getWeekView(this.notes, false);
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.emitBeforeViewRender();
  }

  private emitBeforeViewRender(): void {
    if (this.days && this.view) {
      this.beforeViewRender.emit({
        header: this.days,
        ...this.view,
      });
    }
  }

  private getWeekView(events: CalendarEvent[], withTimezone: boolean = true) {
    return this.utils.getWeekView(
      {
        events,
        viewDate: this.viewDate,
        weekStartsOn: this.weekStartsOn,
        excluded: this.excludeDays,
        precision: this.precision,
        absolutePositionedEvents: true,
        hourSegments: this.hourSegments,
        dayStart: {
          hour: this.dayStartHour,
          minute: this.dayStartMinute,
        },
        dayEnd: {
          hour: this.dayEndHour,
          minute: this.dayEndMinute,
        },
        segmentHeight: this.hourSegmentHeight,
        weekendDays: this.weekendDays,
        ...getWeekViewPeriod(
          this.dateAdapter,
          this.viewDate,
          this.weekStartsOn,
          this.excludeDays,
          this.daysInWeek,
          this.timezone,
          !withTimezone
        ),
      },
      withTimezone ? this.timezone : null
    );
  }

  private getDragMovedEventTimes(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
    dragEndEvent: DragEndEvent | DragMoveEvent,
    dayWidth: number
  ) {
    const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;

    const start = addDaysWithExclusions(
      this.dateAdapter,
      weekEvent.event.start,
      daysDragged,
      this.excludeDays
    );

    let end: Date;
    if (weekEvent.event.end) {
      end = addDaysWithExclusions(
        this.dateAdapter,
        weekEvent.event.end,
        daysDragged,
        this.excludeDays
      );
    }
    return { start, end };
  }

  private restoreOriginalEvents(
    tempEvents: CalendarEvent[],
    adjustedEvents: Map<CalendarEvent, CalendarEvent>
  ) {
    const previousView = this.view;
    this.view = this.getWeekView(tempEvents);
    const adjustedEventsArray = tempEvents.filter((event) =>
      adjustedEvents.has(event)
    );
    this.view.hourColumns.forEach((column, columnIndex) => {
      previousView.hourColumns[columnIndex].hours.forEach((hour, hourIndex) => {
        hour.segments.forEach((segment, segmentIndex) => {
          column.hours[hourIndex].segments[segmentIndex].cssClass =
            segment.cssClass;
        });
      });
      adjustedEventsArray.forEach((adjustedEvent) => {
        const originalEvent = adjustedEvents.get(adjustedEvent);
        const existingColumnEvent = column.events.find(
          (columnEvent) => columnEvent.event === adjustedEvent
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
            endsAfterDay: false,
          });
        }
      });
    });
    adjustedEvents.clear();
  }
}
