import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-actions',
  template: `
    <span *ngIf="event.actions" class="cal-event-actions">
      <a
        class="cal-event-action"
        href="javascript:;"
        *ngFor="let action of event.actions"
        (mwlClick)="action.onClick({event: event})"
        [ngClass]="action.cssClass"
        [innerHtml]="action.label">
      </a>
    </span>
  `
})
export class CalendarEventActionsComponent {
  @Input() event: CalendarEvent;
}
