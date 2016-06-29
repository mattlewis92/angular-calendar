import {Component} from '@angular/core';
import {NgSwitch} from '@angular/common';
import * as moment from 'moment';
import {CalendarMonthView, CalendarWeekView, CalendarEvent} from './../angular2-calendar';

@Component({
  selector: 'demo-app',
  directives: [NgSwitch, CalendarMonthView, CalendarWeekView],
  styles: [`
    h3 {
      margin: 0;
    }
  `],
  template: `
    <div class="container">
      <div class="row text-center">
        <div class="col-md-4">
           <div class="btn-group">
             <div class="btn btn-primary">
               Previous
             </div>
             <div class="btn btn-default">
               Today
             </div>
             <div class="btn btn-primary">
               Next
             </div>
           </div>
        </div>
        <div class="col-md-4">
          <h3>Calendar title will go here</h3>
        </div>
        <div class="col-md-4">
          <div class="btn-group">
            <div class="btn btn-primary" (click)="view = 'month'" [class.active]="view === 'month'">Month</div>
            <div class="btn btn-primary" (click)="view = 'week'" [class.active]="view === 'week'">Week</div>
            <div class="btn btn-primary" (click)="view = 'day'" [class.active]="view === 'day'">Day</div>
          </div>
        </div>
      </div>
      <br>
      <div [ngSwitch]="view">
        <mwl-calendar-month-view *ngSwitchCase="'month'" [date]="date" [events]="events"></mwl-calendar-month-view>
        <mwl-calendar-week-view *ngSwitchCase="'week'" [date]="date" [events]="events"></mwl-calendar-week-view>
      </div>
    </div>
  `
})
export class DemoApp {

  private view: string = 'month';

  private date: Date = new Date();

  private events: CalendarEvent[] = [{
    start: moment().startOf('week').add(4, 'days').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'A final event',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').add(1, 'minutes').add(4, 'days').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'A final event',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').add(2, 'minutes').add(4, 'days').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'A final event',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').add(1, 'minutes').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').add(2, 'minutes').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').add(3, 'minutes').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: '#FAE3E3'
  }, {
    start: moment().startOf('week').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'Another event',
    color: '#FDF1BA'
  }, {
    start: moment().startOf('week').add(1, 'minutes').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'Another event',
    color: '#FDF1BA'
  }, {
    start: moment().startOf('week').subtract(3, 'days').toDate(),
    end: moment().endOf('week').add(3, 'days').toDate(),
    title: 'My event',
    color: '#D1E8FF'
  }, {
    start: moment().startOf('week').add(1, 'days').toDate(),
    end: moment().startOf('week').add(3, 'days').toDate(),
    title: '3 day event',
    color: '#D1E8FF'
  }, {
    start: moment().startOf('week').add(1, 'days').toDate(),
    end: moment().startOf('week').add(2, 'days').toDate(),
    title: '2 day event',
    color: '#D1E8FF'
  }];

  constructor() {

    for (let i: number = 0; i < 7; i++) {
      for (let j: number = 0; j < 5; j++) {
        this.events.push({
          start: moment().startOf('week').add(j, 'minutes').add(i, 'days').toDate(),
          title: `Event column ${i} count ${j}`,
          color: '#D1E8FF'
        });
      }
    }

  }

}
