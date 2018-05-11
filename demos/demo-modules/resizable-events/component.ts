import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { addDays } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: string = 'week';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      color: colors.yellow,
      start: new Date(),
      end: addDays(new Date(), 1), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      }
    },
    {
      title: 'A non resizable event',
      color: colors.blue,
      start: new Date(),
      end: addDays(new Date(), 1)
    }
  ];

  refresh: Subject<any> = new Subject();

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
