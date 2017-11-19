import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-view="view">
      <a
        class="cal-event-title"
        href="javascript:;"
        [innerHTML]="event.title | calendarEventTitle:view:event">
      </a>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }">
    </ng-template>
  `
})
export class CalendarEventTitleComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() view: string;
}
