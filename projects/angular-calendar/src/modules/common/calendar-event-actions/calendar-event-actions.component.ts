import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent, EventAction } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-actions',
  template: `
    <ng-template #defaultTemplate let-event="event">
      @if (event.actions) {
        <span class="cal-event-actions">
          @for (action of event.actions; track action.id ?? action) {
            <a
              class="cal-event-action"
              href="javascript:;"
              (mwlClick)="action.onClick({ event: event, sourceEvent: $event })"
              (mwlKeydownEnter)="
                action.onClick({ event: event, sourceEvent: $event })
              "
              [ngClass]="action.cssClass"
              [innerHtml]="action.label"
              tabindex="0"
              role="button"
              [attr.aria-label]="
                { action: action } | calendarA11y: 'actionButtonLabel'
              "
            >
            </a>
          }
        </span>
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
      }"
    />
  `,
  standalone: false,
})
export class CalendarEventActionsComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;
}
