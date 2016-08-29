import {Component} from '@angular/core';
import * as moment from 'moment';
import {UnitOfTime, Moment} from 'moment';
import {
  CalendarEvent,
  CalendarEventAction
} from './../angular2-calendar';

@Component({
  selector: 'demo-app',
  styles: [`
    h3 {
      margin: 0;
    }
    .container {
      padding-bottom: 50px;
    }
  `],
  template: `
    <div class="container">
      <div class="row text-center">
        <div class="col-md-4">
           <div class="btn-group">
             <div class="btn btn-primary" (click)="decrement()">
               Previous
             </div>
             <div class="btn btn-default" (click)="today()">
               Today
             </div>
             <div class="btn btn-primary" (click)="increment()">
               Next
             </div>
           </div>
        </div>
        <div class="col-md-4">
          <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
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
        <mwl-calendar-month-view
          *ngSwitchCase="'month'"
          [viewDate]="viewDate"
          [events]="events"
          [activeDayIsOpen]="activeDayIsOpen"
          (dayClicked)="dayClicked($event.day)">
        </mwl-calendar-month-view>
        <mwl-calendar-week-view
          *ngSwitchCase="'week'"
          [viewDate]="viewDate"
          [events]="events">
        </mwl-calendar-week-view>
        <mwl-calendar-day-view
          *ngSwitchCase="'day'"
          [viewDate]="viewDate"
          [events]="events">
        </mwl-calendar-day-view>
      </div>
    </div>
  `
})
export class Demo {

  private view: UnitOfTime = 'month';

  private viewDate: Date = new Date();

  private actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];

  private events: CalendarEvent[] = [{
    start: moment().startOf('month').startOf('week').toDate(),
    title: 'A final event',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(1, 'minutes').add(4, 'days').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'A final event',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(2, 'minutes').add(4, 'days').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'A final event',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(1, 'minutes').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(2, 'minutes').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(3, 'minutes').add(6, 'days').toDate(),
    end: moment().endOf('week').toDate(),
    title: 'I should be last',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'Another event',
    color: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(1, 'minutes').toDate(),
    end: moment().startOf('week').add(5, 'days').toDate(),
    title: 'Another event',
    color: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  }, {
    start: moment().startOf('week').subtract(3, 'days').toDate(),
    end: moment().endOf('week').add(3, 'days').toDate(),
    title: 'My event',
    color: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    actions: this.actions,
    allDay: true
  }, {
    start: moment().startOf('week').add(1, 'days').toDate(),
    end: moment().startOf('week').add(3, 'days').toDate(),
    title: '3 day event',
    color: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    actions: this.actions
  }, {
    start: moment().startOf('week').add(1, 'days').toDate(),
    end: moment().startOf('week').add(2, 'days').toDate(),
    title: '2 day event',
    color: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    actions: this.actions
  }];

  private activeDayIsOpen: boolean = true;

  constructor() {

    for (let i: number = 0; i < 7; i++) {
      for (let j: number = 0; j < 5; j++) {
        this.events.push({
          start: moment().startOf('week').add(j, 'minutes').add(i, 'days').toDate(),
          title: `Event column ${i} count ${j}`,
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
          }
        });
      }
    }

  }

  increment(): void {
    this.viewDate = moment(this.viewDate).add(1, this.view).toDate();
  }

  decrement(): void {
    this.viewDate = moment(this.viewDate).subtract(1, this.view).toDate();
  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({date, events}: {date: Moment, events: CalendarEvent[]}): void {
    if (moment(date).startOf('month').isSame(moment(this.viewDate).startOf('month'))) {
      if (
        (moment(this.viewDate).startOf('day').isSame(date.clone().startOf('day')) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date.toDate();
      }
    }
  }

}
