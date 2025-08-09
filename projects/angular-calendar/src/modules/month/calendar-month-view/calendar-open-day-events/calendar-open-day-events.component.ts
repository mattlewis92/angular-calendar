import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { isWithinThreshold, trackByEventId } from '../../../common/util/util';

@Component({
  selector: 'mwl-calendar-open-day-events',
  template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
      let-trackByEventId="trackByEventId"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-open-day-events collapse"
        [class.open]="isOpen"
        role="application"
      >
        <span
          tabindex="-1"
          role="alert"
          [attr.aria-label]="
            { date: date, locale: locale } | calendarA11y : 'openDayEventsAlert'
          "
        ></span>
        <span
          tabindex="0"
          role="landmark"
          [attr.aria-label]="
            { date: date, locale: locale }
              | calendarA11y : 'openDayEventsLandmark'
          "
        ></span>
        <div
          *ngFor="let event of events; trackBy: trackByEventId"
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
                | calendarA11y : 'eventDescription'
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
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen,
        trackByEventId: trackByEventId,
        validateDrag: validateDrag
      }"
    >
    </ng-template>
  `,
  styles: [
    `
      :host {
        --collapse-pad-y: 16px; /* target vertical padding when open */
        --collapse-ceil: 1200px; /* raise if content can be taller */
      }

      /* closed state */
      .collapse {
        overflow: hidden;
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
        transition: max-height 150ms ease-out, padding-top 150ms ease-out,
          padding-bottom 150ms ease-out;
      }

      /* open state */
      .collapse.open {
        max-height: var(--collapse-ceil);
        padding-top: var(--collapse-pad-y);
        padding-bottom: var(--collapse-pad-y);
        transition: max-height 150ms ease-in, padding-top 150ms ease-in,
          padding-bottom 150ms ease-in;
      }

      @media (prefers-reduced-motion: reduce) {
        .collapse {
          transition: none;
        }
      }
    `,
  ],
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

  trackByEventId = trackByEventId;

  validateDrag = isWithinThreshold;
}
