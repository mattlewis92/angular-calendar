import {Component} from '@angular/core';
import {CalendarMonthView, CalendarWeekView} from './../angular2-calendar';

@Component({
  selector: 'demo-app',
  directives: [CalendarMonthView, CalendarWeekView],
  template: '<mwl-calendar-week-view [date]="date"></mwl-calendar-week-view>'
})
export class DemoApp {
  private date: Date = new Date();
}
