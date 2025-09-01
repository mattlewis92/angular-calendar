import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { addDays } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { colors } from '../demo-utils/colors';
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
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      color: colors.yellow,
      start: new Date(),
      end: addDays(new Date(), 1), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    },
    {
      title: 'A non resizable event',
      color: colors.blue,
      start: new Date(),
      end: addDays(new Date(), 1),
    },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
`;var t=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [activeDayIsOpen]="true"
    [refresh]="refresh"
    (eventTimesChanged)="eventTimesChanged($event)"
  />
  } @case ('week') {
  <mwl-calendar-week-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    (eventTimesChanged)="eventTimesChanged($event)"
  />
  } @case ('day') {
  <mwl-calendar-day-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    (eventTimesChanged)="eventTimesChanged($event)"
  />
  } }
</div>
`;var s=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{s as sources};
