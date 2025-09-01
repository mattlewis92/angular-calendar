import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarDatePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { colors } from '../demo-utils/colors';
import { addHours, startOfDay } from 'date-fns';
import {
  User,
  DayViewSchedulerComponent,
} from './day-view-scheduler.component';

const users: User[] = [
  {
    id: 0,
    name: 'John smith',
    color: colors.yellow,
  },
  {
    id: 1,
    name: 'Jane Doe',
    color: colors.blue,
  },
];

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    DayViewSchedulerComponent,
    CalendarDatePipe,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  viewDate = new Date();

  users = users;

  events: CalendarEvent[] = [
    {
      title: 'An event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 5),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'Another event',
      color: users[1].color,
      start: addHours(startOfDay(new Date()), 2),
      meta: {
        user: users[1],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'A 3rd event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 7),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'An all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'Another all day event',
      color: users[1].color,
      start: new Date(),
      meta: {
        user: users[1],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'A 3rd all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
  ];

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }
}
`;var t=`<div class="row">
  <div class="col-md-6">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        mwlCalendarPreviousView
        [view]="'day'"
        [(viewDate)]="viewDate"
      >
        Previous
      </div>
      <div
        class="btn btn-outline-secondary"
        mwlCalendarToday
        [(viewDate)]="viewDate"
      >
        Today
      </div>
      <div
        class="btn btn-primary"
        mwlCalendarNextView
        [view]="'day'"
        [(viewDate)]="viewDate"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-6 text-right">
    <h3>{{ viewDate | calendarDate:('dayViewTitle') }}</h3>
  </div>
</div>
<br />

<mwl-day-view-scheduler
  [viewDate]="viewDate"
  [events]="events"
  [users]="users"
  (eventTimesChanged)="eventTimesChanged($event)"
  (userChanged)="userChanged($event)"
/>
`;var a=`import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  LOCALE_ID,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  CalendarUtils,
  CalendarWeekViewComponent,
  DateAdapter,
  getWeekViewPeriod,
  CalendarWeekViewEventComponent,
  CalendarWeekViewHourSegmentComponent,
  CalendarWeekViewCurrentTimeMarkerComponent,
  ClickDirective,
} from 'angular-calendar';
import {
  WeekView,
  GetWeekViewArgs,
  WeekViewTimeEvent,
  EventColor,
  CalendarEvent,
  WeekViewAllDayEventRow,
  WeekViewAllDayEvent,
} from 'calendar-utils';
import {
  DragEndEvent,
  DragMoveEvent,
  DroppableDirective,
  DraggableDirective,
} from 'angular-draggable-droppable';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import {
  ResizableDirective,
  ResizeHandleDirective,
} from 'angular-resizable-element';

export interface User {
  id: number;
  name: string;
  color: EventColor;
}

interface DayViewScheduler extends WeekView {
  users: User[];
}

interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
  users: User[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  getWeekView(args: GetWeekViewArgsWithUsers): DayViewScheduler {
    const { period } = super.getWeekView(args);
    const view: DayViewScheduler = {
      period,
      allDayEventRows: [],
      hourColumns: [],
      users: [...args.users],
    };

    view.users.forEach((user, columnIndex) => {
      const events = args.events.filter(
        (event) => event.meta.user.id === user.id,
      );
      const columnView = super.getWeekView({
        ...args,
        events,
      });
      view.hourColumns.push(columnView.hourColumns[0]);
      columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
        view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
          row: [],
        };
        view.allDayEventRows[rowIndex].row.push({
          ...row[0],
          offset: columnIndex,
          span: 1,
        });
      });
    });

    return view;
  }
}

