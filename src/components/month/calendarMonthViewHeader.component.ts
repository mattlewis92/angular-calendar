import { Component, Input, TemplateRef } from '@angular/core';
import { WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-view-header',
  template: `
    <template #defaultTemplate>
      <div class="cal-cell-row cal-header">
        <div
          class="cal-cell"
          *ngFor="let day of days"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend">
          {{ day.date | calendarDate:'monthViewColumnHeader':locale }}
        </div>
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{days: days, locale: locale}">
    </template>
  `
})
export class CalendarMonthViewHeaderComponent {

  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

}