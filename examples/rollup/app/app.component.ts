import 'angular2-calendar/dist/css/angular2-calendar.css';
import { Component } from '@angular/core';
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
