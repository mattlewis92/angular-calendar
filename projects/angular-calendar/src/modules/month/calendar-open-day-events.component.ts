import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';
import { CalendarEvent } from 'calendar-utils';
import { trackByEventId } from '../common/util';

export const collapseAnimation: AnimationTriggerMetadata = trigger('collapse', [
  transition('void => *', [
    style({ height: 0, overflow: 'hidden' }),
    animate('150ms', style({ height: '*' }))
  ]),
  transition('* => void', [
    style({ height: '*', overflow: 'hidden' }),
    animate('150ms', style({ height: 0 }))
  ])
]);

@Component({
  selector: 'mwl-calendar-open-day-events',
  template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
    >
      <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
        <div
          *ngFor="let event of events; trackBy: trackByEventId"
          [ngClass]="event?.cssClass"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
        >
          <span
            class="cal-event"
            [style.backgroundColor]="event.color?.primary"
          >
          </span>
          &ngsp;
          <mwl-calendar-event-title
            [event]="event"
            [customTemplate]="eventTitleTemplate"
            view="month"
            (mwlClick)="eventClicked.emit({ event: event })"
          >
          </mwl-calendar-event-title>
          &ngsp;
          <mwl-calendar-event-actions
            [event]="event"
            [customTemplate]="eventActionsTemplate"
          >
          </mwl-calendar-event-actions>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen
      }"
    >
    </ng-template>
  `,
  animations: [collapseAnimation]
})
export class CalendarOpenDayEventsComponent {
  @Input() isOpen: boolean = false;

  @Input() events: CalendarEvent[];

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Input() eventActionsTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  trackByEventId = trackByEventId;
}
