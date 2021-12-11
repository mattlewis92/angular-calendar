import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styles: [
    `
      .fill-height {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
    `,
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  addEvent(date: Date): void {
    this.events.push({
      start: date,
      title: 'New event',
      color: colors.red,
    });
    this.refresh.next();
  }
}
