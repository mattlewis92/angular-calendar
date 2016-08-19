import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="cal-event-title"
      href="javascript:;"
      [innerHTML]="event | calendarEventTitle:view"
      (click)="titleClicked.emit()">
    </a>
  `
})
export class CalendarEventTitle {

  @Input() event: CalendarEvent;

  @Input() view: string;

  @Output() titleClicked: EventEmitter<any> = new EventEmitter();

}