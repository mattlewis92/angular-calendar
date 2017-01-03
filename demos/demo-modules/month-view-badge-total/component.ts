import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

interface MyEvent extends CalendarEvent {
  incrementsBadgeTotal?: boolean;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {

  viewDate: Date = new Date();

  events: MyEvent[] = [{
    title: 'Increments badge total on the day cell',
    color: colors.yellow,
    start: new Date(),
    incrementsBadgeTotal: true
  }, {
    title: 'Does not increment the badge total on the day cell',
    color: colors.blue,
    start: new Date(),
    incrementsBadgeTotal: false
  }];

  addBadgeTotal(day: CalendarMonthViewDay): void {
    day.badgeTotal = day.events.filter(event => event['incrementsBadgeTotal']).length;
  }

}

