import { Component, Input } from '@angular/core';
import { WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-view-header',
  template: `  
    <div class="cal-cell-row cal-header">
      <div
        class="cal-cell"
        *ngFor="let day of weekDays"
        [class.cal-past]="day.isPast"
        [class.cal-today]="day.isToday"
        [class.cal-future]="day.isFuture"
        [class.cal-weekend]="day.isWeekend">
        {{ day.date | calendarDate:'monthViewColumnHeader':locale }}
      </div>
    </div>
  `
})
export class CalendarMonthViewHeader {

  @Input() weekDays: WeekDay[];

  @Input() locale: string;

}