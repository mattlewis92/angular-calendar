import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  // you can override any of the methods defined in the parent class

  monthTooltip(event: CalendarEvent): string {
    return;
  }

  weekTooltip(event: CalendarEvent): string {
    return;
  }

  dayTooltip(event: CalendarEvent): string {
    return;
  }
}
