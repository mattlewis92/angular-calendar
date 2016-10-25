import { Component } from '@angular/core';
import * as startOfDay from 'date-fns/start_of_day/index';

@Component({
  selector: 'my-app',
  template: `
    <mwl-calendar-month-view
      [viewDate]="viewDate"
      [events]="events">
    </mwl-calendar-month-view>
  `
})
export class AppComponent {
  viewDate: Date = new Date();
  events = [];
}

console.log(startOfDay);