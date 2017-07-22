import {
  CalendarDateFormatterInterface,
  DateFormatterParams
} from './../interfaces/calendarDateFormatter.interface';
import getISOWeek from 'date-fns/get_iso_week';

/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting. It is the default date formatter used by the calendar.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
export class CalendarNativeDateFormatter
  implements CalendarDateFormatterInterface {
  /**
   * The month view header week day labels
   */
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }

  /**
   * The month view cell day number
   */
  public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
  }

  /**
   * The month view title
   */
  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long'
    }).format(date);
  }

  /**
   * The week view header week day labels
   */
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }

  /**
   * The week view sub header day and month labels
   */
  public weekViewColumnSubHeader({
    date,
    locale
  }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  /**
   * The week view title
   */
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new Intl.DateTimeFormat(locale, {
      year: 'numeric'
    }).format(date);
    const weekNumber: number = getISOWeek(date);
    return `Week ${weekNumber} of ${year}`;
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
  }

  /**
   * The day view title
   */
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    }).format(date);
  }
}
