import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DayViewEvent } from 'calendar-utils';
import { ResizeEvent } from 'angular-resizable-element';
import addMinutes from 'date-fns/add_minutes';

@Component({
  selector: 'mwl-calendar-day-view-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="cal-event"
      [style.marginTop.px]="dayEvent.top"
      [style.marginLeft.px]="dayEvent.left + 70"
      [style.height.px]="dayEvent.height"
      [style.width.px]="dayEvent.width - 1"
      [style.backgroundColor]="dayEvent.event.color.secondary"
      [style.borderColor]="dayEvent.event.color.primary"
      [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
      [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
      [ngClass]="dayEvent.event.cssClass"
      mwlResizable
      [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"
      [resizeSnapGrid]="{top: eventSnapSize, bottom: eventSnapSize}"
      (resizeStart)="resizeStarted(dayEvent, $event)"
      (resizing)="resizing(dayEvent, $event)"
      (resizeEnd)="resizeEnded(dayEvent)">
      <mwl-calendar-event-title
        [event]="dayEvent.event"
        view="day"
        (click)="eventClicked.emit()">
      </mwl-calendar-event-title>
      <mwl-calendar-event-actions [event]="dayEvent.event"></mwl-calendar-event-actions>
    </div>
  `
})
export class CalendarDayViewEventComponent {

  @Input() dayEvent: DayViewEvent;

  @Input() hourSegments: number;

  @Input() eventSnapSize: number;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  @Output() eventResized: EventEmitter<any> = new EventEmitter();

  currentResize: {
    originalTop: number,
    originalHeight: number,
    edge: string
  };

  resizeStarted(event: DayViewEvent, resizeEvent: ResizeEvent): void {
    this.currentResize = {
      originalTop: event.top,
      originalHeight: event.height,
      edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
    };
  }

  resizing(event: DayViewEvent, resizeEvent: ResizeEvent): void {
    if (resizeEvent.edges.top) {
      event.top = this.currentResize.originalTop + +resizeEvent.edges.top;
    } else if (resizeEvent.edges.bottom) {
      event.height = this.currentResize.originalHeight + +resizeEvent.edges.bottom;
    }
  }

  resizeEnded(dayEvent: DayViewEvent): void {

    let segments: number;
    if (this.currentResize.edge === 'top') {
      segments = (dayEvent.top - this.currentResize.originalTop) / this.eventSnapSize;
    } else {
      segments = (dayEvent.height - this.currentResize.originalHeight) / this.eventSnapSize;
    }

    dayEvent.top = this.currentResize.originalTop;
    dayEvent.height = this.currentResize.originalHeight;

    const segmentAmountInMinutes: number = 60 / this.hourSegments;
    const minutesMoved: number = segments * segmentAmountInMinutes;
    let newStart: Date = dayEvent.event.start;
    let newEnd: Date = dayEvent.event.end;
    if (this.currentResize.edge === 'top') {
      newStart = addMinutes(newStart, minutesMoved);
    } else if (newEnd) {
      newEnd = addMinutes(newEnd, minutesMoved);
    }

    this.eventResized.emit({newStart, newEnd, event: dayEvent.event});

  }

}