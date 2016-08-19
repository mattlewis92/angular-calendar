import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  trigger,
  style,
  transition,
  animate,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import * as moment from 'moment';
import {
  CalendarEvent,
  WeekDay,
  MonthView,
  getWeekViewHeader,
  getMonthView,
  MonthViewDay
} from 'calendar-utils';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {DEFAULT_LOCALE} from './../constants';

@Component({
  selector: 'mwl-calendar-month-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cal-month-view">
      <div class="cal-cell-row cal-header">
        <div class="cal-cell" *ngFor="let header of columnHeaders; trackBy:trackByItem">
          {{ header.date | calendarDate:'monthViewColumnHeader':locale }}
        </div>
      </div>
      <div class="cal-days">
        <div *ngFor="let rowIndex of view.rowOffsets; trackBy:trackByItem">
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + 7; trackBy:trackByItem"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              (cellClicked)="dayClicked.emit({day: day})"
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)">
            </mwl-calendar-month-cell>
          </div>
          <div class="cal-slidebox" [@collapse] *ngIf="openRowIndex === rowIndex">
            <div
              *ngFor="let event of openDay.events; trackBy:trackByItem"
              [ngClass]="event?.cssClass">
              <span class="cal-event" [style.backgroundColor]="event.color.primary"></span>
              <mwl-calendar-event-title
                [event]="event"
                view="month"
                (titleClicked)="eventClicked.emit({event: event})">
              </mwl-calendar-event-title>
              <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({height: 0}),
        animate('150ms linear', style({height: '*'}))
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate('150ms linear', style({height: 0}))
      ])
    ])
  ]
})
export class CalendarMonthView implements OnChanges, OnInit, OnDestroy {

  /**
   * The current view date
   */
  @Input() date: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * Whether the slidebox is opened or not
   */
  @Input() slideBoxIsOpen: boolean = false;

  /**
   * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
   * If you add the `cssClass` property to the cell it will add that class to the cell in the template
   */
  @Input() cellModifier: Function;

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
  @Input() tooltipPlacement: string = 'top';

  /**
   * Called when the day cell is clicked
   */
  @Output() dayClicked: EventEmitter<{day: MonthViewDay}> = new EventEmitter<{day: MonthViewDay}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  columnHeaders: WeekDay[];
  view: MonthView;
  openRowIndex: number;
  openDay: MonthViewDay;
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

    if (changes.date || changes.events) {
      this.refreshBody();
    }

    if (changes.slideBoxIsOpen || changes.date || changes.events) {
      this.refreshSlideBox();
    }

  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private refreshHeader(): void {
    this.columnHeaders = getWeekViewHeader({
      viewDate: this.date
    });
  }

  private refreshBody(): void {
    this.view = getMonthView({
      events: this.events,
      viewDate: this.date
    });
    if (this.cellModifier) {
      this.view.days = this.view.days.map(day => this.cellModifier(day));
    }
  }

  private refreshSlideBox(): void {
    if (this.slideBoxIsOpen === true) {
      this.openDay = this.view.days.find(day => day.date.isSame(moment(this.date).startOf('day')));
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
    this.refreshSlideBox();
  }

  private toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
    this.view.days.forEach(day => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor = event.color.secondary;
      } else {
        delete day.backgroundColor;
      }
    });
  }

  private trackByItem(index: number, obj: any): any {
    return obj;
  }

}
