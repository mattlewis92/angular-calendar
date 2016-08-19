import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {MonthViewDay} from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cal-cell-top">
      <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
      <span class="cal-day-number">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>
    </div>
    <div class="cal-events">
      <span
        class="cal-event"
        *ngFor="let event of day.events"
        [style.backgroundColor]="event.color.primary"
        [ngClass]="event?.cssClass"
        (mouseenter)="highlightDay.emit({event: event})"
        (mouseleave)="unhighlightDay.emit({event: event})"
        [mwlCalendarTooltip]="event | calendarEventTitle:'monthTooltip'"
        [tooltipPlacement]="tooltipPlacement">
      </span>
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
    '[style.backgroundColor]': 'day.backgroundColor',
    '(click)': 'cellClicked.emit()'
  }
})
export class CalendarMonthCell {

  @Input() day: MonthViewDay;

  @Input() openDay: MonthViewDay;

  @Input() locale: string;

  @Input() tooltipPlacement: string = 'top';

  @Output() cellClicked: EventEmitter<any> = new EventEmitter();

  @Output() highlightDay: EventEmitter<any> = new EventEmitter();

  @Output() unhighlightDay: EventEmitter<any> = new EventEmitter();

}