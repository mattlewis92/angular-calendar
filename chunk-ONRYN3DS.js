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
import { colors } from '../demo-utils/colors';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
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
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent<{ id: number }>[] = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1,
      },
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2,
      },
    },
  ];
}
`;var t=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [activeDayIsOpen]="true"
  />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var m=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{m as sources};
