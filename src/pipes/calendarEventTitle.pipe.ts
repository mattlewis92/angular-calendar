import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventTitle as CalendarEventTitleService } from './../providers/calendarEventTitle.provider';

@Pipe({
  name: 'calendarEventTitle'
})
export class CalendarEventTitle implements PipeTransform {

  constructor(private calendarEventTitle: CalendarEventTitleService) {}

  transform(event: CalendarEvent, titleType: string): string {
    return this.calendarEventTitle[titleType](event);
  }

}