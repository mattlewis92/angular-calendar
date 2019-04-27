import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { CalendarDayViewComponent, CalendarUtils } from 'angular-calendar';
import { DayView, DayViewEvent, GetDayViewArgs } from 'calendar-utils';

const EVENT_WIDTH = 150;

// extend the interface to add the array of users
interface DayViewScheduler extends DayView {
  users: any[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  getDayView(args: GetDayViewArgs): DayViewScheduler {
    const view: DayViewScheduler = {
      ...super.getDayView(args),
      users: []
    };
    view.events.forEach(({ event }) => {
      // assumes user objects are the same references,
      // if 2 users have the same structure but different object references this will fail
      if (!view.users.includes(event.meta.user)) {
        view.users.push(event.meta.user);
      }
    });
    // sort the users by their names
    view.users.sort((user1, user2) => user1.name.localeCompare(user2.name));
    view.events = view.events.map(dayViewEvent => {
      const index = view.users.indexOf(dayViewEvent.event.meta.user);
      dayViewEvent.left = index * EVENT_WIDTH; // change the column of the event
      return dayViewEvent;
    });
    view.width = view.users.length * EVENT_WIDTH;
    return view;
  }
}

@Component({
  // tslint:disable-line max-classes-per-file
  selector: 'mwl-day-view-scheduler',
  styles: [
    `
      .day-view-column-headers {
        display: flex;
        margin-left: 70px;
      }
      .day-view-column-header {
        width: 150px;
        border: solid 1px black;
        text-align: center;
      }
    `
  ],
  providers: [
    {
      provide: CalendarUtils,
      useClass: DayViewSchedulerCalendarUtils
    }
  ],
  templateUrl: 'day-view-scheduler.component.html'
})
export class DayViewSchedulerComponent extends CalendarDayViewComponent {
  view: DayViewScheduler;

  @Output() userChanged = new EventEmitter();

  eventDragged(dayEvent: DayViewEvent, xPixels: number, yPixels: number): void {
    super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour
    if (xPixels !== 0) {
      const columnsMoved = xPixels / EVENT_WIDTH;
      const currentColumnIndex = this.view.users.findIndex(
        user => user === dayEvent.event.meta.user
      );
      const newIndex = currentColumnIndex + columnsMoved;
      const newUser = this.view.users[newIndex];
      if (newUser) {
        this.userChanged.emit({ event: dayEvent.event, newUser });
      }
    }
  }
}
