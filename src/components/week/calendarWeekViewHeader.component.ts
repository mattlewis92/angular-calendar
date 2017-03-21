import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-header',
  template: `  
    <div class="cal-day-headers">
      <div
        class="cal-header"
        *ngFor="let day of days"
        [class.cal-past]="day.isPast"
        [class.cal-today]="day.isToday"
        [class.cal-future]="day.isFuture"
        [class.cal-weekend]="day.isWeekend"
        [class.cal-drag-over]="day.dragOver"
        (click)="dayClicked.emit({date: day.date})"
        mwlDroppable
        (dragEnter)="day.dragOver = true"
        (dragLeave)="day.dragOver = false"
        (drop)="day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})">
        <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>
        <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
      </div>
    </div>
  `
})
export class CalendarWeekViewHeaderComponent {

  @Input() days: WeekDay[];

  @Input() locale: string;

  @Output() dayClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();

  @Output() eventDropped: EventEmitter<{event: CalendarEvent, newStart: Date}> = new EventEmitter<{event: CalendarEvent, newStart: Date}>();

}