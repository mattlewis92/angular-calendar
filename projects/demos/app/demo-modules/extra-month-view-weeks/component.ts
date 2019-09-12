import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
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
