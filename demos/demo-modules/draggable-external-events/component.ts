import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {

  viewDate: Date = new Date();

  externalEvents: CalendarEvent[] = [{
    title: 'Event 1',
    color: colors.yellow,
    start: new Date(),
    draggable: true
  }, {
    title: 'Event 2',
    color: colors.blue,
    start: new Date(),
    draggable: true
  }];

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  eventDropped({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    const externalIndex: number = this.externalEvents.indexOf(event);
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
  }

}

