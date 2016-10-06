import { CalendarDateFormatterInterface, DateFormatterParams } from './../interfaces/calendarDateFormatter.interface';
import getISOWeek from 'date-fns/get_iso_week';

export class CalendarNativeDateFormatter implements CalendarDateFormatterInterface {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'long'}).format(date);
  }

  public monthViewDayNumber({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {day: 'numeric'}).format(date);
  }

  public monthViewTitle({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'long'}).format(date);
  }

  public weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'long'}).format(date);
  }

  public weekViewColumnSubHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  public weekViewTitle({date, locale}: DateFormatterParams): string {
    const year: string = new Intl.DateTimeFormat(locale, {year: 'numeric'}).format(date);
    const weekNumber: number = getISOWeek(date);
    return `Week ${weekNumber} of ${year}`;
  }

  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }

  public dayViewTitle({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    }).format(date);
  }

}