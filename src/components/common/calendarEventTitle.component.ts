import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  template: `
    <a
      class="cal-event-title"
      href="javascript:;"
      [innerHTML]="event.title | calendarEventTitle:view:event">
    </a>
  `
})
export class CalendarEventTitleComponent {
  @Input() event: CalendarEvent;

  @Input() view: string;
}
