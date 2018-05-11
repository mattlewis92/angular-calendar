import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-all-day-event',
  template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-eventClicked="eventClicked">
      <div
        class="cal-all-day-event"
        [style.backgroundColor]="event.color?.secondary"
        [style.borderColor]="event.color?.primary">
        <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="event"
          [customTemplate]="eventTitleTemplate"
          view="day"
          (mwlClick)="eventClicked.emit()">
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }">
    </ng-template>
  `
})
export class CalendarAllDayEventComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();
}
