import { DateAdapter as BaseDateAdapter } from 'calendar-utils/date-adapters/date-adapter';

export abstract class DateAdapter implements BaseDateAdapter {
  abstract addWeeks(date: Date | number, amount: number): Date;

  abstract addMonths(date: Date | number, amount: number): Date;

  abstract subDays(date: Date | number, amount: number): Date;

  abstract subWeeks(date: Date | number, amount: number): Date;

  abstract subMonths(date: Date | number, amount: number): Date;

  abstract getISOWeek(date: Date | number): number;

  abstract setDate(date: Date | number, dayOfMonth: number): Date;

  abstract setMonth(date: Date | number, month: number): Date;

  abstract setYear(date: Date | number, year: number): Date;

  abstract getDate(date: Date | number): number;

  abstract getMonth(date: Date | number): number;

  abstract getYear(date: Date | number): number;

  abstract addDays(date: Date | number, amount: number): Date;

  abstract addHours(date: Date | number, amount: number): Date;

  abstract addMinutes(date: Date | number, amount: number): Date;

  abstract addSeconds(date: Date | number, amount: number): Date;

  abstract differenceInDays(
    dateLeft: Date | number,
    dateRight: Date | number
  ): number;

  abstract differenceInMinutes(
    dateLeft: Date | number,
    dateRight: Date | number
  ): number;

  abstract differenceInSeconds(
    dateLeft: Date | number,
    dateRight: Date | number
  ): number;

  abstract endOfDay(date: Date | number): Date;

  abstract endOfMonth(date: Date | number): Date;

  abstract endOfWeek(
    date: Date | number,
    options?: { weekStartsOn?: number }
  ): Date;

  abstract getDay(date: Date | number): number;

  abstract isSameDay(
    dateLeft: Date | number,
    dateRight: Date | number
  ): boolean;

  abstract isSameMonth(
    dateLeft: Date | number,
    dateRight: Date | number
  ): boolean;

  abstract isSameSecond(
    dateLeft: Date | number,
    dateRight: Date | number
  ): boolean;

  abstract max(dates: (Date | number)[]): Date;

  abstract setHours(date: Date | number, hours: number): Date;

  abstract setMinutes(date: Date | number, minutes: number): Date;

  abstract startOfDay(date: Date | number): Date;

  abstract startOfMinute(date: Date | number): Date;

  abstract startOfMonth(date: Date | number): Date;

  abstract startOfWeek(
    date: Date | number,
    options?: { weekStartsOn?: number }
  ): Date;

  abstract getHours(date: Date | number): number;

  abstract getMinutes(date: Date | number): number;

  abstract getTimezoneOffset(date: Date | number): number;
}
