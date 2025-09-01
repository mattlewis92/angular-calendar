import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
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
    CalendarDatePipe,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
`;var a=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div class="alert alert-info">
  For details on how to customise any of the templates, please see
  <a
    href="https://github.com/mattlewis92/angular-calendar#how-do-i-use-a-custom-template"
    >this guide</a
  >
</div>

<ng-template #customCellTemplate let-day="day" let-locale="locale">
  <div class="cal-cell-top">
    @if (day.badgeTotal > 0) {
    <span class="cal-day-badge">{{ day.badgeTotal }}</span>
    }
    <span class="cal-day-number"
      >{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span
    >
  </div>
  <small style="margin: 5px"
    >There are {{ day.events.length }} events on this day</small
  >
</ng-template>

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [cellTemplate]="customCellTemplate"
  />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var i=[{filename:"component.ts",contents:e},{filename:"template.html",contents:a}];export{i as sources};
