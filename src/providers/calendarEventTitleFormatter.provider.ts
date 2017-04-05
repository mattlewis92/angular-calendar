import { CalendarEvent } from 'calendar-utils';

/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```typescript
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
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
export class CalendarEventTitleFormatter {

  /**
   * The month view event title.
   */
  month(event: CalendarEvent): string {
    return event.title;
  }

  /**
   * The month view event tooltip. Return a falsey value from this to disable the tooltip.
   */
  monthTooltip(event: CalendarEvent): string {
    return event.title;
  }

  /**
   * The week view event title.
   */
  week(event: CalendarEvent): string {
    return event.title;
  }

  /**
   * The week view event tooltip. Return a falsey value from this to disable the tooltip.
   */
  weekTooltip(event: CalendarEvent): string {
    return event.title;
  }

  /**
   * The day view event title.
   */
  day(event: CalendarEvent): string {
    return event.title;
  }

  /**
   * The day view event tooltip. Return a falsey value from this to disable the tooltip.
   */
  dayTooltip(event: CalendarEvent): string {
    return event.title;
  }

}