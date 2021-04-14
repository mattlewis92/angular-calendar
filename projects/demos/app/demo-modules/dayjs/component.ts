import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

dayjs.locale({
  ...en,
  weekStart: DAYS_OF_WEEK.MONDAY,
});

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
