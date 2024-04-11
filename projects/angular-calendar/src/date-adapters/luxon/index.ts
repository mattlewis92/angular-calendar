import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/luxon';
import { DateTime } from 'luxon';
import { DateAdapter } from '../date-adapter';

export function adapterFactory(): DateAdapter {
  let coerceDateTime = (date: Date | number) => typeof date === 'number' ? DateTime.fromMillis(date) : DateTime.fromJSDate(date)

  return {
    ...baseAdapterFactory(),

    addWeeks(date: Date | number, amount: number): Date {
      return coerceDateTime(date).plus({ weeks: amount }).toJSDate();
    },

    addMonths(date: Date | number, amount: number): Date {
      return coerceDateTime(date).plus({ months: amount }).toJSDate();
    },

    subDays(date: Date | number, amount: number): Date {
      return coerceDateTime(date).minus({ days: amount }).toJSDate();
    },

    subWeeks(date: Date | number, amount: number): Date {
      return coerceDateTime(date).minus({ weeks: amount }).toJSDate();
    },

    subMonths(date: Date | number, amount: number): Date {
      return coerceDateTime(date).minus({ months: amount }).toJSDate();
    },

    getISOWeek(date: Date | number): number {
      return coerceDateTime(date).weekNumber;
    },

    setDate(date: Date | number, dayOfMonth: number): Date {
      return coerceDateTime(date).set({ day: dayOfMonth }).toJSDate();
    },

    setMonth(date: Date | number, month: number): Date {
        return coerceDateTime(date).set({ month: month + 1 }).toJSDate();
    },

    setYear(date: Date | number, year: number): Date {
        return coerceDateTime(date).set({ year: year }).toJSDate();
    },

    getDate(date: Date | number): number {
      return coerceDateTime(date).day;
    },

    getYear(date: Date | number): number {
        return coerceDateTime(date).year;
    },
  };
}
