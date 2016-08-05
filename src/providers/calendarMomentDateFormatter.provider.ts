import * as moment from 'moment';
import {CalendarDateFormatterInterface, DateFormatterParams} from './../interfaces/calendarDateFormatter.interface';

export class CalendarMomentDateFormatter implements CalendarDateFormatterInterface {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('dddd');
  }

  public monthViewDayNumber({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('D');
  }

  public monthViewTitle({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('MMMM YYYY');
  }

  public weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('dddd');
  }

  public weekViewColumnSubHeader({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('D MMM');
  }

  public weekViewTitle({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('[Week] W [of] YYYY');
  }

  public dayViewHour({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('ha');
  }

  public dayViewTitle({date, locale}: DateFormatterParams): string {
    return moment(date).locale(locale).format('dddd, D MMMM, YYYY');
  }

}