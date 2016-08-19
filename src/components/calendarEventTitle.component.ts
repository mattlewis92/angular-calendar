import {Component, Input, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="cal-event-title"
      href="javascript:;"
      [innerHTML]="event | calendarEventTitle:view">
    </a>
  `
})
export class CalendarEventTitle {

  @Input() event: CalendarEvent;

  @Input() view: string;

}