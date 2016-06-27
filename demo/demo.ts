import {Component} from '@angular/core';
import {CalendarMonthView} from './../angular2-calendar';

@Component({
  selector: 'demo-app',
  directives: [CalendarMonthView],
  template: '<mwl-calendar-month-view [date]="date"></mwl-calendar-month-view>'
})
export class DemoApp {
  private date: Date = new Date();
}
