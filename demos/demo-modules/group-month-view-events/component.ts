import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

interface MyEvent extends CalendarEvent {
  type: string;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styles: [`
    .cell-totals {
      margin: 5px;
      text-align: center;
    }
    .badge {
      margin-right: 5px;
    }
  `]
})
export class DemoComponent {

  view: string = 'month';

  viewDate: Date = new Date();

  events: MyEvent[] = [{
    title: 'Event 1',
    type: 'warning',
    color: colors.yellow,
    start: new Date()
  }, {
    title: 'Event 2',
    type: 'warning',
    color: colors.yellow,
    start: new Date()
  }, {
    title: 'Event 3',
    type: 'info',
    color: colors.blue,
    start: new Date()
  }, {
    title: 'Event 4',
    type: 'danger',
    color: colors.red,
    start: new Date()
  }, {
    title: 'Event 5',
    type: 'danger',
    color: colors.red,
    start: new Date()
  }];

  groupEvents(cell: CalendarMonthViewDay): void {
    const groups: any = {};
    cell.events.forEach((event: MyEvent) => {
      groups[event.type] = groups[event.type] || [];
      groups[event.type].push(event);
    });
    cell['eventGroups'] = Object.entries(groups);
  }

}

