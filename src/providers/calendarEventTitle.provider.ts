import {CalendarEvent} from 'calendar-utils';

export class CalendarEventTitle {

  month(event: CalendarEvent): string {
    return event.title;
  }

  week(event: CalendarEvent): string {
    return event.title;
  }

  day(event: CalendarEvent): string {
    return event.title;
  }

}