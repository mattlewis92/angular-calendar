import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric'
    }).format(event.start)}</b> ${event.title}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric'
    }).format(event.start)}</b> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric'
    }).format(event.start)}</b> ${event.title}`;
  }
}
