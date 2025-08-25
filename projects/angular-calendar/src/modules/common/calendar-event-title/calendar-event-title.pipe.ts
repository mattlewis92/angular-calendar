import { Pipe, PipeTransform, inject } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventTitleFormatter } from '../calendar-event-title-formatter/calendar-event-title-formatter.provider';

@Pipe({
  name: 'calendarEventTitle',
  standalone: false,
})
export class CalendarEventTitlePipe implements PipeTransform {
  /**
   * @hidden
   */
  private calendarEventTitle = inject(CalendarEventTitleFormatter);
  transform(title: string, titleType: string, event: CalendarEvent): string {
    return this.calendarEventTitle[titleType](event, title);
  }
}
