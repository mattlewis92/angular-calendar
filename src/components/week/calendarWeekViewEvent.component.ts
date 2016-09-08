import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {WeekViewEvent} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="cal-event"
      [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
      [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
      [style.backgroundColor]="weekEvent.event.color.secondary"
      [ngClass]="weekEvent.event?.cssClass"
      [mwlCalendarTooltip]="weekEvent.event | calendarEventTitle:'weekTooltip'"
      [tooltipPlacement]="tooltipPlacement">
      <mwl-calendar-event-title
        [event]="weekEvent.event"
        view="week"
        (click)="eventClicked.emit()">
      </mwl-calendar-event-title>
    </div>
  `
})
export class CalendarWeekViewEvent {

  @Input() weekEvent: WeekViewEvent;

  @Input() tooltipPlacement: string;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}