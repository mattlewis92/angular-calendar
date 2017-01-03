import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

interface MyEvent extends CalendarEvent {
  id: number;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {

  view: string = 'month';

  viewDate: Date = new Date();

  events: MyEvent[] = [{
    id: 1,
    title: 'Event 1',
    color: colors.yellow,
    start: new Date()
  }, {
    id: 2,
    title: 'Event 2',
    color: colors.blue,
    start: new Date()
  }];

}

