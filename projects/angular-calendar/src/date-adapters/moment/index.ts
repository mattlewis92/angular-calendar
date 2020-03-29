import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/moment';
import { DateAdapter } from '../date-adapter';

export function adapterFactory(moment): DateAdapter {
  return {
    ...baseAdapterFactory(moment),

    addWeeks(date: Date | number, amount: number): Date {
      return moment(date).add(amount, 'weeks').toDate();
    },

    addMonths(date: Date | number, amount: number): Date {
      return moment(date).add(amount, 'months').toDate();
    },

    subDays(date: Date | number, amount: number): Date {
      return moment(date).subtract(amount, 'days').toDate();
    },

    subWeeks(date: Date | number, amount: number): Date {
      return moment(date).subtract(amount, 'weeks').toDate();
    },

    subMonths(date: Date | number, amount: number): Date {
      return moment(date).subtract(amount, 'months').toDate();
    },

    getISOWeek(date: Date | number): number {
      return moment(date).isoWeek();
    },

    setDate(date: Date | number, dayOfMonth: number): Date {
      return moment(date).date(dayOfMonth).toDate();
    },

    setMonth(date: Date | number, month: number): Date {
      return moment(date).month(month).toDate();
    },

    setYear(date: Date | number, year: number): Date {
      return moment(date).year(year).toDate();
    },

    getDate(date: Date | number): number {
      return moment(date).date();
    },

    getYear(date: Date | number): number {
      return moment(date).year();
    },
  };
}
