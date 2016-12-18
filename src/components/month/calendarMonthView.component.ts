import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject
} from '@angular/core';
import {
  CalendarEvent,
  WeekDay,
  MonthView,
  getWeekViewHeader,
  getMonthView,
  MonthViewDay
} from 'calendar-utils';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import isSameDay from 'date-fns/is_same_day';
import setDate from 'date-fns/set_date';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import addSeconds from 'date-fns/add_seconds';
import { CalendarEventTimesChangedEvent } from '../../interfaces/calendarEventTimesChangedEvent.interface';

@Component({
  selector: 'mwl-calendar-month-view',
  template: `
    <div class="cal-month-view">
      <div class="cal-cell-row cal-header">
        <div class="cal-cell" *ngFor="let header of columnHeaders">
          {{ header.date | calendarDate:'monthViewColumnHeader':locale }}
        </div>
      </div>
      <div class="cal-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + 7"
              [class.cal-drag-over]="day.dragOver"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              (click)="dayClicked.emit({day: day})"
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              (dragEnter)="day.dragOver = true"
              (dragLeave)="day.dragOver = false"
              (drop)="day.dragOver = false; eventDropped(day, $event.dropData.event)">
            </mwl-calendar-month-cell>
          </div>
          <mwl-calendar-open-day-events
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            (eventClicked)="eventClicked.emit({event: $event.event})">
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `
})
export class CalendarMonthViewComponent implements OnChanges, OnInit, OnDestroy {

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * Whether the events list for the day of the `viewDate` option is visible or not
   */
  @Input() activeDayIsOpen: boolean = false;

  /**
   * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
   * If you add the `cssClass` property to the cell it will add that class to the cell in the template
   */
  @Input() dayModifier: Function;

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
  @Input() tooltipPlacement: string = 'top';

  /**
   * The start number of the week
   */
  @Input() weekStartsOn: number;

  /**
   * Called when the day cell is clicked
   */
  @Output() dayClicked: EventEmitter<{day: MonthViewDay}> = new EventEmitter<{day: MonthViewDay}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  /**
   * Called when an event is dragged and dropped
   */
  @Output() eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * @private
   */
  columnHeaders: WeekDay[];

  /**
   * @private
   */
  view: MonthView;

  /**
   * @private
   */
  openRowIndex: number;

  /**
   * @private
   */
  openDay: MonthViewDay;

  /**
   * @private
   */
  refreshSubscription: Subscription;

  /**
   * @private
   */
  constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
  }

  /**
   * @private
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
   * @private
   */
  ngOnChanges(changes: any): void {

    if (changes.viewDate) {
      this.refreshHeader();
    }

    if (changes.viewDate || changes.events) {
      this.refreshBody();
    }

    if (changes.activeDayIsOpen || changes.viewDate || changes.events) {
      this.checkActiveDayIsOpen();
    }

  }

  /**
   * @private
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @private
   */
  toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
    this.view.days.forEach(day => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor = event.color.secondary;
      } else {
        delete day.backgroundColor;
      }
    });
  }

  /**
   * @private
   */
  eventDropped(day: MonthViewDay, event: CalendarEvent): void {
    const year: number = getYear(day.date);
    const month: number = getMonth(day.date);
    const date: number = getDate(day.date);
    const newStart: Date = setYear(setMonth(setDate(event.start, date), month), year);
    let newEnd: Date;
    if (event.end) {
      const secondsDiff: number = differenceInSeconds(newStart, event.start);
      newEnd = addSeconds(event.end, secondsDiff);
    }
    this.eventTimesChanged.emit({event, newStart, newEnd});
  }

  private refreshHeader(): void {
    this.columnHeaders = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
  }

  private refreshBody(): void {
    this.view = getMonthView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
    if (this.dayModifier) {
      this.view.days.forEach(day => this.dayModifier(day));
    }
  }

  private checkActiveDayIsOpen(): void {
    if (this.activeDayIsOpen === true) {
      this.openDay = this.view.days.find(day => isSameDay(day.date, this.viewDate));
      const index: number = this.view.days.indexOf(this.openDay);
      this.openRowIndex = Math.floor(index / 7) * 7;
    } else {
      this.openRowIndex = null;
      this.openDay = null;
    }
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.checkActiveDayIsOpen();
  }

}
