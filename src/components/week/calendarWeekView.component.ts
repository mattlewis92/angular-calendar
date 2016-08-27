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
import {DEFAULT_LOCALE} from './../../constants';

@Component({
  selector: 'mwl-calendar-week-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cal-week-view">
      <div class="cal-day-headers">
        <mwl-calendar-week-view-header
          *ngFor="let day of days"
          [day]="day"
          [locale]="locale"
          (click)="dayClicked.emit({date: day.date.toDate()})">
        </mwl-calendar-week-view-header>
      </div>
      <div *ngFor="let eventRow of eventRows">
        <div
          class="cal-event-container"
          *ngFor="let weekEvent of eventRow.row"
          [style.width]="((100 / 7) * weekEvent.span) + '%'"
          [style.marginLeft]="((100 / 7) * weekEvent.offset) + '%'">
          <mwl-calendar-week-view-event
            [weekEvent]="weekEvent"
            [tooltipPlacement]="tooltipPlacement"
            (eventClicked)="eventClicked.emit({event: weekEvent.event})">
          </mwl-calendar-week-view-event>
        </div>
      </div>
    </div>
  `
})
export class CalendarWeekView implements OnChanges, OnInit, OnDestroy {

  /**
   * The current view date
   */
  @Input() viewDate: Date;

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

    if (changes.viewDate) {
      this.refreshHeader();
    }

    if (changes.events || changes.viewDate) {
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
      viewDate: this.viewDate
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.viewDate
    });
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

}
