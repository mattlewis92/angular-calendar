import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {NgFor} from '@angular/common';
import {CalendarDay, CalendarEvent} from './interfaces';

const DAYS_IN_WEEK: number = 7;

@Component({
  selector: 'mwl-calendar-week-view',
  template: `
    <div class="week-view">
      <div class="day-headers">
        <div class="header" *ngFor="let day of days trackBy day">
          <b>{{ day.date.format('dddd') }}</b><br>
          <small>{{ day.date.format('D MMM') }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .week-view {
      border: 1px solid #e1e1e1;
    }
    .day-headers {
      display: flex;
    }
    .day-headers .header {
      flex: 1;
      text-align: center;
      padding: 5px;
    }
    .day-headers .header:not(:last-child) {
      border-right: solid 1px #e1e1e1;
    }
    .day-headers .header:hover {
      background-color: #ededed;
    }
  `],
  directives: [NgFor]
})
export class CalendarWeekView {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];

  private days: CalendarDay[];

  ngOnChanges(changes: any): void {

    if (changes.date) {
      const start: Moment = moment(this.date).startOf('week');
      this.days = [];
      for (let i: number = 0; i < DAYS_IN_WEEK; i++) {
        this.days.push({
          date: start.clone().add(i, 'days')
        });
      }
    }

  }

}
