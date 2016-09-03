import {Component} from '@angular/core';
import * as moment from 'moment';
import {UnitOfTime, Moment} from 'moment';
import {
  CalendarEvent,
  CalendarEventAction
} from './../angular2-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

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
    start: moment().startOf('day').subtract(1, 'day').toDate(),
    end: moment().add(1, 'day').toDate(),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions
  }, {
    start: moment().startOf('day').toDate(),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions
  }, {
    start: moment().endOf('month').subtract(3, 'days').toDate(),
    end: moment().endOf('month').add(3, 'days').toDate(),
    title: 'A long event that spans 2 months',
    color: colors.blue
  }];

  private activeDayIsOpen: boolean = true;

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
