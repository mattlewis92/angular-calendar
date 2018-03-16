import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import subWeeks from 'date-fns/esm/subWeeks';
import startOfMonth from 'date-fns/esm/startOfMonth';
import endOfMonth from 'date-fns/esm/endOfMonth';
import addWeeks from 'date-fns/esm/addWeeks';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';

export class MyCalendarUtils extends CalendarUtils {
  getMonthView(args: GetMonthViewArgs): MonthView {
    args.viewStart = subWeeks(startOfMonth(args.viewDate), 1);
    args.viewEnd = addWeeks(endOfMonth(args.viewDate), 1);
    return getMonthView(args);
  }
}

// tslint:disable-next-line
@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  providers: [
    {
      provide: CalendarUtils,
      useClass: MyCalendarUtils
    }
  ]
})
export class DemoComponent {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
