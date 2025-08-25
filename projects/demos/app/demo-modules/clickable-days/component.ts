import { Component, ChangeDetectionStrategy } from '@angular/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
} from 'angular-calendar';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  imports: [
    CalendarHeaderComponent,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    DatePipe,
  ],
  providers: [provideCalendar(adapterFactory())],

})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;
}
