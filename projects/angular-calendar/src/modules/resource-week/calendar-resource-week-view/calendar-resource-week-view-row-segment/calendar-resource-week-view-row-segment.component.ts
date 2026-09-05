import { Component, Input, TemplateRef } from '@angular/core';
import { ResourceWeekViewRowSegment } from '../../../common/calendar-resource/calendar-resource.interface';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CalendarA11yPipe } from '../../../common/calendar-a11y/calendar-a11y.pipe';

@Component({
  selector: 'mwl-calendar-resource-week-view-row-segment',
  template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-segmentHeight="segmentHeight"
      let-resourceLabel="resourceLabel"
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
        [ngClass]="segment?.cssClass"
      >
        @if (resourceLabel) {
          <div class="cal-time">
            {{ resourceLabel }}
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        segmentHeight: segmentHeight,
        resourceLabel: resourceLabel,
        daysInWeek: daysInWeek,
      }"
    />
  `,
  imports: [NgClass, NgTemplateOutlet, CalendarA11yPipe],
})
export class CalendarResourceWeekViewRowSegmentComponent {
  @Input() segment: ResourceWeekViewRowSegment;

  @Input() segmentHeight: number;

  @Input() resourceLabel: string;

  @Input() daysInWeek: number;

  @Input() customTemplate: TemplateRef<any>;
}
