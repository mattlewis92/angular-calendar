import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/moment';
import { DateAdapter } from '../date-adapter';

export function adapterFactory(dayjs): DateAdapter {
  return {
    ...baseAdapterFactory(dayjs),

    addWeeks(date: Date | number, amount: number): Date {
      return dayjs(date).add(amount, 'weeks').toDate();
    },

    addMonths(date: Date | number, amount: number): Date {
      return dayjs(date).add(amount, 'months').toDate();
    },

    subDays(date: Date | number, amount: number): Date {
      return dayjs(date).subtract(amount, 'days').toDate();
    },

    subWeeks(date: Date | number, amount: number): Date {
      return dayjs(date).subtract(amount, 'weeks').toDate();
    },

    subMonths(date: Date | number, amount: number): Date {
      return dayjs(date).subtract(amount, 'months').toDate();
    },

    getISOWeek(date: Date | number): number {
      return dayjs(date).isoWeek();
    },

    setDate(date: Date | number, dayOfMonth: number): Date {
      return dayjs(date).date(dayOfMonth).toDate();
    },

    setMonth(date: Date | number, month: number): Date {
      return dayjs(date).month(month).toDate();
    },

    setYear(date: Date | number, year: number): Date {
      return dayjs(date).year(year).toDate();
    },

    getDate(date: Date | number): number {
      return dayjs(date).date();
    },

    getYear(date: Date | number): number {
      return dayjs(date).year();
    },
  };
}
