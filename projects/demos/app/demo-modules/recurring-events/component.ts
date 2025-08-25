import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
// As an alternative to rrule there is also rSchedule
// See https://github.com/mattlewis92/angular-calendar/issues/711#issuecomment-418537158 for more info
import { RRule } from 'rrule';
import moment from 'moment-timezone';
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
  CalendarDateFormatter,
  CalendarMomentDateFormatter,
  MOMENT,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { colors } from '../demo-utils/colors';
import { ViewPeriod } from 'calendar-utils';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}

// we set the timezone to UTC to avoid issues with DST changes
// see https://github.com/mattlewis92/angular-calendar/issues/717 for more info
moment.tz.setDefault('Utc');

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
    provideCalendar(
      {
        provide: DateAdapter,
        useFactory: () => adapterFactory(moment),
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      },
    ),
    {
      provide: MOMENT,
      useValue: moment,
    },
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = moment().toDate();

  recurringEvents: RecurringEvent[] = [
    {
      title: 'Recurs on the 5th of each month',
      color: colors.yellow,
      rrule: {
        freq: RRule.MONTHLY,
        bymonthday: 5,
      },
    },
    {
      title: 'Recurs yearly on the 10th of the current month',
      color: colors.blue,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: moment().month() + 1,
        bymonthday: 10,
      },
    },
    {
      title: 'Recurs weekly on mondays',
      color: colors.red,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO],
      },
    },
  ];

  calendarEvents: CalendarEvent[] = [];

  viewPeriod: ViewPeriod;

  private cdr = inject(ChangeDetectorRef);

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent,
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.calendarEvents = [];

      this.recurringEvents.forEach((event) => {
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start).startOf('day').toDate(),
          until: moment(viewRender.period.end).endOf('day').toDate(),
        });
        const { title, color } = event;

        rule.all().forEach((date) => {
          this.calendarEvents.push({
            title,
            color,
            start: moment(date).toDate(),
          });
        });
      });
      this.cdr.detectChanges();
    }
  }
}
