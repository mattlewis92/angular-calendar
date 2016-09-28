import { PipeTransform } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventTitle as CalendarEventTitleService } from './../providers/calendarEventTitle.provider';
export declare class CalendarEventTitle implements PipeTransform {
    private calendarEventTitle;
    constructor(calendarEventTitle: CalendarEventTitleService);
    transform(event: CalendarEvent, titleType: string): string;
}
