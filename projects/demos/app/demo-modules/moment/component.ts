import { Component, ChangeDetectionStrategy } from '@angular/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDateFormatter,
  CalendarMomentDateFormatter,
  MOMENT,
  provideCalendar,
} from 'angular-calendar';
import moment from 'moment';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';

// weekStartsOn option is ignored when using moment, as it needs to be configured globally for the moment locale
moment.updateLocale('en', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0,
  },
});

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

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
    provideCalendar(momentAdapterFactory(), {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CalendarMomentDateFormatter,
      },
    }),
    {
      provide: MOMENT,
      useValue: moment,
    },
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
