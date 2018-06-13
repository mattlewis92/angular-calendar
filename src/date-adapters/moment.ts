import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/moment';
import { DateAdapter } from './date-adapter';

export function adapterFactory(moment): DateAdapter {
  return {
    ...baseAdapterFactory(moment),

    addWeeks(date: Date | string | number, amount: number): Date {
      return moment(date)
        .add(amount, 'weeks')
        .toDate();
    },

    addMonths(date: Date | string | number, amount: number): Date {
      return moment(date)
        .add(amount, 'months')
        .toDate();
    },

    subDays(date: Date | string | number, amount: number): Date {
      return moment(date)
        .subtract(amount, 'days')
        .toDate();
    },

    subWeeks(date: Date | string | number, amount: number): Date {
      return moment(date)
        .subtract(amount, 'weeks')
        .toDate();
    },

    subMonths(date: Date | string | number, amount: number): Date {
      return moment(date)
        .subtract(amount, 'months')
        .toDate();
    },

    getISOWeek(date: Date | string | number): number {
      return moment(date).isoWeek();
    },

    setDate(date: Date | string | number, dayOfMonth: number): Date {
      return moment(date)
        .date(dayOfMonth)
        .toDate();
    },

    setMonth(date: Date | string | number, month: number): Date {
      return moment(date)
        .month(month)
        .toDate();
    },

    setYear(date: Date | string | number, year: number): Date {
      return moment(date)
        .year(year)
        .toDate();
    },

    getDate(date: Date | string | number): number {
      return moment(date).date();
    },

    getMonth(date: Date | string | number): number {
      return moment(date).month();
    },

    getYear(date: Date | string | number): number {
      return moment(date).year();
    }
  };
}
