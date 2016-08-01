import {Pipe, PipeTransform} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';
import {CalendarConfig} from './../providers/calendarConfig.provider';

@Pipe({
  name: 'calendarEventTitle'
})
export class CalendarEventTitle implements PipeTransform {

  constructor(private calendarConfig: CalendarConfig) {}

  transform(event: CalendarEvent, titleType: string): string {
    return this.calendarConfig.eventTitles[titleType](event);
  }

}