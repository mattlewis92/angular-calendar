import"./chunk-RACSJ3AQ.js";var e=`import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { startOfYear, subYears } from 'date-fns';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

// get your own key from https://holidayapi.com/
const HOLIDAY_API_KEY = '8eb2582d-3a4c-4fc5-94c8-3e21487d4e23';

// change this to your own country
const COUNTRY_CODE = 'US';

interface Holiday {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

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
export class DemoComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate = startOfYear(subYears(new Date(), 1));

  events: CalendarEventWithMeta[] = [];

  private http = inject(HttpClient);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.fetchHolidays();
  }

  private fetchHolidays() {
    this.http
      .get<{ holidays: Holiday[] }>('https://holidayapi.com/v1/holidays', {
        params: {
          country: COUNTRY_CODE,
          year: String(new Date().getFullYear() - 1),
          key: HOLIDAY_API_KEY,
        },
      })
      .subscribe(({ holidays }) => {
        this.events = holidays.map((holiday) => {
          return {
            start: new Date(holiday.date),
            title: holiday.name,
            allDay: true,
            meta: {
              type: 'holiday',
              holiday,
            },
          };
        });
        this.cdr.markForCheck();
      });
  }
}
`;var t=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view [viewDate]="viewDate" [events]="events" />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var l=[{filename:"component.ts",contents:e.replace("8eb2582d-3a4c-4fc5-94c8-3e21487d4e23","REPLACE_WITH_YOUR_OWN_TOKEN")},{filename:"template.html",contents:t}];export{l as sources};
