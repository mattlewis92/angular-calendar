import {Component, ChangeDetectionStrategy, Input, OnChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {CalendarEvent} from 'calendar-utils';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarDate} from './calendarDate.pipe';

interface DayViewHourSegment {
  isStart: boolean;
  date: Moment;
}

interface DayViewHour {
  segments: DayViewHourSegment[];
}

interface Time {
  hour: number;
  minute: number;
}

interface DayEvent {
  event: CalendarEvent;
  top: number;
  left: number;
  width: number;
  height: number;
}

const EVENT_WIDTH = 150;

@Component({
  selector: 'mwl-calendar-day-view',
  directives: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: [CalendarDate],
  template: `
    <div class="calendar-day-view">
      <div class="hour-rows">
        <div class="hour-col-time">
          <div class="hour" *ngFor="let hour of hours; trackBy:trackByItem">
            <div class="hour-segment" *ngFor="let segment of hour.segments; trackBy:trackByItem">
              <div *ngIf="segment.isStart" class="time">
                {{ segment.date | calendarDate:'day':'hour' }}
              </div>
              &nbsp;
            </div>
          </div>
        </div>
        <div class="hour-col-events">
          <div
            class="event"
            *ngFor="let dayEvent of dayEvents; trackBy:trackByItem"
            [style.marginTop.px]="dayEvent.top"
            [style.marginLeft.px]="dayEvent.left"
            [style.height.px]="dayEvent.height"
            [style.width.px]="dayEvent.width"
            [style.backgroundColor]="dayEvent.event.color.secondary"
            [style.borderColor]="dayEvent.event.color.primary">
            <a href="javascript:;" [innerHtml]="dayEvent.event.title"></a>
          </div>
          <div>
            <div class="hour" *ngFor="let hour of hours; trackBy:trackByItem" [style.minWidth.px]="width">
              <div class="hour-segment" *ngFor="let segment of hour.segments; trackBy:trackByItem">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarDayView implements OnChanges {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() hourSegmentLength: number = 2;
  @Input() start: Time = {hour: 0, minute: 0};
  @Input() end: Time = {hour: 23, minute: 59};
  private hours: DayViewHour[] = [];
  private dayEvents: DayEvent[] = [];
  private width: number = 0;

  ngOnChanges(changes: any): void {

    if (changes.date) {

      this.hours = [];
      const startOfView: Moment = moment(this.date).startOf('day').hour(this.start.hour).minute(this.start.minute);
      const endOfView: Moment = moment(this.date).endOf('day').startOf('minute').hour(this.end.hour).minute(this.end.minute);
      const segmentDuration: number = 60 / this.hourSegmentLength;
      const startOfDay: Moment = moment(this.date).startOf('day');
      for (let i: number = 0; i < 24; i++) {
        const segments: DayViewHourSegment[] = [];
        for (let j: number = 0; j < this.hourSegmentLength; j++) {
          const date: Moment = startOfDay.clone().add(i, 'hours').add(j * segmentDuration, 'minutes');
          if (date >= startOfView && date < endOfView) {
            segments.push({
              date,
              isStart: j === 0
            });
          }
        }
        if (segments.length > 0) {
          this.hours.push({segments});
        }
      }

    }

    if (changes.date || changes.events) {
      const startOfDay: Date = moment(this.date).startOf('day').toDate();
      const endOfDay: Date = moment(this.date).endOf('day').toDate();
      this.dayEvents = this.events.map((event: CalendarEvent, index: number) => {
        return {
          event: event,
          height: 60, // TODO
          width: EVENT_WIDTH - 1,
          top: 0, // TODO
          left: (EVENT_WIDTH * index)  // TODO
        };
      });
      this.width = this.dayEvents.length * EVENT_WIDTH;
    }

  }

  private trackByItem(index: number, obj: any): any {
    return obj;
  }

}
