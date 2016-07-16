import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgFor, NgClass} from '@angular/common';
import {
  WeekDay,
  CalendarEvent,
  WeekViewEventRow,
  getWeekViewHeader,
  getWeekView
} from 'calendar-utils';


@Component({
  selector: 'mwl-calendar-week-view',
  template: `
    <div class="calendar-week-view">
      <div class="day-headers">
        <div
          class="header"
          *ngFor="let day of days"
          [class.past]="day.isPast"
          [class.today]="day.isToday"
          [class.future]="day.isFuture"
          [class.weekend]="day.isWeekend"
          (click)="onDayClicked.emit({date: day.date.toDate()})">
          <b>{{ day.date.format('dddd') }}</b><br>
          <span>{{ day.date.format('D MMM') }}</span>
        </div>
      </div>
      <div *ngFor="let eventRow of eventRows">
        <div
          class="event-container"
          *ngFor="let event of eventRow.row"
          [style.width]="((100 / 7) * event.span) + '%'"
          [style.marginLeft]="((100 / 7) * event.offset) + '%'">
          <div
            class="event"
            [class.border-left-rounded]="!event.extendsLeft"
            [class.border-right-rounded]="!event.extendsRight"
            [style.backgroundColor]="event.event.color.secondary"
            [ngClass]="event.event?.cssClass">
            <a
              class="event-title"
              href="javascript:;"
              [innerHtml]="event.event.title"
              (click)="eventClicked.emit({event: event.event})">
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [NgFor, NgClass]
})
export class CalendarWeekView {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];
  @Output() onDayClicked: EventEmitter<any> = new EventEmitter();
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  private days: WeekDay[];
  private eventRows: WeekViewEventRow[] = [];

  ngOnChanges(changes: any): void {

    if (changes.date) {
      this.days = getWeekViewHeader({
        viewDate: this.date
      });
    }

    if (changes.events || changes.date) {

      this.eventRows = getWeekView({
        events: this.events,
        viewDate: this.date
      });

    }

  }

}
