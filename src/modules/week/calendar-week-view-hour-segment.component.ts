import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { CalendarEvent, WeekViewHourSegment } from 'calendar-utils';
import { trackByWeekDayHeaderDate } from '../common/util';
import { DropEvent } from 'angular-draggable-droppable';

@Component({
  selector: 'mwl-calendar-week-view-hour-segment',
  template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale"
      let-segmentHeight="segmentHeight"
      let-hourSegmentClicked="hourSegmentClicked"
      let-eventDropped="eventDropped">
      <div
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass">
        <div class="cal-time">
          {{ segment.days[0].date | calendarDate:'weekViewHour':locale }}
        </div>
        <div class="cal-day-columns">
          <div 
            class="cal-day-column" 
            *ngFor="let day of segment.days; trackBy:trackByWeekDayHeaderDate"
            [ngClass]="day.cssClass"
            (click)="hourSegmentClicked.emit({date: day.date})"
            mwlDroppable
            dragOverClass="cal-drag-over"
            dragActiveClass="cal-drag-active"
            (drop)="eventDropped.emit({dropEvent: $event, date: day.date})">
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale,
        segmentHeight: segmentHeight,
        hourSegmentClicked: hourSegmentClicked,
        eventDropped: eventDropped
      }">
    </ng-template>
  `
})
export class CalendarWeekViewHourSegmentComponent {
  @Input() segment: WeekViewHourSegment;

  @Input() segmentHeight: number;

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output()
  hourSegmentClicked = new EventEmitter<{
    date: Date;
  }>();

  @Output()
  eventDropped = new EventEmitter<{
    dropEvent: DropEvent<{ event?: CalendarEvent; isInternal?: boolean }>;
    date: Date;
  }>();

  /**
   * @hidden
   */
  trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
}
