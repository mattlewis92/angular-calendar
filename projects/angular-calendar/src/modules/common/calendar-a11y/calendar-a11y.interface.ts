import { MonthViewDay, CalendarEvent, EventAction } from 'calendar-utils';

/**
 * The parameters passed to the a11y methods.
 */
export interface A11yParams {
  /**
   * A day in the month view
   */
  day?: MonthViewDay;

  /**
   * A date
   */
  date?: Date;

  /**
   * A calendar event
   */
  event?: CalendarEvent;

  /**
   * Action button label e.g. 'Edit'
   */
  action?: EventAction;

  /**
   * Users preferred locale
   */
  locale?: string;
}
