import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-event',
  template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
        [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
        [style.backgroundColor]="weekEvent.event.color.secondary"
        [ngClass]="weekEvent.event?.cssClass"
        [mwlCalendarTooltip]="weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event"
        [tooltipPlacement]="tooltipPlacement">
        <mwl-calendar-event-title
          [event]="weekEvent.event"
          view="week"
          (mwlClick)="eventClicked.emit()">
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{weekEvent: weekEvent, tooltipPlacement: tooltipPlacement, eventClicked: eventClicked}">
    </ng-template>
  `
})
export class CalendarWeekViewEventComponent {

  @Input() weekEvent: WeekViewEvent;

  @Input() tooltipPlacement: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}