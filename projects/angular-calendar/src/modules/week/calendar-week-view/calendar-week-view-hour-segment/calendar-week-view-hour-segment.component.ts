import { Component, Input, TemplateRef } from '@angular/core';
import { WeekViewHourSegment } from 'calendar-utils';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CalendarDatePipe } from '../../../common/calendar-date/calendar-date.pipe';
import { CalendarA11yPipe } from '../../../common/calendar-a11y/calendar-a11y.pipe';

@Component({
  selector: 'mwl-calendar-week-view-hour-segment',
  template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale"
      let-segmentHeight="segmentHeight"
      let-isTimeLabel="isTimeLabel"
      let-daysInWeek="daysInWeek"
    >
      <div
        [attr.aria-hidden]="
          {}
            | calendarA11y
              : (daysInWeek === 1
                  ? 'hideDayHourSegment'
                  : 'hideWeekHourSegment')
        "
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        @if (isTimeLabel) {
          <div class="cal-time">
            {{
              segment.displayDate
                | calendarDate
                  : (daysInWeek === 1 ? 'dayViewHour' : 'weekViewHour')
                  : locale
            }}
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale,
        segmentHeight: segmentHeight,
        isTimeLabel: isTimeLabel,
        daysInWeek: daysInWeek,
      }"
    />
  `,
  imports: [NgClass, NgTemplateOutlet, CalendarDatePipe, CalendarA11yPipe],
})
export class CalendarWeekViewHourSegmentComponent {
  @Input() segment: WeekViewHourSegment;

  @Input() segmentHeight: number;

  @Input() locale: string;

  @Input() isTimeLabel: boolean;

  @Input() daysInWeek: number;

  @Input() customTemplate: TemplateRef<any>;
}
