import { MonthViewDay, CalendarEvent } from 'calendar-utils';

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
   * Action button label e.g. '<i class="fa fa-fw fa-pencil"></i>'
   */
  label?: string;

  /**
   * Users preferred locale
   */
  locale?: string;
}

/**
 * If using a completely custom a11y provider (i.e. not simply extending the provider) then it should implement this interface.
 */
export interface CalendarA11yInterface {
  /**
   * Aria label for the badges/date of a cell
   * @example: `Saturday October 19 1 event`
   */
  monthCell({ day, locale }: A11yParams): string;

  /**
   * Aria label for the open day events start landmark
   * @example: `Saturday October 19 expanded view`
   */
  openDayEventsLM({ date, locale }: A11yParams): string;

  /**
   * Aria label for alert that a day in the month view was expanded
   * @example: `Saturday October 19 expanded`
   */
  openDayEventsAlert({ date, locale }: A11yParams): string;

  /**
   * Descriptive aria label for an event
   * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
   */
  eventDescription({ event, locale }: A11yParams): string;

  /**
   * Aria label for the calendar event actions icons
   * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
   */
  actionButtonLabel({ label }: A11yParams): string;
}
