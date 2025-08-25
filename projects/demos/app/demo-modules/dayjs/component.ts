import { Component, ChangeDetectionStrategy } from '@angular/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
} from 'angular-calendar';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
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
  providers: [provideCalendar(adapterFactory())],

})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
