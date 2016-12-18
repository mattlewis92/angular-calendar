import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DayViewEvent } from 'calendar-utils';
import { ResizeEvent } from 'angular-resizable-element';
import addMinutes from 'date-fns/add_minutes';
import { CalendarDragHelper } from '../../providers/calendarDragHelper.provider';

@Component({
  selector: 'mwl-calendar-day-view-event',
  template: `
    <div
      class="cal-event"
      #event
      [style.marginTop.px]="dayEvent.top"
      [style.marginLeft.px]="dayEvent.left + 70"
      [style.height.px]="dayEvent.height"
      [style.width.px]="dayEvent.width - 1"
      [style.backgroundColor]="dayEvent.event.color.secondary"
      [style.borderColor]="dayEvent.event.color.primary"
      [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
      [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
      [class.cal-draggable]="dayEvent.event.draggable"
      [ngClass]="dayEvent.event.cssClass"
      [mwlCalendarTooltip]="dayEvent.event | calendarEventTitle:'dayTooltip'"
      [tooltipPlacement]="tooltipPlacement"
      mwlResizable
      [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"
      [resizeSnapGrid]="{top: eventSnapSize, bottom: eventSnapSize}"
      (resizeStart)="resizeStarted(dayEvent, $event)"
      (resizing)="resizing(dayEvent, $event)"
      (resizeEnd)="resizeEnded(dayEvent)"
      mwlDraggable
      [dragAxis]="{x: false, y: dayEvent.event.draggable && !currentResize}"
      [dragSnapGrid]="{y: eventSnapSize}"
      [validateDrag]="validateDrag"
      (dragStart)="dragStart(event)"
      (dragEnd)="eventDragged(dayEvent, $event.y)">
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

  @Input() tooltipPlacement: string;

  @Input() dayViewContainer: HTMLElement;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  @Output() eventResized: EventEmitter<any> = new EventEmitter();

  currentResize: {
    originalTop: number,
    originalHeight: number,
    edge: string
  };

  validateDrag: Function;

  constructor(private cdr: ChangeDetectorRef) {}

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
    this.currentResize = null;

  }

  dragStart(event: HTMLElement): void {
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(this.dayViewContainer, event);
    this.validateDrag = ({x, y}) => dragHelper.validateDrag({x, y});
    this.cdr.markForCheck();
  }

  eventDragged(dayEvent: DayViewEvent, draggedInPixels: number): void {
    const segments: number = draggedInPixels / this.eventSnapSize;
    const segmentAmountInMinutes: number = 60 / this.hourSegments;
    const minutesMoved: number = segments * segmentAmountInMinutes;
    const newStart: Date = addMinutes(dayEvent.event.start, minutesMoved);
    let newEnd: Date;
    if (dayEvent.event.end) {
      newEnd = addMinutes(dayEvent.event.end, minutesMoved);
    }
    this.eventResized.emit({newStart, newEnd, event: dayEvent.event});
  }

}