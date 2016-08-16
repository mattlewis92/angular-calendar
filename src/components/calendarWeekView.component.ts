import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {
  WeekDay,
  CalendarEvent,
  WeekViewEventRow,
  getWeekViewHeader,
  getWeekView
} from 'calendar-utils';
import {DEFAULT_LOCALE} from './../constants';

@Component({
  selector: 'mwl-calendar-week-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cal-week-view">
      <div class="cal-day-headers">
        <div
          class="cal-header"
          *ngFor="let day of days; trackBy:trackByItem"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          (click)="dayClicked.emit({date: day.date.toDate()})">
          <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>
          <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
        </div>
      </div>
      <div *ngFor="let eventRow of eventRows; trackBy:trackByItem">
        <div
          class="cal-event-container"
          *ngFor="let event of eventRow.row; trackBy:trackByItem"
          [style.width]="((100 / 7) * event.span) + '%'"
          [style.marginLeft]="((100 / 7) * event.offset) + '%'">
          <div
            class="cal-event"
            [class.cal-starts-within-week]="!event.startsBeforeWeek"
            [class.cal-ends-within-week]="!event.endsAfterWeek"
            [style.backgroundColor]="event.event.color.secondary"
            [ngClass]="event.event?.cssClass"
            [mwlCalendarTooltip]="event.event | calendarEventTitle:'weekTooltip'"
            [tooltipPlacement]="tooltipPlacement">
            <a
              class="cal-event-title"
              href="javascript:;"
              [innerHtml]="event.event | calendarEventTitle:'week'"
              (click)="eventClicked.emit({event: event.event})">
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarWeekView implements OnChanges, OnInit, OnDestroy {

  /**
   * The current view date
   */
  @Input() date: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string = DEFAULT_LOCALE;

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement: string = 'bottom';

  /**
   * Called when a header week day is clicked
   */
  @Output() dayClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  days: WeekDay[];
  eventRows: WeekViewEventRow[] = [];
  refreshSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  ngOnChanges(changes: any): void {

    if (changes.date) {
      this.refreshHeader();
    }

    if (changes.events || changes.date) {
      this.refreshBody();
    }

  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private refreshHeader(): void {
    this.days = getWeekViewHeader({
      viewDate: this.date
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.date
    });
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

  private trackByItem(index: number, obj: any): any {
    return obj;
  }

}
