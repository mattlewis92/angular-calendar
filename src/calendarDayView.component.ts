import {Component, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {NgFor, NgIf, NgClass, DatePipe} from '@angular/common';
import {getDayView, getDayViewHourGrid, CalendarEvent, DayView, DayViewHour} from 'calendar-utils';
import {CalendarDate} from './calendarDate.pipe';
import {CalendarEventTitle} from './calendarEventTitle.pipe';

interface Time {
  hour: number;
  minute: number;
}

const EVENT_WIDTH: number = 150;
const SEGMENT_HEIGHT: number = 30;

@Component({
  selector: 'mwl-calendar-day-view',
  directives: [NgFor, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: [CalendarDate, CalendarEventTitle],
  providers: [DatePipe],
  template: `
    <div class="calendar-day-view">
      <div class="hour-rows">
        <div class="hour-col-time">
          <div class="hour" *ngFor="let hour of hours; trackBy:trackByItem">
            <div
              class="hour-segment"
              *ngFor="let segment of hour.segments; trackBy:trackByItem"
              (click)="hourSegmentClicked.emit({date: segment.date.toDate()})">
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
            *ngFor="let dayEvent of view?.events; trackBy:trackByItem"
            [style.marginTop.px]="dayEvent.top"
            [style.marginLeft.px]="dayEvent.left"
            [style.height.px]="dayEvent.height"
            [style.width.px]="dayEvent.width - 1"
            [style.backgroundColor]="dayEvent.event.color.secondary"
            [style.borderColor]="dayEvent.event.color.primary"
            [class.border-top-rounded]="!dayEvent.extendsTop"
            [class.border-bottom-rounded]="!dayEvent.extendsBottom"
            [ngClass]="dayEvent.event.cssClass">
            <a
              class="event-title"
              href="javascript:;"
              [innerHtml]="dayEvent.event | calendarEventTitle:'day'"
              (click)="eventClicked.emit({event: dayEvent.event})">
            </a>
          </div>
          <div>
            <div class="hour" *ngFor="let hour of hours; trackBy:trackByItem" [style.minWidth.px]="view?.width">
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
  @Input() hourSegments: number = 2;
  @Input() start: Time = {hour: 0, minute: 0};
  @Input() end: Time = {hour: 23, minute: 59};
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();
  @Output() hourSegmentClicked: EventEmitter<any> = new EventEmitter();
  private hours: DayViewHour[] = [];
  private view: DayView;
  private width: number = 0;

  ngOnChanges(changes: any): void {

    if (changes.date) {

      this.hours = getDayViewHourGrid({
        viewDate: this.date,
        hourSegments: this.hourSegments,
        dayStart: this.start,
        dayEnd: this.end
      });

    }

    if (changes.date || changes.events) {
      this.view = getDayView({
        events: this.events,
        viewDate: this.date,
        hourSegments: this.hourSegments,
        dayStart: this.start,
        dayEnd: this.end,
        eventWidth: EVENT_WIDTH,
        segmentHeight: SEGMENT_HEIGHT
      });
    }

  }

  private trackByItem(index: number, obj: any): any {
    return obj;
  }

}
