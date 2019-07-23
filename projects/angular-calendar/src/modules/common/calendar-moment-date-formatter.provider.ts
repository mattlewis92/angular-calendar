import { InjectionToken, Inject, Injectable } from '@angular/core';
import {
  CalendarDateFormatterInterface,
  DateFormatterParams
} from './calendar-date-formatter.interface';
import { getWeekViewPeriod } from './util';
import { DateAdapter } from '../../date-adapters/date-adapter';

export const MOMENT: InjectionToken<string> = new InjectionToken('Moment');

/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```typescript
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import moment from 'moment';
 *
 * // in your component
 * provide: [{
 *   provide: MOMENT, useValue: moment
 * }, {
 *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
 * }]
 *
 * ```
 */
@Injectable()
export class CalendarMomentDateFormatter
  implements CalendarDateFormatterInterface {
  /**
   * @hidden
   */
  constructor(
    @Inject(MOMENT) protected moment: any,
    protected dateAdapter: DateAdapter
  ) {}

  /**
   * The month view header week day labels
   */
  public monthViewColumnHeader({
    date,
    locale,
    timezone
  }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('dddd');
  }

  /**
   * The month view cell day number
   */
  public monthViewDayNumber({
    date,
    locale,
    timezone
  }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('D');
  }

  /**
   * The month view title
   */
  public monthViewTitle({
    date,
    locale,
    timezone
  }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('MMMM YYYY');
  }

  /**
   * The week view header week day labels
   */
  public weekViewColumnHeader({
    date,
    locale,
    timezone
  }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('dddd');
  }

  /**
   * The week view sub header day and month labels
   */
  public weekViewColumnSubHeader({
    date,
    locale,
    timezone
  }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('MMM D');
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
    timezone
  }: DateFormatterParams): string {
    const { viewStart, viewEnd } = getWeekViewPeriod(
      this.dateAdapter.withTimezone(timezone),
      date,
      weekStartsOn,
      excludeDays,
      daysInWeek,
      timezone
    );
    const format = (dateToFormat: Date, showYear: boolean) =>
      this.tzMoment(dateToFormat, timezone)
        .locale(locale)
        .format('MMM D' + (showYear ? ', YYYY' : ''));
    return `${format(
      viewStart,
      viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()
    )} - ${format(viewEnd, true)}`;
  }

  /**
   * The time formatting down the left hand side of the week view
   */
  public weekViewHour({ date, locale, timezone }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('ha');
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public dayViewHour({ date, locale, timezone }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('ha');
  }

  /**
   * The day view title
   */
  public dayViewTitle({ date, locale, timezone }: DateFormatterParams): string {
    return this.tzMoment(date, timezone)
      .locale(locale)
      .format('dddd, D MMMM, YYYY');
  }

  private tzMoment(date: Date, timezone: string) {
    return timezone ? this.moment(date).tz(timezone) : this.moment(date);
  }
}
