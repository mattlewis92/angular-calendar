import { InjectionToken, Inject } from '@angular/core';
import {
  CalendarDateFormatterInterface,
  DateFormatterParams
} from '../interfaces/calendarDateFormatter.interface';

export const MOMENT: InjectionToken<string> = new InjectionToken('Moment');

/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```typescript
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import * as moment from 'moment';
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
export class CalendarMomentDateFormatter
  implements CalendarDateFormatterInterface {
  /**
   * @hidden
   */
  constructor(@Inject(MOMENT) private moment: any) {}

  /**
   * The month view header week day labels
   */
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('dddd');
  }

  /**
   * The month view cell day number
   */
  public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('D');
  }

  /**
   * The month view title
   */
  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('MMMM YYYY');
  }

  /**
   * The week view header week day labels
   */
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('dddd');
  }

  /**
   * The week view sub header day and month labels
   */
  public weekViewColumnSubHeader({
    date,
    locale
  }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('D MMM');
  }

  /**
   * The week view title
   */
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('[Week] W [of] YYYY');
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('ha');
  }

  /**
   * The day view title
   */
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return this.moment(date)
      .locale(locale)
      .format('dddd, D MMMM, YYYY');
  }
}
