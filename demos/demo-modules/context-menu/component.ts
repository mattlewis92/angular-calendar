import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
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
  `
  ]
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  addEvent(date: Date): void {
    this.events.push({
      start: date,
      title: 'New event',
      color: colors.red
    });
    this.refresh.next();
  }
}
