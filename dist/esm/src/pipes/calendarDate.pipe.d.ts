import { PipeTransform } from '@angular/core';
import { CalendarDateFormatter } from './../providers/calendarDateFormatter.provider';
export declare class CalendarDate implements PipeTransform {
    private dateFormatter;
    private locale;
    constructor(dateFormatter: CalendarDateFormatter, locale: string);
    transform(date: Date, method: string, locale?: string): string;
}
