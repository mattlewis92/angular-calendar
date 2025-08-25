import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import {
  trigger,
  style,
  state,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';
import { CalendarEvent } from 'calendar-utils';
import { isWithinThreshold } from '../../../common/util/util';

export const collapseAnimation: AnimationTriggerMetadata = trigger('collapse', [
  state(
    'void',
    style({
      height: 0,
      overflow: 'hidden',
      'padding-top': 0,
      'padding-bottom': 0,
    }),
  ),
  state(
    '*',
    style({
      height: '*',
      overflow: 'hidden',
      'padding-top': '*',
      'padding-bottom': '*',
    }),
  ),
  transition('* => void', animate('150ms ease-out')),
  transition('void => *', animate('150ms ease-in')),
]);

@Component({
  selector: 'mwl-calendar-open-day-events',
  template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
      let-validateDrag="validateDrag"
    >
      @if (isOpen) {
        <div class="cal-open-day-events" [@collapse] role="application">
          <span
            tabindex="-1"
            role="alert"
            [attr.aria-label]="
              { date: date, locale: locale }
                | calendarA11y: 'openDayEventsAlert'
            "
          ></span>
          <span
            tabindex="0"
            role="landmark"
            [attr.aria-label]="
              { date: date, locale: locale }
                | calendarA11y: 'openDayEventsLandmark'
            "
          ></span>
          @for (event of events; track event.id ?? event) {
            <div
              [ngClass]="event?.cssClass"
              mwlDraggable
              [class.cal-draggable]="event.draggable"
              dragActiveClass="cal-drag-active"
              [dropData]="{ event: event }"
              [dragAxis]="{ x: event.draggable, y: event.draggable }"
              [validateDrag]="validateDrag"
              [touchStartLongPress]="{ delay: 300, delta: 30 }"
            >
              <span
                class="cal-event"
                [ngStyle]="{ backgroundColor: event.color?.primary }"
              >
              </span>
              &ngsp;
              <mwl-calendar-event-title
                [event]="event"
                [customTemplate]="eventTitleTemplate"
                view="month"
                (mwlClick)="
                  eventClicked.emit({ event: event, sourceEvent: $event })
                "
                (mwlKeydownEnter)="
                  eventClicked.emit({ event: event, sourceEvent: $event })
                "
                tabindex="0"
                [attr.aria-label]="
                  { event: event, locale: locale }
                    | calendarA11y: 'eventDescription'
                "
              >
              </mwl-calendar-event-title>
              &ngsp;
              <mwl-calendar-event-actions
                [event]="event"
                [customTemplate]="eventActionsTemplate"
              >
              </mwl-calendar-event-actions>
            </div>
          }
        </div>
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen,
        validateDrag: validateDrag,
      }"
    >
    </ng-template>
  `,
  animations: [collapseAnimation],
  standalone: false,
})
export class CalendarOpenDayEventsComponent {
  @Input() locale: string;

  @Input() isOpen: boolean = false;

  @Input() events: CalendarEvent[];

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Input() eventActionsTemplate: TemplateRef<any>;

  @Input() date: Date;

  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  validateDrag = isWithinThreshold;
}
