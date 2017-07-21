import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  styles: [
    `
   .odd-cell {
      background-color: pink !important;
    }
  `
  ]
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() % 2 === 1 && day.inMonth) {
        day.cssClass = 'odd-cell';
      }
    });
  }
}
