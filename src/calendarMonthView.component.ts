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
  SlicePipe,
  DatePipe
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

@Component({
  selector: 'mwl-calendar-month-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="calendar-month-view">
      <div class="cell-row header">
        <div class="cell" *ngFor="let header of columnHeaders">
          {{ header.date | calendarDate:'month':'columnHeader' }}
        </div>
      </div>
      <div class="days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="cell-row">
            <div
              class="cell day-cell"
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + 7"
              [class.past]="day.isPast"
              [class.today]="day.isToday"
              [class.future]="day.isFuture"
              [class.weekend]="day.isWeekend"
              [class.in-month]="day.inMonth"
              [class.out-month]="!day.inMonth"
              [class.has-events]="day.events.length > 0"
              [class.open]="day === openDay"
              [ngClass]="day?.cssClass"
              [style.backgroundColor]="day.backgroundColor"
              (click)="dayClicked.emit({day: day})">
              <div class="cell-top">
                <span class="day-events-total" *ngIf="day.events.length > 0">{{ day.events.length }}</span>
                <span class="day-number">{{ day.date | calendarDate:'month':'dayNumber' }}</span>
              </div>
              <div class="events">
                <span
                  class="event"
                  *ngFor="let event of day.events"
                  [style.backgroundColor]="event.color.primary"
                  [ngClass]="event?.cssClass"
                  (mouseenter)="toggleDayHighlight(event, true)"
                  (mouseleave)="toggleDayHighlight(event, false)">
                </span>
              </div>
            </div>
          </div>
          <div class="slidebox" @collapse *ngIf="openRowIndex === rowIndex">
            <div
              *ngFor="let event of openDay.events"
              [ngClass]="event?.cssClass">
              <span class="event" [style.backgroundColor]="event.color.primary"></span>
              <a class="event-title" href="javascript:;" [innerHTML]="event.title" (click)="eventClicked.emit({event: event})"></a>
              <span *ngIf="event.actions" class="event-actions">
                <a
                  class="event-action"
                  href="javascript:;"
                  *ngFor="let action of event.actions"
                  (click)="action.click(event)"
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
  pipes: [SlicePipe, CalendarDate],
  providers: [DatePipe],
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({height: 0}),
        animate(150, style({height: '*'}))
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate(150, style({height: 0}))
      ])
    ])
  ]
})
export class CalendarMonthView implements OnChanges, OnInit, OnDestroy {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() slideBoxIsOpen: boolean = false;
  @Input() cellModifier: Function;
  @Input() refresh: Subject<any>;
  @Output() dayClicked: EventEmitter<any> = new EventEmitter();
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

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

}
