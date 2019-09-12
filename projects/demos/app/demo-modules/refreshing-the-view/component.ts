import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView
} from 'angular-calendar';
import { Subject } from 'rxjs';

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  styles: [
    `
      .red-cell {
        background-color: red !important;
      }
      .blue-cell {
        background-color: blue !important;
      }
    `
  ]
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  cssClass: string = RED_CELL;

  refreshView(): void {
    this.cssClass = this.cssClass === RED_CELL ? BLUE_CELL : RED_CELL;
    this.refresh.next();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() % 2 === 1) {
        day.cssClass = this.cssClass;
      }
    });
  }
}
