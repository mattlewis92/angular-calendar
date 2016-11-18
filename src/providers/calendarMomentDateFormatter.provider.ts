import { OpaqueToken, Inject } from '@angular/core';
import { CalendarDateFormatterInterface, DateFormatterParams } from './../interfaces/calendarDateFormatter.interface';

export const MOMENT: OpaqueToken = new OpaqueToken('Moment');

export class CalendarMomentDateFormatter implements CalendarDateFormatterInterface {

  /**
   * @private
   */
  constructor(@Inject(MOMENT) private moment: any) {}

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('dddd');
  }

  public monthViewDayNumber({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('D');
  }

  public monthViewTitle({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('MMMM YYYY');
  }

  public weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('dddd');
  }

  public weekViewColumnSubHeader({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('D MMM');
  }

  public weekViewTitle({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('[Week] W [of] YYYY');
  }

  public dayViewHour({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('ha');
  }

  public dayViewTitle({date, locale}: DateFormatterParams): string {
    return this.moment(date).locale(locale).format('dddd, D MMMM, YYYY');
  }

}