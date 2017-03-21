import {
  Component,
  Input,
  trigger,
  style,
  transition,
  animate,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-open-day-events',
  template: `
    <template #defaultTemplate>
      <div
        *ngFor="let event of events"
        [ngClass]="event?.cssClass"
        mwlDraggable
        [dropData]="{event: event}"
        [dragAxis]="{x: event.draggable, y: event.draggable}">
        <span
          class="cal-event"
          [style.backgroundColor]="event.color.primary">
        </span>
        <mwl-calendar-event-title
          [event]="event"
          view="month"
          (click)="eventClicked.emit({event: event})">
        </mwl-calendar-event-title>
        <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
      </div>
    </template>
    <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
      <template
        [ngTemplateOutlet]="customTemplate || defaultTemplate"
        [ngOutletContext]="{
          events: events,
          eventClicked: eventClicked
        }">
      </template>
    </div>
  `,
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({height: 0}),
        animate('150ms linear', style({height: '*'}))
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate('150ms linear', style({height: 0}))
      ])
    ])
  ]
})
export class CalendarOpenDayEventsComponent {

  @Input() isOpen: boolean = false;

  @Input() events: CalendarEvent[];

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

}