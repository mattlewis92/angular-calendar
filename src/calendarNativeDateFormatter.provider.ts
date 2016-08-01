import {CalendarDateFormatterInterface, DateFormatterParams} from './calendarDateFormatter.interface';

// TODO - move this into its own module that people can re-use
const getWeekNumber: Function = (date: Date): number => {
  // source: https://weeknumber.net/how-to/javascript
  const dateClone: Date = new Date(date.getTime());
  dateClone.setHours(0, 0, 0, 0);
  dateClone.setDate(dateClone.getDate() + 3 - (dateClone.getDay() + 6) % 7);
  const week1: Date = new Date(dateClone.getFullYear(), 0, 4);
  return 1 + Math.round(((dateClone.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export class CalendarNativeDateFormatter implements CalendarDateFormatterInterface {

  public monthViewColumnHeader({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'long'}).format(date);
  }

  public monthViewDayNumber({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {day: 'numeric'}).format(date);
  }

  public monthViewTitle({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'long'}).format(date);
  }

  public weekViewColumnHeader({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'long'}).format(date);
  }

  public weekViewColumnSubHeader({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  public weekViewTitle({date, locale = 'en'}: DateFormatterParams): string {
    const year: string = new Intl.DateTimeFormat(locale, {year: 'numeric'}).format(date);
    const weekNumber: number = getWeekNumber(date);
    return `Week ${weekNumber} of ${year}`;
  }

  public dayViewHour({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }

  public dayViewTitle({date, locale = 'en'}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    }).format(date);
  }

}