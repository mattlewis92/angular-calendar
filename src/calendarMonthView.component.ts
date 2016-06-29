import {
  Component,
  OnChanges,
  Input
} from '@angular/core';
import {NgFor, SlicePipe} from '@angular/common';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarEvent, WeekDay} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-view',
  template: `
    <div class="month-view">
      <div class="cell-row" *ngFor="let rowIndex of monthOffsets trackBy rowIndex">
        <div class="cell" *ngFor="let day of days | slice : rowIndex : rowIndex + 7 trackBy day">
          <div class="cell-top">
            <span class="day-number">{{ day.date.format('D') }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .month-view {
      border: 1px solid #e1e1e1;
    }
    .cell-row {
      display: flex;
    }
    .cell {
      float: left;
      flex: 1;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    .cell:not(:last-child) {
      border-right: 1px solid #e1e1e1;
    }
    .cell-row:not(:last-child) {
      border-bottom: 1px solid #e1e1e1;
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
      display: flex;
      flex: 1;
      align-items: flex-end;
      margin: 3px;
      margin-bottom: -2px;
    }
    .event {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin: 2px;
    }
  `],
  directives: [NgFor],
  pipes: [SlicePipe]
})
export class CalendarMonthView implements OnChanges {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];

  private days: WeekDay[];
  private monthOffsets: number[];

  ngOnChanges(changes: any): void {

    if (changes.date) {
      const start: Moment = moment(this.date).startOf('month').startOf('week');
      const end: Moment = moment(this.date).endOf('month').endOf('week');
      this.days = [];
      for (let i: number = 0; i < end.diff(start, 'days') + 1; i++) {
        this.days.push({
          date: start.clone().add(i, 'days')
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
