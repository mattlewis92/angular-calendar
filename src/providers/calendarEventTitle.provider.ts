import { CalendarEvent } from 'calendar-utils';

export class CalendarEventTitle {

  month(event: CalendarEvent): string {
    return event.title;
  }

  monthTooltip(event: CalendarEvent): string {
    return event.title;
  }

  week(event: CalendarEvent): string {
    return event.title;
  }

  weekTooltip(event: CalendarEvent): string {
    return event.title;
  }

  day(event: CalendarEvent): string {
    return event.title;
  }

  dayTooltip(event: CalendarEvent): string {
    return event.title;
  }

}