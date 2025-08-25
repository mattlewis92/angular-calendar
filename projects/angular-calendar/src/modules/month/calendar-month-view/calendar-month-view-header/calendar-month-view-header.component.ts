import {
  Component,
  Input,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { WeekDay } from 'calendar-utils';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CalendarDatePipe } from '../../../common/calendar-date/calendar-date.pipe';

@Component({
  selector: 'mwl-calendar-month-view-header',
  template: `
    <ng-template #defaultTemplate let-days="days" let-locale="locale">
      <div class="cal-cell-row cal-header" role="row">
        @for (day of days; track day.date.toISOString()) {
          <div
            class="cal-cell"
            [class.cal-past]="day.isPast"
            [class.cal-today]="day.isToday"
            [class.cal-future]="day.isFuture"
            [class.cal-weekend]="day.isWeekend"
            (click)="
              columnHeaderClicked.emit({
                isoDayNumber: day.day,
                sourceEvent: $event,
              })
            "
            [ngClass]="day.cssClass"
            tabindex="0"
            role="columnheader"
          >
            {{ day.date | calendarDate: 'monthViewColumnHeader' : locale }}
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
      }"
    >
    </ng-template>
  `,
  imports: [NgClass, NgTemplateOutlet, CalendarDatePipe],
})
export class CalendarMonthViewHeaderComponent {
  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() columnHeaderClicked = new EventEmitter<{
    isoDayNumber: number;
    sourceEvent: MouseEvent;
  }>();
}
