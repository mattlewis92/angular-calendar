import { CalendarEvent } from 'calendar-utils';
export declare class CalendarEventTitle {
    month(event: CalendarEvent): string;
    monthTooltip(event: CalendarEvent): string;
    week(event: CalendarEvent): string;
    weekTooltip(event: CalendarEvent): string;
    day(event: CalendarEvent): string;
}
