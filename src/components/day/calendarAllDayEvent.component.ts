import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-all-day-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="cal-all-day-event"
      [style.backgroundColor]="event.color.secondary"
      [style.borderColor]="event.color.primary">
      <mwl-calendar-event-title
        [event]="event"
        view="day"
        (click)="eventClicked.emit()">
      </mwl-calendar-event-title>
      <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
    </div>
  `
})
export class CalendarAllDayEvent {

  @Input() event: CalendarEvent;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}