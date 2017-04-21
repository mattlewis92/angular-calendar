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
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {
  WeekDay,
  CalendarEvent,
  WeekViewEvent,
  WeekViewEventRow,
  getWeekViewHeader,
  getWeekView
} from 'calendar-utils';
import { ResizeEvent } from 'angular-resizable-element';
import addDays from 'date-fns/add_days';
import { CalendarDragHelper } from '../../providers/calendarDragHelper.provider';
import { CalendarResizeHelper } from '../../providers/calendarResizeHelper.provider';
import { CalendarEventTimesChangedEvent } from '../../interfaces/calendarEventTimesChangedEvent.interface';

/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * &lt;mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/mwl-calendar-week-view&gt;
 * ```
 */
@Component({
  selector: 'mwl-calendar-week-view',
  template: `
    <div class="cal-week-view" #weekViewContainer>
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayClicked)="dayClicked.emit($event)"
        (eventDropped)="eventTimesChanged.emit($event)">
      </mwl-calendar-week-view-header>
      <div *ngFor="let eventRow of eventRows" #eventRowContainer>
        <div
          class="cal-event-container"
          #event
          [class.cal-draggable]="weekEvent.event.draggable"
          *ngFor="let weekEvent of eventRow.row"
          [style.width]="((100 / days.length) * weekEvent.span) + '%'"
          [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'"
          mwlResizable
          [resizeEdges]="{left: weekEvent.event?.resizable?.beforeStart, right: weekEvent.event?.resizable?.afterEnd}"
          [resizeSnapGrid]="{left: getDayColumnWidth(eventRowContainer), right: getDayColumnWidth(eventRowContainer)}"
          [validateResize]="validateResize"
          (resizeStart)="resizeStarted(weekViewContainer, weekEvent, $event)"
          (resizing)="resizing(weekEvent, $event, getDayColumnWidth(eventRowContainer))"
          (resizeEnd)="resizeEnded(weekEvent)"
          mwlDraggable
          [dragAxis]="{x: weekEvent.event.draggable && !currentResize, y: false}"
          [dragSnapGrid]="{x: getDayColumnWidth(eventRowContainer)}"
          [validateDrag]="validateDrag"
          (dragStart)="dragStart(weekViewContainer, event)"
          (dragEnd)="eventDragged(weekEvent, $event.x, getDayColumnWidth(eventRowContainer))">
          <mwl-calendar-week-view-event
            [weekEvent]="weekEvent"
            [tooltipPlacement]="tooltipPlacement"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit({event: weekEvent.event})">
          </mwl-calendar-week-view-event>
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
  @Input() tooltipPlacement: string = 'bottom';

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
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input() precision: 'days' | 'minutes' = 'days';

  /**
   * Called when a header week day is clicked
   */
  @Output() dayClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output() eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * @hidden
   */
  days: WeekDay[];

  /**
   * @hidden
   */
  eventRows: WeekViewEventRow[] = [];

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  currentResize: {
    originalOffset: number,
    originalSpan: number,
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
        this.cdr.detectChanges();
      });
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {

    if (changes.viewDate || changes.excludeDays) {
      this.refreshHeader();
    }

    if (changes.events || changes.viewDate || changes.excludeDays) {
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
  resizeStarted(weekViewContainer: HTMLElement, weekEvent: WeekViewEvent, resizeEvent: ResizeEvent): void {
    this.currentResize = {
      originalOffset: weekEvent.offset,
      originalSpan: weekEvent.span,
      edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
    };
    const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(weekViewContainer, this.getDayColumnWidth(weekViewContainer));
    this.validateResize = ({rectangle}) => resizeHelper.validateResize({rectangle});
    this.cdr.detectChanges();
  }

  /**
   * @hidden
   */
  resizing(weekEvent: WeekViewEvent, resizeEvent: ResizeEvent, dayWidth: number): void {
    if (resizeEvent.edges.left) {
      const diff: number = Math.round(+resizeEvent.edges.left / dayWidth);
      weekEvent.offset = this.currentResize.originalOffset + diff;
      weekEvent.span = this.currentResize.originalSpan - diff;
    } else if (resizeEvent.edges.right) {
      const diff: number = Math.round(+resizeEvent.edges.right / dayWidth);
      weekEvent.span = this.currentResize.originalSpan + diff;
    }
  }

  /**
   * @hidden
   */
  resizeEnded(weekEvent: WeekViewEvent): void {

    let daysDiff: number;
    if (this.currentResize.edge === 'left') {
      daysDiff = weekEvent.offset - this.currentResize.originalOffset;
    } else {
      daysDiff = weekEvent.span - this.currentResize.originalSpan;
    }

    weekEvent.offset = this.currentResize.originalOffset;
    weekEvent.span = this.currentResize.originalSpan;

    let newStart: Date = weekEvent.event.start;
    let newEnd: Date = weekEvent.event.end;
    if (this.currentResize.edge === 'left') {
      newStart = addDays(newStart, daysDiff);
    } else if (newEnd) {
      newEnd = addDays(newEnd, daysDiff);
    }

    this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event});
    this.currentResize = null;

  }

  /**
   * @hidden
   */
  eventDragged(weekEvent: WeekViewEvent, draggedByPx: number, dayWidth: number): void {

    const daysDragged: number = draggedByPx / dayWidth;
    const newStart: Date = addDays(weekEvent.event.start, daysDragged);
    let newEnd: Date;
    if (weekEvent.event.end) {
      newEnd = addDays(weekEvent.event.end, daysDragged);
    }

    this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event});

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
  dragStart(weekViewContainer: HTMLElement, event: HTMLElement): void {
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(weekViewContainer, event);
    this.validateDrag = ({x, y}) => !this.currentResize && dragHelper.validateDrag({x, y});
    this.cdr.detectChanges();
  }

  private refreshHeader(): void {
    this.days = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision
    });
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

}
