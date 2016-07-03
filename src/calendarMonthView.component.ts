import {
  Component,
  OnChanges,
  Input
} from '@angular/core';
import {NgFor, NgIf, SlicePipe} from '@angular/common';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarEvent, WeekDay, getWeekViewHeader} from 'calendar-utils';

interface MonthDay extends WeekDay {
  inMonth: boolean;
  events: CalendarEvent[];
}

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
        <div class="cell-row" *ngFor="let rowIndex of monthOffsets">
          <div
            class="cell day-cell"
            *ngFor="let day of days | slice : rowIndex : rowIndex + 7"
            [class.past]="day.isPast"
            [class.today]="day.isToday"
            [class.future]="day.isFuture"
            [class.weekend]="day.isWeekend"
            [class.in-month]="day.inMonth"
            [class.out-month]="!day.inMonth"
            [class.has-events]="day.events.length > 0">
            <div class="cell-top">
              <span class="day-events-total" *ngIf="day.events.length > 0">{{ day.events.length }}</span>
              <span class="day-number">{{ day.date.format('D') }}</span>
            </div>
            <div class="events">
              <span
                class="event"
                *ngFor="let event of day.events"
                [style.backgroundColor]="event.color">
              </span>
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
    .cell-row .cell:hover {
      background-color: #ededed;
    }
    .days {
      border: 1px solid #e1e1e1;
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
    .days .cell-row:not(:last-child) {
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
  `],
  directives: [NgFor, NgIf],
  pipes: [SlicePipe]
})
export class CalendarMonthView implements OnChanges {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];

  private days: MonthDay[];
  private monthOffsets: number[];
  private columnHeaders: WeekDay[];

  ngOnChanges(changes: any): void {

    if (changes.date) {

      this.columnHeaders = getWeekViewHeader({
        viewDate: this.date
      });

      const start: Moment = moment(this.date).startOf('month').startOf('week');
      const end: Moment = moment(this.date).endOf('month').endOf('week');
      this.days = [];
      for (let i: number = 0; i < end.diff(start, 'days') + 1; i++) {
        const date = start.clone().add(i, 'days');
        const today = moment().startOf('day');
        this.days.push({
          date,
          isPast: date.isBefore(today),
          isToday: date.isSame(today),
          isFuture: date.isAfter(today.clone().endOf('day')),
          isWeekend: [0, 6].indexOf(date.day()) > -1,
          inMonth: date.clone().startOf('month').isSame(moment(this.date).startOf('month')),
          events: []
        });
      }

      const rows: number = Math.floor(this.days.length / 7);
      this.monthOffsets = [];
      for (let i: number = 0; i < rows; i++) {
        this.monthOffsets.push(i * 7);
      }
    }

  }

}
