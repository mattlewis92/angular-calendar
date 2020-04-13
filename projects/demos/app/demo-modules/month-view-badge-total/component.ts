import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent {
  viewDate: Date = new Date();

  events: CalendarEvent<{ incrementsBadgeTotal: boolean }>[] = [
    {
      title: 'Increments badge total on the day cell',
      color: colors.yellow,
      start: new Date(),
      meta: {
        incrementsBadgeTotal: true,
      },
    },
    {
      title: 'Does not increment the badge total on the day cell',
      color: colors.blue,
      start: new Date(),
      meta: {
        incrementsBadgeTotal: false,
      },
    },
  ];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.filter(
        (event) => event.meta.incrementsBadgeTotal
      ).length;
    });
  }
}
