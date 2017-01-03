import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  subDays,
  addDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths
} from 'date-fns';

@Component({
  selector: 'mwl-calendar-header',
  template: `
    <div class="row text-xs-center">
      <div class="col-md-4">
        <div class="btn-group">
          <div class="btn btn-primary" (click)="decrement()">
            Previous
          </div>
          <div class="btn btn-secondary" (click)="today()">
            Today
          </div>
          <div class="btn btn-primary" (click)="increment()">
            Next
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
      </div>
      <div class="col-md-4">
        <div class="btn-group">
          <div class="btn btn-primary" (click)="viewChange.emit('month')" [class.active]="view === 'month'">Month</div>
          <div class="btn btn-primary" (click)="viewChange.emit('week')" [class.active]="view === 'week'">Week</div>
          <div class="btn btn-primary" (click)="viewChange.emit('day')" [class.active]="view === 'day'">Day</div>
        </div>
      </div>
    </div>
    <br>
  `
})
export class CalendarHeaderComponent {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDateChange.emit(addFn(this.viewDate, 1));

  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDateChange.emit(subFn(this.viewDate, 1));

  }

  today(): void {
    this.viewDateChange.emit(new Date());
  }

}