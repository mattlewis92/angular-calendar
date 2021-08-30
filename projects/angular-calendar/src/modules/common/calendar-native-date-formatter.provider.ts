import {
  CalendarDateFormatterInterface,
  DateFormatterParams,
} from './calendar-date-formatter.interface';
import { Injectable } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { getWeekViewPeriod } from './util';

/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
@Injectable()
export class CalendarNativeDateFormatter
  implements CalendarDateFormatterInterface
{
  constructor(protected dateAdapter: DateAdapter) {}

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
      month: 'long',
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
    locale,
  }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
    }).format(date);
  }

  /**
   * The week view title
   */
  public weekViewTitle({
    date,
    locale,
    weekStartsOn,
    excludeDays,
    daysInWeek,
  }: DateFormatterParams): string {
    const { viewStart, viewEnd } = getWeekViewPeriod(
      this.dateAdapter,
      date,
      weekStartsOn,
      excludeDays,
      daysInWeek
    );

    const format = (dateToFormat: Date, showYear: boolean) =>
      new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: showYear ? 'numeric' : undefined,
      }).format(dateToFormat);

    return `${format(
      viewStart,
      viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()
    )} - ${format(viewEnd, true)}`;
  }

  /**
   * The time formatting down the left hand side of the week view
   */
  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
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
      weekday: 'long',
    }).format(date);
  }
}
