import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date('2016-01-05');

  events: CalendarEvent[] = [
    {
      start: new Date('2016-01-08'),
      end: new Date('2016-01-10'),
      title: 'One day excluded event',
      color: colors.red,
      allDay: true
    },
    {
      start: new Date('2016-01-01'),
      end: new Date('2016-01-09'),
      title: 'Multiple weeks event',
      allDay: true
    }
  ];

  // exclude weekends
  excludeDays: number[] = [0, 6];

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
}
