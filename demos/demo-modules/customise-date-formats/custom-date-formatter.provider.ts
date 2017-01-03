import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

export class CustomDateFormatter extends CalendarDateFormatter {

  // you can override any of the methods defined in the parent class

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
  }

  public monthViewTitle({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'short'}).format(date);
  }

  public weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
  }

  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);
  }

}