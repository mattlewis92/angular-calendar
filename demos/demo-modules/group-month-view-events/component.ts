import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styles: [
    `
    .cell-totals {
      margin: 5px;
      text-align: center;
    }
    .badge {
      margin-right: 5px;
    }
  `
  ]
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        type: 'warning'
      }
    },
    {
      title: 'Event 2',
      color: colors.yellow,
      start: new Date(),
      meta: {
        type: 'warning'
      }
    },
    {
      title: 'Event 3',
      color: colors.blue,
      start: new Date(),
      meta: {
        type: 'info'
      }
    },
    {
      title: 'Event 4',
      color: colors.red,
      start: new Date(),
      meta: {
        type: 'danger'
      }
    },
    {
      title: 'Event 5',
      color: colors.red,
      start: new Date(),
      meta: {
        type: 'danger'
      }
    }
  ];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      const groups: any = {};
      cell.events.forEach((event: CalendarEvent<{ type: string }>) => {
        groups[event.meta.type] = groups[event.meta.type] || [];
        groups[event.meta.type].push(event);
      });
      cell['eventGroups'] = Object.entries(groups);
    });
  }
}
