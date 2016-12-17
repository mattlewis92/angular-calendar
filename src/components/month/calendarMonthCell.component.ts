import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonthViewDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-cell',
  template: `
    <div class="cal-cell-top">
      <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
      <span class="cal-day-number">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>
    </div>
    <div class="cal-events">
      <div
        class="cal-event"
        *ngFor="let event of day.events"
        [style.backgroundColor]="event.color.primary"
        [ngClass]="event?.cssClass"
        (mouseenter)="highlightDay.emit({event: event})"
        (mouseleave)="unhighlightDay.emit({event: event})"
        [mwlCalendarTooltip]="event | calendarEventTitle:'monthTooltip'"
        [tooltipPlacement]="tooltipPlacement"
        mwlDraggable
        [dropData]="{event: event}"
        [dragAxis]="{x: event.draggable, y: event.draggable}">
      </div>
    </div>
  `,
  host: {
    '[class]': '"cal-cell cal-day-cell " + day?.cssClass',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend',
    '[class.cal-in-month]': 'day.inMonth',
    '[class.cal-out-month]': '!day.inMonth',
    '[class.cal-has-events]': 'day.events.length > 0',
    '[class.cal-open]': 'day === openDay',
    '[style.backgroundColor]': 'day.backgroundColor'
  }
})
export class CalendarMonthCellComponent {

  @Input() day: MonthViewDay;

  @Input() openDay: MonthViewDay;

  @Input() locale: string;

  @Input() tooltipPlacement: string;

  @Output() highlightDay: EventEmitter<any> = new EventEmitter();

  @Output() unhighlightDay: EventEmitter<any> = new EventEmitter();

}