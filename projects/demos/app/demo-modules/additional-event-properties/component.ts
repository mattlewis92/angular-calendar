import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ id: number }>> = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2
      }
    }
  ];
}
