import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';
import { DroppableDirective } from 'angular-draggable-droppable';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ClickDirective } from '../../../common/click/click.directive';
import { CalendarDatePipe } from '../../../common/calendar-date/calendar-date.pipe';

@Component({
  selector: 'mwl-calendar-week-view-header',
  template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-dragEnter="dragEnter"
    >
      <div class="cal-day-headers" role="row">
        @for (day of days; track day.date.toISOString()) {
          <div
            class="cal-header"
            [class.cal-past]="day.isPast"
            [class.cal-today]="day.isToday"
            [class.cal-future]="day.isFuture"
            [class.cal-weekend]="day.isWeekend"
            [ngClass]="day.cssClass"
            (mwlClick)="
              dayHeaderClicked.emit({ day: day, sourceEvent: $event })
            "
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped.emit({
                event: $event.dropData.event,
                newStart: day.date,
              })
            "
            (dragEnter)="dragEnter.emit({ date: day.date })"
            tabindex="0"
            role="columnheader"
          >
            <b>{{ day.date | calendarDate: 'weekViewColumnHeader' : locale }}</b
            ><br />
            <span>{{
              day.date | calendarDate: 'weekViewColumnSubHeader' : locale
            }}</span>
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        dayHeaderClicked: dayHeaderClicked,
        eventDropped: eventDropped,
        dragEnter: dragEnter,
      }"
    >
    </ng-template>
  `,
  imports: [
    DroppableDirective,
    NgClass,
    ClickDirective,
    NgTemplateOutlet,
    CalendarDatePipe,
  ],
})
export class CalendarWeekViewHeaderComponent {
  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() dayHeaderClicked = new EventEmitter<{
    day: WeekDay;
    sourceEvent: MouseEvent;
  }>();

  @Output() eventDropped = new EventEmitter<{
    event: CalendarEvent;
    newStart: Date;
  }>();

  @Output() dragEnter = new EventEmitter<{ date: Date }>();
}
