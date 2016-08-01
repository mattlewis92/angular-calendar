import {CalendarEvent} from 'calendar-utils';

export class CalendarConfig {

  eventTitles: any = {
    month(event: CalendarEvent): string {
      return event.title;
    },
    week(event: CalendarEvent): string {
      return event.title;
    },
    day(event: CalendarEvent): string {
      return event.title;
    }
  };

}