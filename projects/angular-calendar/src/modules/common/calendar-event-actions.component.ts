import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent, EventAction } from 'calendar-utils';
import { CalendarA11y } from './calendar-a11y.provider';

@Component({
  selector: 'mwl-calendar-event-actions',
  template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-trackByActionId="trackByActionId"
    >
      <span *ngIf="event.actions" class="cal-event-actions">
        <a
          class="cal-event-action"
          href="javascript:;"
          *ngFor="let action of event.actions; trackBy: trackByActionId"
          (mwlClick)="action.onClick({ event: event })"
          (mwlKeydown)="action.onClick({ event: event })"
          [ngClass]="action.cssClass"
          [innerHtml]="action.label"
          tabindex="0"
          role="button"
          attr.aria-label="{{ a11y.actionButtonLabel(action.label) }}"
        >
        </a>
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        trackByActionId: trackByActionId
      }"
    >
    </ng-template>
  `
})
export class CalendarEventActionsComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  constructor(public a11y: CalendarA11y) {}

  trackByActionId = (index: number, action: EventAction) =>
    action.id ? action.id : action;
}
