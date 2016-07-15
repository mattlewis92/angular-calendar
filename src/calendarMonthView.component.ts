import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  trigger,
  style,
  transition,
  animate
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

@Component({
  selector: 'mwl-calendar-month-view',
  template: `
    <div class="calendar-month-view">
      <div class="cell-row header">
        <div class="cell" *ngFor="let header of columnHeaders">
          {{ header.date.format('dddd') }}
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
                <span class="day-number">{{ day.date.format('D') }}</span>
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
          <div class="slidebox" @collapse *ngIf="openRowIndex === rowIndex && openDay?.events.length > 0">
            <div
              *ngFor="let event of openDay.events"
              [ngClass]="event?.cssClass">
              <span class="event" [style.backgroundColor]="event.color.primary"></span>
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [NgFor, NgIf, NgClass],
  pipes: [SlicePipe],
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
export class CalendarMonthView implements OnChanges {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() slideBoxIsOpen: boolean = false;
  @Input() cellModifier: Function;
  @Output() dayClicked: EventEmitter<any> = new EventEmitter();

  private columnHeaders: WeekDay[];
  private view: MonthView;
  private openRowIndex: number;
  private openDay: MonthViewDay;

  ngOnChanges(changes: any): void {

    if (changes.date) {
      this.columnHeaders = getWeekViewHeader({
        viewDate: this.date
      });
    }

    if (changes.date || changes.events) {
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

    if (changes.slideBoxIsOpen || changes.date) {
      if (this.slideBoxIsOpen === true) {
        this.openDay = this.view.days.find(day => day.date.isSame(moment(this.date).startOf('day')));
        const index: number = this.view.days.indexOf(this.openDay);
        this.openRowIndex = Math.floor(index / 7) * 7;
      } else {
        this.openRowIndex = null;
        this.openDay = null;
      }
    }

  }

  toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
    this.view.days.forEach(day => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor = event.color.secondary;
      } else {
        delete day.backgroundColor;
      }
    });
  }

}
