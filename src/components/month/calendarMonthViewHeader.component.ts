import { Component, Input, TemplateRef } from '@angular/core';
import { WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-view-header',
  template: `
    <ng-template #defaultTemplate>
      <div class="cal-cell-row cal-header">
        <div
          class="cal-cell"
          *ngFor="let day of days"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass">
          {{ day.date | calendarDate:'monthViewColumnHeader':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale}">
    </ng-template>
  `
})
export class CalendarMonthViewHeaderComponent {
  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;
}
