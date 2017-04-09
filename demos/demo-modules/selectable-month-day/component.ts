import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  // don't do this in your app, its only so the styles get applied globally
  styles: [`
    .cal-day-selected, 
    .cal-day-selected:hover {
      background-color: deeppink !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent {

  viewDate: Date = new Date();

  selectedDay: CalendarMonthViewDay;

  events: CalendarEvent[] = [];

  selectDay: (day: CalendarMonthViewDay) => void;

  constructor() {
    // an arrow function is used so that `this` is the component instance
    this.selectDay = (day: CalendarMonthViewDay): void => {
      if (this.selectedDay && day.date.getTime() === this.selectedDay.date.getTime()) {
        day.cssClass = 'cal-day-selected';
      }
    };
  }

  dayClicked(day: CalendarMonthViewDay): void {
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    day.cssClass = 'cal-day-selected';
    this.selectedDay = day;
  }

}
