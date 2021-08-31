import { Component, ChangeDetectionStrategy } from '@angular/core';
import { setMinutes, setHours } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent {
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      start: setHours(setMinutes(new Date(), 20), 15),
      end: setHours(setMinutes(new Date(), 40), 17),
      title: 'An event',
      resizable: {
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
