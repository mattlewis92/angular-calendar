import {Component, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {NgFor, NgIf, NgClass, DatePipe} from '@angular/common';
import {getDayView, getDayViewHourGrid, CalendarEvent, DayView, DayViewHour} from 'calendar-utils';
import {CalendarDate} from './calendarDate.pipe';
import {CalendarEventTitle} from './calendarEventTitle.pipe';

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
            <span *ngIf="dayEvent.event.actions" class="event-actions">
              <a
                class="event-action"
                href="javascript:;"
                *ngFor="let action of dayEvent.event.actions; trackBy:trackByItem"
                (click)="action.onClick(dayEvent.event)"
                [innerHtml]="action.label">
              </a>
            </span>
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
  @Input() dayStartHour: number = 0;
  @Input() dayStartMinute: number = 0;
  @Input() dayEndHour: number = 23;
  @Input() dayEndMinute: number = 59;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();
  @Output() hourSegmentClicked: EventEmitter<any> = new EventEmitter();
  private hours: DayViewHour[] = [];
  private view: DayView;
  private width: number = 0;

  ngOnChanges(changes: any): void {

    if (changes.date || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute) {

      this.hours = getDayViewHourGrid({
        viewDate: this.date,
        hourSegments: this.hourSegments,
        dayStart: {
          hour: this.dayStartHour,
          minute: this.dayStartMinute
        },
        dayEnd: {
          hour: this.dayEndHour,
          minute: this.dayEndMinute
        }
      });

    }

    if (changes.date || changes.events || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute) {
      this.view = getDayView({
        events: this.events,
        viewDate: this.date,
        hourSegments: this.hourSegments,
        dayStart: {
          hour: this.dayStartHour,
          minute: this.dayStartMinute
        },
        dayEnd: {
          hour: this.dayEndHour,
          minute: this.dayEndMinute
        },
        eventWidth: EVENT_WIDTH,
        segmentHeight: SEGMENT_HEIGHT
      });
    }

  }

  private trackByItem(index: number, obj: any): any {
    return obj;
  }

}
