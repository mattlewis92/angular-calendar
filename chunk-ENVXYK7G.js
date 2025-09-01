import"./chunk-RACSJ3AQ.js";var e=`import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
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
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date('2016-01-05');

  events: CalendarEvent[] = [
    {
      start: new Date('2016-01-08'),
      end: new Date('2016-01-10'),
      title: 'One day excluded event',
      color: colors.red,
      allDay: true,
    },
    {
      start: new Date('2016-01-01'),
      end: new Date('2016-01-09'),
      title: 'Multiple weeks event',
      allDay: true,
    },
  ];

  // exclude weekends
  excludeDays: number[] = [0, 6];

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;

  CalendarView = CalendarView;
}
`;var a=`<div class="row text-center">
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        mwlCalendarPreviousView
        [view]="view"
        [(viewDate)]="viewDate"
        [excludeDays]="excludeDays"
      >
        Previous
      </div>
      <div
        class="btn btn-outline-secondary"
        mwlCalendarToday
        [(viewDate)]="viewDate"
      >
        Today
      </div>
      <div
        class="btn btn-primary"
        mwlCalendarNextView
        [view]="view"
        [(viewDate)]="viewDate"
        [excludeDays]="excludeDays"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <h3>
      {{ viewDate | calendarDate:(view +
      'ViewTitle'):'en':weekStartsOn:excludeDays }}
    </h3>
  </div>
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        (click)="view = CalendarView.Month"
        [class.active]="view === 'month'"
      >
        Month
      </div>
      <div
        class="btn btn-primary"
        (click)="view = CalendarView.Week"
        [class.active]="view === 'week'"
      >
        Week
      </div>
      <div
        class="btn btn-primary"
        (click)="view = CalendarView.Day"
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
    [excludeDays]="excludeDays"
  />
  } @case ('week') {
  <mwl-calendar-week-view
    [excludeDays]="excludeDays"
    [viewDate]="viewDate"
    [events]="events"
  />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var o=[{filename:"component.ts",contents:e},{filename:"template.html",contents:a}];export{o as sources};
