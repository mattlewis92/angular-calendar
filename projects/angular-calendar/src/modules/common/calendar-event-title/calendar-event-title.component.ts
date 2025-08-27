import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { NgTemplateOutlet } from '@angular/common';
import { CalendarEventTitlePipe } from './calendar-event-title.pipe';
import { CalendarA11yPipe } from '../calendar-a11y/calendar-a11y.pipe';

@Component({
  selector: 'mwl-calendar-event-title',
  template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="cal-event-title"
        [innerHTML]="event.title | calendarEventTitle: view : event"
        [attr.aria-hidden]="{} | calendarA11y: 'hideEventTitle'"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view,
      }"
    />
  `,
  imports: [NgTemplateOutlet, CalendarEventTitlePipe, CalendarA11yPipe],
})
export class CalendarEventTitleComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() view: string;
}
