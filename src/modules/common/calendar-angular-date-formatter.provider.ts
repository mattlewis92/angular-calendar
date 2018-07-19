import {
  CalendarDateFormatterInterface,
  DateFormatterParams
} from './calendar-date-formatter.interface';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';

/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
@Injectable()
export class CalendarAngularDateFormatter
  implements CalendarDateFormatterInterface {
  constructor(private dateAdapter: DateAdapter) {}

  /**
   * The month view header week day labels
   */
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEEE', null, locale);
  }

  /**
   * The month view cell day number
   */
  public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'd', null, locale);
  }

  /**
   * The month view title
   */
  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MMMM y', null, locale);
  }

  /**
   * The week view header week day labels
   */
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEEE', null, locale);
  }

  /**
   * The week view sub header day and month labels
   */
  public weekViewColumnSubHeader({
    date,
    locale
  }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MMM d', null, locale);
  }

  /**
   * The week view title
   */
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(
      date,
      'y',
      null,
      locale
    );
    const weekNumber: number = this.dateAdapter.getISOWeek(date);
    return `Week ${weekNumber} of ${year}`;
  }

  /**
   * The time formatting down the left hand side of the week view
   */
  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'h a', null, locale);
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'h a', null, locale);
  }

  /**
   * The day view title
   */
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(
      date,
      'EEEE, MMMM d, y',
      null,
      locale
    );
  }
}
