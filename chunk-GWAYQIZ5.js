import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

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
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
`;var a=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div class="alert alert-info">
  <div>
    @switch (view) { @case ('month') {
    <span>Click on a month label to change the view to that month.</span>
    } @case ('week') {
    <span>Click on a day header to change the view to that day.</span>
    } @case ('day') {
    <span>There is no other view to navigate to.</span>
    } }
  </div>
</div>

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    (dayClicked)="changeDay($event.day.date)"
  />
  } @case ('week') {
  <mwl-calendar-week-view
    [viewDate]="viewDate"
    [events]="events"
    (dayHeaderClicked)="changeDay($event.day.date)"
  />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var l=[{filename:"component.ts",contents:e},{filename:"template.html",contents:a}];export{l as sources};
