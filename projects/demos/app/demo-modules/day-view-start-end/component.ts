import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  imports: [CalendarDayViewComponent],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Day;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
