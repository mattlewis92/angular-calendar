import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date()
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date()
    }
  ];

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}
