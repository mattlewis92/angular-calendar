import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  LOCALE_ID,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  CalendarUtils,
  CalendarWeekViewComponent,
  DateAdapter,
  getWeekViewPeriod
} from 'angular-calendar';
import {
  WeekView,
  GetWeekViewArgs,
  WeekViewTimeEvent,
  EventColor,
  CalendarEvent
} from 'calendar-utils';
import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';

const EVENT_WIDTH = 150;

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
      users: [...args.users]
    };

    view.users.forEach(user => {
      const events = args.events.filter(
        event => event.meta.user.id === user.id
      );
      const columnView = super.getWeekView({
        ...args,
        events
      });
      view.hourColumns.push(columnView.hourColumns[0]);
    });

    return view;
  }
}

@Component({
  // tslint:disable-line max-classes-per-file
  selector: 'mwl-day-view-scheduler',
  templateUrl: 'day-view-scheduler.component.html',
  providers: [DayViewSchedulerCalendarUtils]
})
export class DayViewSchedulerComponent extends CalendarWeekViewComponent
  implements OnChanges {
  @Input() users: User[] = [];

  @Output() userChanged = new EventEmitter();

  view: DayViewScheduler;

  daysInWeek = 1;

  private originalLeft: number;

  constructor(
    protected cdr: ChangeDetectorRef,
    protected utils: DayViewSchedulerCalendarUtils,
    @Inject(LOCALE_ID) locale: string,
    protected dateAdapter: DateAdapter
  ) {
    super(cdr, utils, locale, dateAdapter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.users) {
      this.view = this.getWeekView(this.events);
    }
  }

  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.users.length);
  }

  dragStarted(
    eventsContainer: HTMLElement,
    event: HTMLElement,
    dayEvent?: WeekViewTimeEvent
  ) {
    this.originalLeft = dayEvent.left;
    super.dragStarted(eventsContainer, event, dayEvent);
  }

  dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    const originalX = dragEvent.x;
    dragEvent.x = 0;
    super.dragMove(dayEvent, dragEvent);
    this.view.hourColumns.forEach(column => {
      column.events.forEach(iDayEvent => {
        if (iDayEvent.event === dayEvent.event) {
          const columnsMoved = Math.round(originalX / this.dayColumnWidth);
          iDayEvent.left = this.originalLeft + 100 * columnsMoved;
        }
      });
    });
  }

  dragEnded(
    weekEvent: WeekViewTimeEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false
  ) {
    super.dragEnded(
      weekEvent,
      {
        ...dragEndEvent,
        x: 0
      },
      dayWidth,
      useY
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
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      )
    });
  }

  private getDraggedUserColumn(dayEvent: WeekViewTimeEvent, xPixels: number) {
    const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
    const currentColumnIndex = this.view.users.findIndex(
      user => user === dayEvent.event.meta.user
    );
    const newIndex = currentColumnIndex + columnsMoved;
    return this.view.users[newIndex];
  }
}
