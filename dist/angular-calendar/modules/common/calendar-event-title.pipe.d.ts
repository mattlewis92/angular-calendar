import { PipeTransform } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
export declare class CalendarEventTitlePipe implements PipeTransform {
    private calendarEventTitle;
    constructor(calendarEventTitle: CalendarEventTitleFormatter);
    transform(title: string, titleType: string, event: CalendarEvent): string;
}
