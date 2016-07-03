import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';
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
    <div class="week-view">
      <div class="day-headers">
        <div
          class="header"
          *ngFor="let day of days trackBy day"
          [class.past]="day.isPast"
          [class.today]="day.isToday"
          [class.future]="day.isFuture"
          [class.weekend]="day.isWeekend">
          <b>{{ day.date.format('dddd') }}</b><br>
          <span>{{ day.date.format('D MMM') }}</span>
        </div>
      </div>
      <div *ngFor="let eventRow of eventRows">
        <div
          class="event-container"
          *ngFor="let event of eventRow.row trackBy event"
          [style.width]="((100 / 7) * event.span) + '%'"
          [style.marginLeft]="((100 / 7) * event.offset) + '%'">
          <div
            class="event"
            [class.border-left-rounded]="!event.extendsLeft"
            [class.border-right-rounded]="!event.extendsRight"
            [style.backgroundColor]="event.event.color.secondary">
            <a href="javascript:;">{{ event.event.title }}</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .day-headers {
      display: flex;
      margin-bottom: 3px;
      border: 1px solid #e1e1e1;
      margin-left: 2px;
      margin-right: 2px;
    }
    .day-headers .header {
      flex: 1;
      text-align: center;
      padding: 5px;
    }
    .day-headers .header:not(:last-child) {
      border-right: solid 1px #e1e1e1;
    }
    .day-headers .header:hover {
      background-color: #ededed;
    }
    .day-headers span {
      font-weight: 400;
      opacity: 0.5;
    }
    .event-container {
      display: inline-block;
    }
    .event {
      padding: 0 10px;
      font-size: 12px;
      margin-bottom: 3px;
      margin-left: 2px;
      margin-right: 2px;
      height: 30px;
      line-height: 30px;
    }
    .border-left-rounded {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .border-right-rounded {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .header.today {
      background-color: #e8fde7;
    }
    .header.weekend span {
      color: darkred;
    }
    .event, .header {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],
  directives: [NgFor]
})
export class CalendarWeekView {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];

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
