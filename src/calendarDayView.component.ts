import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {NgFor, NgIf, NgClass, DatePipe} from '@angular/common';
import {getDayView, getDayViewHourGrid, CalendarEvent, DayView, DayViewHour} from 'calendar-utils';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {CalendarDate} from './calendarDate.pipe';
import {CalendarEventTitle} from './calendarEventTitle.pipe';

const SEGMENT_HEIGHT: number = 30;

@Component({
  selector: 'mwl-calendar-day-view',
  directives: [NgFor, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: [CalendarDate, CalendarEventTitle],
  providers: [DatePipe],
  template: `
    <div class="cal-day-view">
      <div class="cal-hour-rows">
        <div class="cal-hour-col-time">
          <div class="cal-hour" *ngFor="let hour of hours; trackBy:trackByItem">
            <div
              class="cal-hour-segment"
              *ngFor="let segment of hour.segments; trackBy:trackByItem"
              (click)="hourSegmentClicked.emit({date: segment.date.toDate()})">
              <div *ngIf="segment.isStart" class="cal-time">
                {{ segment.date | calendarDate:'day':'hour' }}
              </div>
              &nbsp;
            </div>
          </div>
        </div>
        <div class="cal-hour-col-events">
          <div
            class="cal-event"
            *ngFor="let dayEvent of view?.events; trackBy:trackByItem"
            [style.marginTop.px]="dayEvent.top"
            [style.marginLeft.px]="dayEvent.left"
            [style.height.px]="dayEvent.height"
            [style.width.px]="dayEvent.width - 1"
            [style.backgroundColor]="dayEvent.event.color.secondary"
            [style.borderColor]="dayEvent.event.color.primary"
            [class.cal-starts-within-day]="!dayEvent.extendsTop"
            [class.cal-ends-within-day]="!dayEvent.extendsBottom"
            [ngClass]="dayEvent.event.cssClass">
            <a
              class="cal-event-title"
              href="javascript:;"
              [innerHtml]="dayEvent.event | calendarEventTitle:'day'"
              (click)="eventClicked.emit({event: dayEvent.event})">
            </a>
            <span *ngIf="dayEvent.event.actions" class="cal-event-actions">
              <a
                class="cal-event-action"
                href="javascript:;"
                *ngFor="let action of dayEvent.event.actions; trackBy:trackByItem"
                (click)="action.onClick({event: dayEvent.event})"
                [ngClass]="action.cssClass"
                [innerHtml]="action.label">
              </a>
            </span>
          </div>
          <div>
            <div class="cal-hour" *ngFor="let hour of hours; trackBy:trackByItem" [style.minWidth.px]="view?.width">
              <div class="cal-hour-segment" *ngFor="let segment of hour.segments; trackBy:trackByItem">
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
  @Input() eventWidth: number = 150;
  @Input() refresh: Subject<any>;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();
  @Output() hourSegmentClicked: EventEmitter<any> = new EventEmitter();
  private hours: DayViewHour[] = [];
  private view: DayView;
  private width: number = 0;
  private refreshSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: any): void {

    if (
      changes.date ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute
    ) {
      this.refreshHourGrid();
    }

    if (
      changes.date ||
      changes.events ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.eventWidth
    ) {
      this.refreshView();
    }

  }

  private trackByItem(index: number, obj: any): any {
    return obj;
  }

  private refreshHourGrid(): void {
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

  private refreshView(): void {
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
      eventWidth: this.eventWidth,
      segmentHeight: SEGMENT_HEIGHT
    });
  }

  private refreshAll(): void {
    this.refreshHourGrid();
    this.refreshView();
  }

}
