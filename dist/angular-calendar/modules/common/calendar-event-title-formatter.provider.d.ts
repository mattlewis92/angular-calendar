import { CalendarEvent } from 'calendar-utils';
/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
 * @Injectable()
 * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
 *
 *   month(event: CalendarEvent): string {
 *     return `Custom prefix: ${event.title}`;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarEventTitleFormatter,
 *  useClass: CustomEventTitleFormatter
 * }]
 * ```
 */
export declare class CalendarEventTitleFormatter {
    /**
     * The month view event title.
     */
    month(event: CalendarEvent, title: string): string;
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    monthTooltip(event: CalendarEvent, title: string): string;
    /**
     * The week view event title.
     */
    week(event: CalendarEvent, title: string): string;
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    weekTooltip(event: CalendarEvent, title: string): string;
    /**
     * The day view event title.
     */
    day(event: CalendarEvent, title: string): string;
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    dayTooltip(event: CalendarEvent, title: string): string;
}
