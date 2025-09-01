import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { setMinutes, setHours } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarWeekViewComponent,
  provideCalendar,
  DateAdapter,
  CalendarNativeDateFormatter,
  DateFormatterParams,
  CalendarDateFormatter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Injectable()
class CustomDateFormatter extends CalendarDateFormatter {
  weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).format(date);
  }
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  imports: [CalendarWeekViewComponent],
  providers: [
    provideCalendar(
      { provide: DateAdapter, useFactory: adapterFactory },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter,
        },
      },
    ),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      start: setHours(setMinutes(new Date(), 20), 15),
      end: setHours(setMinutes(new Date(), 40), 17),
      title: 'An event',
      resizable: {
        afterEnd: true,
      },
      draggable: true,
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
`;var t=`<mwl-calendar-week-view
  [viewDate]="viewDate"
  [events]="events"
  [hourDuration]="40"
  [hourSegments]="2"
  [refresh]="refresh"
  (eventTimesChanged)="eventTimesChanged($event)"
/>
`;var d=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{d as sources};
