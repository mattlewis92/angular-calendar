import {
  CalendarDateFormatterInterface,
  DateFormatterParams,
} from './calendar-date-formatter.interface';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { getWeekViewPeriod } from './util';

/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
@Injectable()
export class CalendarAngularDateFormatter
  implements CalendarDateFormatterInterface
{
  constructor(protected dateAdapter: DateAdapter) {}

  /**
   * The month view header week day labels
   */
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE', locale);
  }

  /**
   * The month view cell day number
   */
  public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'd', locale);
  }

  /**
   * The month view title
   */
  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'LLLL y', locale);
  }

  /**
   * The week view header week day labels
   */
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE', locale);
  }

  /**
   * The week view sub header day and month labels
   */
  public weekViewColumnSubHeader({
    date,
    locale,
  }: DateFormatterParams): string {
    return formatDate(date, 'MMM d', locale);
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
      formatDate(dateToFormat, 'MMM d' + (showYear ? ', yyyy' : ''), locale);
    return `${format(
      viewStart,
      viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()
    )} - ${format(viewEnd, true)}`;
  }

  /**
   * The time formatting down the left hand side of the week view
   */
  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'h a', locale);
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'h a', locale);
  }

  /**
   * The day view title
   */
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE, MMMM d, y', locale);
  }
}
