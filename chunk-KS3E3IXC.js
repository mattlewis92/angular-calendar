import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
  CalendarDateFormatter,
  CalendarMomentDateFormatter,
  MOMENT,
} from 'angular-calendar';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

dayjs.locale({
  ...en,
  weekStart: DAYS_OF_WEEK.MONDAY,
});

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  imports: [
    CalendarHeaderComponent,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
  ],
  providers: [
    provideCalendar(
      {
        provide: DateAdapter,
        useFactory: () => adapterFactory(dayjs),
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      },
    ),
    {
      provide: MOMENT,
      useValue: dayjs,
    },
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
`;var a=`<div class="alert alert-info">
  Use this if you're already using dayjs heavily in your app and don't want to
  include date-fns in your bundle, or you need to be able to adjust dates to be
  in a different timezone than the users browser via dayjs-locale
</div>

<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view [viewDate]="viewDate" [events]="events" />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var l=[{filename:"component.ts",contents:e},{filename:"template.html",contents:a}];export{l as sources};
