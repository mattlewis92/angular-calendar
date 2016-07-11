import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {
  NgFor,
  NgIf,
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
    <div class="month-view">
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
              (click)="dayClicked.emit({day: day})">
              <div class="cell-top">
                <span class="day-events-total" *ngIf="day.events.length > 0">{{ day.events.length }}</span>
                <span class="day-number">{{ day.date.format('D') }}</span>
              </div>
              <div class="events">
                <span
                  class="event"
                  *ngFor="let event of day.events"
                  [style.backgroundColor]="event.color.primary">
                </span>
              </div>
            </div>
          </div>
          <div class="slidebox" @collapse *ngIf="openRowIndex === rowIndex && openDay?.events.length > 0">
            <div *ngFor="let event of openDay.events">
              <span class="event" [style.backgroundColor]="event.color.primary"></span>
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      text-align: center;
      font-weight: bolder;
    }
    .cell-row:hover {
      background-color: #fafafa;
    }
    .header .cell {
      padding: 5px 0;
    }
    .cell-row .cell:hover,
    .cell.has-events.open {
      background-color: #ededed;
    }
    .days {
      border: 1px solid #e1e1e1;
      border-bottom: 0px;
    }
    .cell-top {
      min-height: 62px;
    }
    .cell-row {
      display: flex;
    }
    .cell {
      float: left;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    .day-cell {
      min-height: 100px;
    }
    .day-cell:not(:last-child) {
      border-right: 1px solid #e1e1e1;
    }
    .days .cell-row {
      border-bottom: 1px solid #e1e1e1;
    }
    .day-events-total {
      margin-top: 18px;
      margin-left: 10px;
      background-color: #b94a48;
      display: inline-block;
      min-width: 10px;
      padding: 3px 7px;
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      color: white;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 10px;
    }
    .day-number {
      font-size: 1.2em;
      font-weight: 400;
      opacity: 0.5;
      margin-top: 15px;
      margin-right: 15px;
      float: right;
      margin-bottom: 10px;
    }
    .events {
      flex: 1;
      align-items: flex-end;
      margin: 3px;
      line-height: 10px;
      display: flex;
      flex-wrap: wrap;
    }
    .event {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin: 2px;
    }
    .day-cell.in-month.has-events {
      cursor: pointer;
    }
    .day-cell.out-month .day-number {
      opacity: 0.1;
      cursor: default;
    }
    .day-cell.weekend .day-number {
      color: darkred;
    }
    .day-cell.today {
      background-color: #e8fde7;
    }
    .day-cell.today .day-number {
      font-size: 1.9em;
    }
    .slidebox {
      padding: 20px;
      color: white;
      background-color: #555;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
    }
    .slidebox .event {
      position: relative;
      top: 2px;
    }
  `],
  directives: [NgFor, NgIf],
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

}
