import {
  CalendarDateFormatterInterface,
  DateFormatterParams
} from './calendar-date-formatter.interface';
import getISOWeek from 'date-fns/get_iso_week';
import { DatePipe, VERSION } from '@angular/common';

/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting. It is the default date formatter used by the calendar.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
export class CalendarAngularDateFormatter
  implements CalendarDateFormatterInterface {
  /**
   * The month view header week day labels
   */
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return ((new DatePipe(locale) as any) as any).transform(
      date,
      'EEEE',
      locale
    );
  }

  /**
   * The month view cell day number
   */
  public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return (new DatePipe(locale) as any).transform(date, 'd', locale);
  }

  /**
   * The month view title
   */
  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return (new DatePipe(locale) as any).transform(date, 'MMMM y', locale);
  }

  /**
   * The week view header week day labels
   */
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return (new DatePipe(locale) as any).transform(date, 'EEEE', locale);
  }

  /**
   * The week view sub header day and month labels
   */
  public weekViewColumnSubHeader({
    date,
    locale
  }: DateFormatterParams): string {
    return (new DatePipe(locale) as any).transform(date, 'MMM d', locale);
  }

  /**
   * The week view title
   */
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = (new DatePipe(locale) as any).transform(
      date,
      'y',
      locale
    );
    const weekNumber: number = getISOWeek(date);
    return `Week ${weekNumber} of ${year}`;
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    const format = +VERSION.major === 4 ? 'j' : 'h a';
    return (new DatePipe(locale) as any).transform(date, format, locale);
  }

  /**
   * The day view title
   */
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return (new DatePipe(locale) as any).transform(
      date,
      'EEEE, MMMM d, y',
      locale
    );
  }
}
