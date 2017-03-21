import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  styles: [`
    .red-cell {
      background-color: red !important;
    }
    .blue-cell {
      background-color: blue !important;
    }
  `]
})
export class DemoComponent {

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  addCssClass: (day: CalendarMonthViewDay) => void;

  cssClass: string = RED_CELL;

  constructor() {
    this.addCssClass = (day: CalendarMonthViewDay): void => {
      if (day.date.getDate() % 2 === 1) {
        day.cssClass = this.cssClass;
      }
    };
  }

  refreshView(): void {
    this.cssClass = this.cssClass === RED_CELL ? BLUE_CELL : RED_CELL;
    this.refresh.next();
  }

}

