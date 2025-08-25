import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
import {
  CalendarEvent,
  CalendarUtils,
  CalendarMonthViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { subWeeks, startOfMonth, endOfMonth, addWeeks } from 'date-fns';
import { GetMonthViewArgs, MonthView } from 'calendar-utils';

@Injectable()
export class MyCalendarUtils extends CalendarUtils {
  getMonthView(args: GetMonthViewArgs): MonthView {
    args.viewStart = subWeeks(startOfMonth(args.viewDate), 1);
    args.viewEnd = addWeeks(endOfMonth(args.viewDate), 1);
    return super.getMonthView(args);
  }
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  providers: [
    provideCalendar(
      { provide: DateAdapter, useFactory: adapterFactory },
      {
        utils: {
          provide: CalendarUtils,
          useClass: MyCalendarUtils,
        },
      },
    ),
  ],
  imports: [CalendarMonthViewComponent],
})
export class DemoComponent {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