@Component({
  selector: 'mwl-day-view-scheduler',
  templateUrl: 'day-view-scheduler.component.html',
  providers: [DayViewSchedulerCalendarUtils],
  imports: [
    DroppableDirective,
    NgTemplateOutlet,
    DraggableDirective,
    NgClass,
    CalendarWeekViewEventComponent,
    CalendarWeekViewHourSegmentComponent,
    CalendarWeekViewCurrentTimeMarkerComponent,
    ResizableDirective,
    ResizeHandleDirective,
    ClickDirective,
  ],
})
export class DayViewSchedulerComponent
  extends CalendarWeekViewComponent
  implements OnChanges
{
  @Input() users: User[] = [];

  @Output() userChanged = new EventEmitter();

  view: DayViewScheduler;

  daysInWeek = 1;

  protected cdr = inject(ChangeDetectorRef);
  protected utils = inject(DayViewSchedulerCalendarUtils);
  protected dateAdapter = inject(DateAdapter);
  protected element = inject<ElementRef<HTMLElement>>(ElementRef);

  trackByUserId = (index: number, row: User) => row.id;

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.users) {
      this.refreshBody();
      this.emitBeforeViewRender();
    }
  }

  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.users.length);
  }

  dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    if (this.snapDraggedEvents) {
      const newUser = this.getDraggedUserColumn(dayEvent, dragEvent.x);
      const newEventTimes = this.getDragMovedEventTimes(
        dayEvent,
        { ...dragEvent, x: 0 },
        this.dayColumnWidth,
        true,
      );
      const originalEvent = dayEvent.event;
      const adjustedEvent = {
        ...originalEvent,
        ...newEventTimes,
        meta: { ...originalEvent.meta, user: newUser },
      };
      const tempEvents = this.events.map((event) => {
        if (event === originalEvent) {
          return adjustedEvent;
        }
        return event;
      });
      this.restoreOriginalEvents(
        tempEvents,
        new Map([[adjustedEvent, originalEvent]]),
      );
    }
    this.dragAlreadyMoved = true;
  }

  dragEnded(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false,
  ) {
    super.dragEnded(
      weekEvent,
      {
        ...dragEndEvent,
        x: 0,
      },
      dayWidth,
      useY,
    );
    const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);
    if (newUser && newUser !== weekEvent.event.meta.user) {
      this.userChanged.emit({ event: weekEvent.event, newUser });
    }
  }

  protected getWeekView(events: CalendarEvent[]) {
    return this.utils.getWeekView({
      events,
      users: this.users,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek,
      ),
    });
  }

  private getDraggedUserColumn(
    dayEvent: WeekViewTimeEvent | WeekViewAllDayEvent,
    xPixels: number,
  ) {
    const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
    const currentColumnIndex = this.view.users.findIndex(
      (user) => user === dayEvent.event.meta.user,
    );
    const newIndex = currentColumnIndex + columnsMoved;
    return this.view.users[newIndex];
  }
}
`;var n=`<div class="cal-week-view" role="grid">
  <div class="cal-day-headers" role="row">
    @for (user of users; track trackByUserId($index, user)) {
      <div class="cal-header" tabindex="0" role="columnheader">
        <b>{{ user.name }}</b>
      </div>
    }
  </div>
  @if (view.allDayEventRows.length > 0) {
    <div
      class="cal-all-day-events"
      #allDayEventsContainer
      mwlDroppable
      (dragEnter)="dragEnter('allDay')"
      (dragLeave)="dragLeave('allDay')"
    >
      <div class="cal-day-columns">
        <div
          class="cal-time-label-column"
          [ngTemplateOutlet]="allDayEventsLabelTemplate"
        ></div>
        @for (day of days; track day.date.toISOString()) {
          <div
            class="cal-day-column"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="eventDropped($event, day.date, true)"
            (dragEnter)="dateDragEnter(day.date)"
          ></div>
        }
      </div>
      @for (eventRow of view.allDayEventRows; track eventRow.id) {
        <div #eventRowContainer class="cal-events-row">
          @for (
            allDayEvent of eventRow.row;
            track allDayEvent.event.id ?? allDayEvent.event
          ) {
            <div
              #event
              class="cal-event-container"
              [class.cal-draggable]="
                allDayEvent.event.draggable && allDayEventResizes.size === 0
              "
              [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
              [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
              [ngClass]="allDayEvent.event?.cssClass"
              [style.width.%]="(100 / users.length) * allDayEvent.span"
              [style.marginLeft.%]="(100 / users.length) * allDayEvent.offset"
              mwlDraggable
              dragActiveClass="cal-drag-active"
              [dropData]="{ event: allDayEvent.event, calendarId: calendarId }"
              [dragAxis]="{
                x: allDayEvent.event.draggable && allDayEventResizes.size === 0,
                y:
                  !snapDraggedEvents &&
                  allDayEvent.event.draggable &&
                  allDayEventResizes.size === 0,
              }"
              [dragSnapGrid]="snapDraggedEvents ? { x: dayColumnWidth } : {}"
              [validateDrag]="validateDrag"
              (dragStart)="
                dragStarted(eventRowContainer, event, allDayEvent, false)
              "
              (dragging)="allDayEventDragMove()"
              (dragEnd)="dragEnded(allDayEvent, $event, dayColumnWidth)"
            >
              <mwl-calendar-week-view-event
                [locale]="locale"
                [weekEvent]="allDayEvent"
                [tooltipPlacement]="tooltipPlacement"
                [tooltipTemplate]="tooltipTemplate"
                [tooltipAppendToBody]="tooltipAppendToBody"
                [tooltipDelay]="tooltipDelay"
                [customTemplate]="eventTemplate"
                [eventTitleTemplate]="eventTitleTemplate"
                [eventActionsTemplate]="eventActionsTemplate"
                [daysInWeek]="daysInWeek"
                (eventClicked)="
                  eventClicked.emit({
                    event: allDayEvent.event,
                    sourceEvent: $event.sourceEvent,
                  })
                "
              />
            </div>
          }
        </div>
      }
    </div>
  }
  <div
    class="cal-time-events"
    mwlDroppable
    (dragEnter)="dragEnter('time')"
    (dragLeave)="dragLeave('time')"
  >
    @if (view.hourColumns.length > 0) {
      <div class="cal-time-label-column">
        @for (
          hour of view.hourColumns[0].hours;
          track hour.segments[0].date.toISOString();
          let odd = $odd
        ) {
          <div class="cal-hour" [class.cal-hour-odd]="odd">
            @for (segment of hour.segments; track segment.date.toISOString()) {
              <mwl-calendar-week-view-hour-segment
                [style.height.px]="hourSegmentHeight"
                [segment]="segment"
                [segmentHeight]="hourSegmentHeight"
                [locale]="locale"
                [customTemplate]="hourSegmentTemplate"
                [isTimeLabel]="true"
              />
            }
          </div>
        }
      </div>
    }
    <div
      class="cal-day-columns"
      [class.cal-resize-active]="timeEventResizes.size > 0"
      #dayColumns
    >
      @for (
        column of view.hourColumns;
        track column.hours[0]
          ? column.hours[0].segments[0].date.toISOString()
          : column
      ) {
        <div class="cal-day-column">
          <mwl-calendar-week-view-current-time-marker
            [columnDate]="column.date"
            [dayStartHour]="dayStartHour"
            [dayStartMinute]="dayStartMinute"
            [dayEndHour]="dayEndHour"
            [dayEndMinute]="dayEndMinute"
            [hourSegments]="hourSegments"
            [hourSegmentHeight]="hourSegmentHeight"
            [customTemplate]="currentTimeMarkerTemplate"
          />
          @for (
            timeEvent of column.events;
            track timeEvent.event.id ?? timeEvent.event
          ) {
            <div
              #event
              class="cal-event-container"
              [class.cal-draggable]="
                timeEvent.event.draggable && timeEventResizes.size === 0
              "
              [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
              [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
              [ngClass]="timeEvent.event.cssClass"
              [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
              [style.top.px]="timeEvent.top"
              [style.height.px]="timeEvent.height"
              [style.left.%]="timeEvent.left"
              [style.width.%]="timeEvent.width"
              mwlResizable
              [resizeSnapGrid]="{
                left: dayColumnWidth,
                right: dayColumnWidth,
                top: eventSnapSize || hourSegmentHeight,
                bottom: eventSnapSize || hourSegmentHeight,
              }"
              [validateResize]="validateResize"
              [allowNegativeResizes]="true"
              (resizeStart)="
                timeEventResizeStarted(dayColumns, timeEvent, $event)
              "
              (resizing)="timeEventResizing(timeEvent, $event)"
              (resizeEnd)="timeEventResizeEnded(timeEvent)"
              mwlDraggable
              dragActiveClass="cal-drag-active"
              [dropData]="{ event: timeEvent.event, calendarId: calendarId }"
              [dragAxis]="{
                x: timeEvent.event.draggable && timeEventResizes.size === 0,
                y: timeEvent.event.draggable && timeEventResizes.size === 0,
              }"
              [dragSnapGrid]="
                snapDraggedEvents
                  ? { x: dayColumnWidth, y: eventSnapSize || hourSegmentHeight }
                  : {}
              "
              [ghostDragEnabled]="!snapDraggedEvents"
              [validateDrag]="validateDrag"
              (dragStart)="dragStarted(dayColumns, event, timeEvent, true)"
              (dragging)="dragMove(timeEvent, $event)"
              (dragEnd)="dragEnded(timeEvent, $event, dayColumnWidth, true)"
            >
              @if (
                timeEvent.event?.resizable?.beforeStart &&
                !timeEvent.startsBeforeDay
              ) {
                <div
                  class="cal-resize-handle cal-resize-handle-before-start"
                  mwlResizeHandle
                  [resizeEdges]="{
                    left: true,
                    top: true,
                  }"
                ></div>
              }
              <mwl-calendar-week-view-event
                [locale]="locale"
                [weekEvent]="timeEvent"
                [tooltipPlacement]="tooltipPlacement"
                [tooltipTemplate]="tooltipTemplate"
                [tooltipAppendToBody]="tooltipAppendToBody"
                [tooltipDisabled]="dragActive || timeEventResizes.size > 0"
                [tooltipDelay]="tooltipDelay"
                [customTemplate]="eventTemplate"
                [eventTitleTemplate]="eventTitleTemplate"
                [eventActionsTemplate]="eventActionsTemplate"
                [column]="column"
                (eventClicked)="
                  eventClicked.emit({
                    event: timeEvent.event,
                    sourceEvent: $event.sourceEvent,
                  })
                "
              />
              @if (
                timeEvent.event?.resizable?.afterEnd && !timeEvent.endsAfterDay
              ) {
                <div
                  class="cal-resize-handle cal-resize-handle-after-end"
                  mwlResizeHandle
                  [resizeEdges]="{
                    right: true,
                    bottom: true,
                  }"
                ></div>
              }
            </div>
          }

          @for (
            hour of column.hours;
            track hour.segments[0].date.toISOString();
            let odd = $odd
          ) {
            <div class="cal-hour" [class.cal-hour-odd]="odd">
              @for (
                segment of hour.segments;
                track segment.date.toISOString()
              ) {
                <mwl-calendar-week-view-hour-segment
                  [style.height.px]="hourSegmentHeight"
                  [segment]="segment"
                  [segmentHeight]="hourSegmentHeight"
                  [locale]="locale"
                  [customTemplate]="hourSegmentTemplate"
                  (mwlClick)="
                    hourSegmentClicked.emit({
                      date: segment.date,
                      sourceEvent: $event,
                    })
                  "
                  [clickListenerDisabled]="!hourSegmentClicked.observed"
                  mwlDroppable
                  [dragOverClass]="
                    !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null
                  "
                  dragActiveClass="cal-drag-active"
                  (drop)="eventDropped($event, segment.date, false)"
                />
              }
            </div>
          }
        </div>
      }
    </div>
  </div>
</div>
`;var w=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t},{filename:"day-view-scheduler.component.ts",contents:a},{filename:"day-view-scheduler.component.html",contents:n}];export{w as sources};
