import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {DayViewEvent} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-day-view-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="cal-event"
      [style.marginTop.px]="dayEvent.top"
      [style.marginLeft.px]="dayEvent.left"
      [style.height.px]="dayEvent.height"
      [style.width.px]="dayEvent.width - 1"
      [style.backgroundColor]="dayEvent.event.color.secondary"
      [style.borderColor]="dayEvent.event.color.primary"
      [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
      [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
      [ngClass]="dayEvent.event.cssClass">
      <mwl-calendar-event-title
        [event]="dayEvent.event"
        view="day"
        (click)="eventClicked.emit()">
      </mwl-calendar-event-title>
      <mwl-calendar-event-actions [event]="dayEvent.event"></mwl-calendar-event-actions>
    </div>
  `
})
export class CalendarDayViewEvent {

  @Input() dayEvent: DayViewEvent;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}