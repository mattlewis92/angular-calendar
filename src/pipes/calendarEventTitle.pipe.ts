import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventTitleFormatter } from '../providers/calendarEventTitle.provider';

@Pipe({
  name: 'calendarEventTitle'
})
export class CalendarEventTitle implements PipeTransform {

  constructor(private calendarEventTitle: CalendarEventTitleFormatter) {}

  transform(event: CalendarEvent, titleType: string): string {
    return this.calendarEventTitle[titleType](event);
  }

}