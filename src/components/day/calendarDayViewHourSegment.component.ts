import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DayViewHourSegment } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-day-view-hour-segment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cal-hour-segment" [ngClass]="segment.cssClass">
      <div [hidden]="!segment.isStart" class="cal-time">
        {{ segment.date | calendarDate:'dayViewHour':locale }}
      </div>
      &nbsp;
    </div>
  `
})
export class CalendarDayViewHourSegmentComponent {

  @Input() segment: DayViewHourSegment;

  @Input() locale: string;

}