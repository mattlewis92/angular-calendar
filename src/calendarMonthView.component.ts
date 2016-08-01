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
import {
  NgFor,
  NgIf,
  NgClass,
  SlicePipe
} from '@angular/common';
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
import {CalendarDate} from './calendarDate.pipe';
import {CalendarEventTitle} from './calendarEventTitle.pipe';

@Component({
  selector: 'mwl-calendar-month-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cal-month-view">
      <div class="cal-cell-row cal-header">
        <div class="cal-cell" *ngFor="let header of columnHeaders; trackBy:trackByItem">
          {{ header.date | calendarDate:'monthViewColumnHeader' }}
        </div>
      </div>
      <div class="cal-days">
        <div *ngFor="let rowIndex of view.rowOffsets; trackBy:trackByItem">
          <div class="cal-cell-row">
            <div
              class="cal-cell cal-day-cell"
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + 7; trackBy:trackByItem"
              [class.cal-past]="day.isPast"
              [class.cal-today]="day.isToday"
              [class.cal-future]="day.isFuture"
              [class.cal-weekend]="day.isWeekend"
              [class.cal-in-month]="day.inMonth"
              [class.cal-out-month]="!day.inMonth"
              [class.cal-has-events]="day.events.length > 0"
              [class.cal-open]="day === openDay"
              [ngClass]="day?.cssClass"
              [style.backgroundColor]="day.backgroundColor"
              (click)="dayClicked.emit({day: day})">
              <div class="cal-cell-top">
                <span class="cal-day-events-total" *ngIf="day.events.length > 0">{{ day.events.length }}</span>
                <span class="cal-day-number">{{ day.date | calendarDate:'monthViewDayNumber' }}</span>
              </div>
              <div class="cal-events">
                <span
                  class="cal-event"
                  *ngFor="let event of day.events; trackBy:trackByItem"
                  [style.backgroundColor]="event.color.primary"
                  [ngClass]="event?.cssClass"
                  (mouseenter)="toggleDayHighlight(event, true)"
                  (mouseleave)="toggleDayHighlight(event, false)">
                </span>
              </div>
            </div>
          </div>
          <div class="cal-slidebox" @collapse *ngIf="openRowIndex === rowIndex">
            <div
              *ngFor="let event of openDay.events; trackBy:trackByItem"
              [ngClass]="event?.cssClass">
              <span class="cal-event" [style.backgroundColor]="event.color.primary"></span>
              <a
                class="cal-event-title"
                href="javascript:;"
                [innerHTML]="event | calendarEventTitle:'month'"
                (click)="eventClicked.emit({event: event})">
              </a>
              <span *ngIf="event.actions" class="cal-event-actions">
                <a
                  class="cal-event-action"
                  href="javascript:;"
                  *ngFor="let action of event.actions; trackBy:trackByItem"
                  (click)="action.onClick({event: event})"
                  [ngClass]="action.cssClass"
                  [innerHtml]="action.label">
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [NgFor, NgIf, NgClass],
  pipes: [SlicePipe, CalendarDate, CalendarEventTitle],
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
   * A function that will be called before each cell is rendered
   */
  @Input() cellModifier: Function;

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * Called when the day cell is clicked
   */
  @Output() dayClicked: EventEmitter<{day: MonthViewDay}> = new EventEmitter<{day: MonthViewDay}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  private columnHeaders: WeekDay[];
  private view: MonthView;
  private openRowIndex: number;
  private openDay: MonthViewDay;
  private refreshSubscription: Subscription;

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
    this.view.days = this.view.days.map(day => {
      if (this.cellModifier) {
        return this.cellModifier(day);
      }
      return day;
    });
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
