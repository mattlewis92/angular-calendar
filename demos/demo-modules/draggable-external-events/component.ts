import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewComponent,
  CalendarUtils,
  CalendarWeekViewEvent,
  CalendarGetWeekViewArgs,
  CalendarWeekViewEventRow
} from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import addDays from 'date-fns/add_days';
import differenceInDays from 'date-fns/difference_in_days';
import startOfDay from 'date-fns/start_of_day';
import { colors } from '../demo-utils/colors';

interface MyCalendarEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
  droppedOutsideCalendar?: boolean;
}

export class MyCalendarUtils extends CalendarUtils {

  getWeekView(args: CalendarGetWeekViewArgs): CalendarWeekViewEventRow[] {
    args.absolutePositionedEvents = true;
    return super.getWeekView(args);
  }

}

@Component({
  selector: 'drag-events-outside-week-view-component', // tslint:disable-line
  template: `
    <div class="cal-week-view" #weekViewContainer>
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayClicked)="dayClicked.emit($event)"
        (eventDropped)="eventTimesChanged.emit($event)">
      </mwl-calendar-week-view-header>
      <div class="cal-events">
        <div
          *ngFor="let eventRow of eventRows"
          #eventRowContainer
          class="cal-events-row"
          style="height: auto">
          <div
            class="cal-event-container"
            style="position: static"
            #event
            [class.cal-draggable]="weekEvent.event.draggable"
            *ngFor="let weekEvent of eventRow.row"
            [style.width]="((100 / days.length) * weekEvent.span) + '%'"
            [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'"
            mwlResizable
            [resizeEdges]="{left: weekEvent.event?.resizable?.beforeStart, right: weekEvent.event?.resizable?.afterEnd}"
            [resizeSnapGrid]="{left: getDayColumnWidth(eventRowContainer), right: getDayColumnWidth(eventRowContainer)}"
            [validateResize]="validateResize"
            (resizeStart)="resizeStarted(weekViewContainer, weekEvent, $event)"
            (resizing)="resizing(weekEvent, $event, getDayColumnWidth(eventRowContainer))"
            (resizeEnd)="resizeEnded(weekEvent)"
            mwlDraggable
            [dragAxis]="{
              x: weekEvent.event.draggable && currentResizes.size === 0,
              y: weekEvent.event.draggable && currentResizes.size === 0
            }"
            [dropData]="{event: weekEvent.event}"
            (dragEnd)="eventDragged(weekEvent, $event.x, getDayColumnWidth(eventRowContainer))">
            <mwl-calendar-week-view-event
              [weekEvent]="weekEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [customTemplate]="eventTemplate"
              (eventClicked)="eventClicked.emit({event: weekEvent.event})">
            </mwl-calendar-week-view-event>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [{
    provide: CalendarUtils,
    useClass: MyCalendarUtils
  }]
})
export class DragEventsOutsideWeekViewComponent extends CalendarWeekViewComponent {

  @Output() eventTimesChanged: EventEmitter<MyCalendarEventTimesChangedEvent> = new EventEmitter();

  eventDragged(weekEvent: CalendarWeekViewEvent, draggedByPx: number, dayWidth: number): void {

    let daysDragged: number = Math.round(draggedByPx / dayWidth);
    let newStart: Date = addDays(weekEvent.event.start, daysDragged);
    let droppedOutsideCalendar: boolean = false;

    // Restrict start to first and last day on current week
    if (newStart < this.days[0].date) {
      daysDragged += differenceInDays(startOfDay(this.days[0].date), startOfDay(newStart));
      droppedOutsideCalendar = true;
    }
    const lastDate: Date = this.days[this.days.length - 1].date;
    if (newStart > lastDate) {
      daysDragged -= differenceInDays(startOfDay(newStart), startOfDay(lastDate));
      droppedOutsideCalendar = true;
    }

    newStart = addDays(weekEvent.event.start, daysDragged);
    let newEnd: Date;
    if (weekEvent.event.end) {
      newEnd = addDays(weekEvent.event.end, daysDragged);
    }

    this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event, droppedOutsideCalendar});

  }

  dragStart(weekViewContainer: HTMLElement, event: HTMLElement): void {

    event.parentNode.insertBefore(event.cloneNode(), event.nextSibling);

    // With a scrollbar during the drag, the event is only visible inside the calendar.
    // The "fixed" position bring the event on top, even when dragged outside the calendar.
    const eventRect: ClientRect = event.getBoundingClientRect();
    event.style.left = eventRect.left + 'px';
    event.style.top = eventRect.top + 'px';
    event.style.width = eventRect.width + 'px';
    event.style.position = 'fixed';
    event.style.marginLeft = '';

  }

}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {

  view: string = 'month';

  viewDate: Date = new Date();

  externalEvents: CalendarEvent[] = [{
    title: 'Event 1',
    color: colors.yellow,
    start: new Date(),
    draggable: true
  }, {
    title: 'Event 2',
    color: colors.blue,
    start: new Date(),
    draggable: true
  }];

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  refresh: Subject<any> = new Subject();

  eventDropped({event, newStart, newEnd, droppedOutsideCalendar}: MyCalendarEventTimesChangedEvent): void {

    if (!droppedOutsideCalendar) {
      const externalIndex: number = this.externalEvents.indexOf(event);
      if (externalIndex > -1) {
        this.externalEvents.splice(externalIndex, 1);
        this.events.push(event);
      }
      event.start = newStart;
      if (newEnd) {
        event.end = newEnd;
      }
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }

  }

  droppedBack(event: CalendarEvent): void {

    const internalIndex: number = this.events.indexOf(event);

    if (internalIndex > -1) {
      this.events.splice(internalIndex, 1);
      this.externalEvents.push(event);

      this.refresh.next();
    }
  }

}

