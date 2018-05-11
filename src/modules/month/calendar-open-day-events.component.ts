import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CalendarEvent } from 'calendar-utils';
import { trackByEventId } from '../common/util';

@Component({
  selector: 'mwl-calendar-open-day-events',
  template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked">
      <div
        *ngFor="let event of events; trackBy:trackByEventId"
        [ngClass]="event?.cssClass"
        mwlDraggable
        [dropData]="{event: event}"
        [dragAxis]="{x: event.draggable, y: event.draggable}">
        <span
          class="cal-event"
          [style.backgroundColor]="event.color?.primary">
        </span>
        &ngsp;
        <mwl-calendar-event-title
          [event]="event"
          [customTemplate]="eventTitleTemplate"
          view="month"
          (mwlClick)="eventClicked.emit({event: event})">
        </mwl-calendar-event-title>
        &ngsp;
        <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
      </div>
    </ng-template>
    <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
      <ng-template
        [ngTemplateOutlet]="customTemplate || defaultTemplate"
        [ngTemplateOutletContext]="{
          events: events,
          eventClicked: eventClicked
        }">
      </ng-template>
    </div>
  `,
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({ height: 0, overflow: 'hidden' }),
        animate('150ms', style({ height: '*' }))
      ]),
      transition('* => void', [
        style({ height: '*', overflow: 'hidden' }),
        animate('150ms', style({ height: 0 }))
      ])
    ])
  ]
})
export class CalendarOpenDayEventsComponent {
  @Input() isOpen: boolean = false;

  @Input() events: CalendarEvent[];

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  trackByEventId = trackByEventId;
}
