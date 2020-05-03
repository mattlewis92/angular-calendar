import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { startOfYear, subYears } from 'date-fns';

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
})
export class DemoComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate = startOfYear(subYears(new Date(), 1));

  events: CalendarEventWithMeta[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

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
