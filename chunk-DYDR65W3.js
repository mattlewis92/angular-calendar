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
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { DatePipe } from '@angular/common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;
}
`;var t=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div class="alert alert-info">
  Click on a day or time slot on the view. @if (clickedDate) {
  <strong>You clicked on this time: {{ clickedDate | date:'medium' }}</strong>
  } @if (clickedColumn !== undefined) {
  <strong>You clicked on this column: {{ clickedColumn }}</strong>
  }
</div>

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    (columnHeaderClicked)="clickedColumn = $event.isoDayNumber"
    (dayClicked)="clickedDate = $event.day.date"
  />
  } @case ('week') {
  <mwl-calendar-week-view
    [viewDate]="viewDate"
    [events]="events"
    (dayHeaderClicked)="clickedDate = $event.day.date"
    (hourSegmentClicked)="clickedDate = $event.date"
  />
  } @case ('day') {
  <mwl-calendar-day-view
    [viewDate]="viewDate"
    [events]="events"
    (hourSegmentClicked)="clickedDate = $event.date"
  />
  } }
</div>
`;var l=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{l as sources};
