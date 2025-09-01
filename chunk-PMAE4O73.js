import"./chunk-RACSJ3AQ.js";var e=`import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from 'date-fns';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styles: [
    \`
      .cal-disabled {
        background-color: #eee;
        pointer-events: none;
      }

      .cal-disabled .cal-day-number {
        opacity: 0.1;
      }
    \`,
  ],
  // this is a hack to get styles to apply to the inner component. Your app should just use a global stylesheet
  encapsulation: ViewEncapsulation.None,
  imports: [
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarDatePipe,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView | CalendarPeriod = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  minDate: Date = subMonths(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 1);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  constructor() {
    this.dateOrViewChanged();
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1)),
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1)),
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
}
`;var t=`<div class="row text-center">
  <div class="col-md-4">
    <div class="btn-group">
      <button
        class="btn btn-primary"
        (click)="decrement()"
        [disabled]="prevBtnDisabled"
      >
        Previous
      </button>
      <button class="btn btn-outline-secondary" (click)="today()">Today</button>
      <button
        class="btn btn-primary"
        (click)="increment()"
        [disabled]="nextBtnDisabled"
      >
        Next
      </button>
    </div>
  </div>
  <div class="col-md-4">
    <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
  </div>
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        (click)="changeView('month')"
        [class.active]="view === 'month'"
      >
        Month
      </div>
      <div
        class="btn btn-primary"
        (click)="changeView('week')"
        [class.active]="view === 'week'"
      >
        Week
      </div>
      <div
        class="btn btn-primary"
        (click)="changeView('day')"
        [class.active]="view === 'day'"
      >
        Day
      </div>
    </div>
  </div>
</div>
<br />

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    (beforeViewRender)="beforeMonthViewRender($event)"
  />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var r=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{r as sources};
