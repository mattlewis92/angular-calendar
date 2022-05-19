import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/date-fns';
import {
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
  getISOWeek,
  setDate,
  setMonth,
  setYear,
  getDate,
  getYear,
} from 'date-fns';
import { DateAdapter } from '../date-adapter';

export function adapterFactory(): DateAdapter {
  return {
    ...baseAdapterFactory(),
    addWeeks,
    addMonths,
    subDays,
    subWeeks,
    subMonths,
    getISOWeek,
    setDate,
    setMonth,
    setYear,
    getDate,
    getYear,
    reverseTz(date: Date | number): Date {
      return new Date(date);
    },
    withTimezone(timezone: string): DateAdapter {
      return this;
    },
  };
}
