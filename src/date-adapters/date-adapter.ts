import { DateAdapter as BaseDateAdapter } from 'calendar-utils/date-adapters';

export abstract class DateAdapter implements BaseDateAdapter {
  abstract addWeeks(date: Date | string | number, amount: number): Date;

  abstract addMonths(date: Date | string | number, amount: number): Date;

  abstract subDays(date: Date | string | number, amount: number): Date;

  abstract subWeeks(date: Date | string | number, amount: number): Date;

  abstract subMonths(date: Date | string | number, amount: number): Date;

  abstract getISOWeek(date: Date | string | number): number;

  abstract setDate(date: Date | string | number, dayOfMonth: number): Date;

  abstract setMonth(date: Date | string | number, month: number): Date;

  abstract setYear(date: Date | string | number, year: number): Date;

  abstract getDate(date: Date | string | number): number;

  abstract getMonth(date: Date | string | number): number;

  abstract getYear(date: Date | string | number): number;

  abstract addDays(date: Date | string | number, amount: number): Date;

  abstract addHours(date: Date | string | number, amount: number): Date;

  abstract addMinutes(date: Date | string | number, amount: number): Date;

  abstract addSeconds(date: Date | string | number, amount: number): Date;

  abstract differenceInDays(
    dateLeft: Date | string | number,
    dateRight: Date | string | number
  ): number;

  abstract differenceInMinutes(
    dateLeft: Date | string | number,
    dateRight: Date | string | number
  ): number;

  abstract differenceInSeconds(
    dateLeft: Date | string | number,
    dateRight: Date | string | number
  ): number;

  abstract endOfDay(date: Date | string | number): Date;

  abstract endOfMonth(date: Date | string | number): Date;

  abstract endOfWeek(
    date: Date | string | number,
    options?: { weekStartsOn?: number }
  ): Date;

  abstract getDay(date: Date | string | number): number;

  abstract isSameDay(
    dateLeft: Date | string | number,
    dateRight: Date | string | number
  ): boolean;

  abstract isSameMonth(
    dateLeft: Date | string | number,
    dateRight: Date | string | number
  ): boolean;

  abstract isSameSecond(
    dateLeft: Date | string | number,
    dateRight: Date | string | number
  ): boolean;

  abstract max(...dates: Array<Date | string | number>): Date;

  abstract setHours(date: Date | string | number, hours: number): Date;

  abstract setMinutes(date: Date | string | number, minutes: number): Date;

  abstract startOfDay(date: Date | string | number): Date;

  abstract startOfMinute(date: Date | string | number): Date;

  abstract startOfMonth(date: Date | string | number): Date;

  abstract startOfWeek(
    date: Date | string | number,
    options?: { weekStartsOn?: number }
  ): Date;
}
