import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span *ngIf="event.actions" class="cal-event-actions">
      <a
        class="cal-event-action"
        href="javascript:;"
        *ngFor="let action of event.actions; trackBy:trackByItem"
        (click)="action.onClick({event: event})"
        [ngClass]="action.cssClass"
        [innerHtml]="action.label">
      </a>
    </span>
  `
})
export class CalendarEventActions {

  @Input() event: CalendarEvent;

}