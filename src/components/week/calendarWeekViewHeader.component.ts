import { Component, Input } from '@angular/core';
import { WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-header',
  template: `
    <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>
    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
  `,
  host: {
    '[class]': '"cal-header"',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend'
  }
})
export class CalendarWeekViewHeaderComponent {

  @Input() day: WeekDay;

  @Input() locale: string;

}