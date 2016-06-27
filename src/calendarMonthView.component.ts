import {
  Component,
  OnChanges,
  Input
} from '@angular/core';
import {NgFor, SlicePipe, NgIf} from '@angular/common';
import * as moment from 'moment';
import {Moment} from 'moment';

interface CalendarDay {
  date: Moment;
}

@Component({
  selector: 'mwl-calendar-month-view',
  template: `
    <div class="month-view">
      <div class="cell-row" *ngFor="let rowIndex of monthOffsets trackBy rowIndex">
        <div class="cell" *ngFor="let day of days | slice : rowIndex : rowIndex + 7 trackBy day">
          <span class="day-number">{{ day.date.format('D') }}</span>
          <div class="clearfix"></div>
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
      float: right;
      margin-top: 15px;
      margin-right: 15px;
    }
  `],
  directives: [NgFor, NgIf],
  pipes: [SlicePipe]
})
export class CalendarMonthView implements OnChanges {

  @Input() date: Date;

  private days: CalendarDay[];
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
