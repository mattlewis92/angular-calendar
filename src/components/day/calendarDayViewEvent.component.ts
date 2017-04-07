import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DayViewEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-day-view-event',
  template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [style.marginLeft.px]="dayEvent.left + 70"
        [style.width.px]="dayEvent.width - 1"
        [style.backgroundColor]="dayEvent.event.color.secondary"
        [style.borderColor]="dayEvent.event.color.primary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [mwlCalendarTooltip]="dayEvent.event.title | calendarEventTitle:'dayTooltip':dayEvent.event"
        [tooltipPlacement]="tooltipPlacement">
        <mwl-calendar-event-title
          [event]="dayEvent.event"
          view="day"
          (click)="eventClicked.emit()">
        </mwl-calendar-event-title>
        <mwl-calendar-event-actions [event]="dayEvent.event"></mwl-calendar-event-actions>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{dayEvent: dayEvent, tooltipPlacement: tooltipPlacement, eventClicked: eventClicked}">
    </ng-template>
  `
})
export class CalendarDayViewEventComponent {

  @Input() dayEvent: DayViewEvent;

  @Input() tooltipPlacement: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}