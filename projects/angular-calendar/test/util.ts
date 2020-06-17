import { Component } from '@angular/core';
import { CalendarEvent } from './../src';

export function triggerDomEvent(
  eventType: string,
  target: HTMLElement | Element,
  eventData: object = {}
) {
  const event: Event = document.createEvent('Event');
  Object.assign(event, eventData);
  event.initEvent(eventType, true, true);
  target.dispatchEvent(event);
  return event;
}

@Component({
  selector: 'mwl-external-event',
  template:
    '<div class="external-event" mwlDraggable [dropData]="{event: event}">{{ event.title }}</div>',
  styles: [
    `
      .external-event {
        position: fixed;
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
      }
    `,
  ],
})
export class ExternalEventComponent {
  event: CalendarEvent = {
    title: 'foo',
    start: new Date(),
    draggable: true,
    color: {
      primary: 'blue',
      secondary: 'lightblue',
    },
  };
}
