import { Injectable } from '@angular/core';
import {
  GetMonthViewArgs,
  MonthView,
  GetWeekViewHeaderArgs,
  WeekDay,
  GetWeekViewArgs,
  GetDayViewArgs,
  DayView,
  GetDayViewHourGridArgs,
  DayViewHour,
  WeekView,
  getDayView,
  getDayViewHourGrid,
  getMonthView,
  getWeekViewHeader,
  getWeekView
} from 'calendar-utils';
import { DateAdapter } from 'calendar-utils/date-adapters';

export interface AngularCalendarDateAdapter extends DateAdapter {
  addWeeks(date: Date | string | number, amount: number): Date;

  addMonths(date: Date | string | number, amount: number): Date;

  subDays(date: Date | string | number, amount: number): Date;

  subWeeks(date: Date | string | number, amount: number): Date;

  subMonths(date: Date | string | number, amount: number): Date;

  getISOWeek(date: Date | string | number): number;

  setDate(date: Date | string | number, dayOfMonth: number): Date;

  setMonth(date: Date | string | number, month: number): Date;

  setYear(date: Date | string | number, year: number): Date;

  getDate(date: Date | string | number): number;

  getMonth(date: Date | string | number): number;

  getYear(date: Date | string | number): number;
}

@Injectable()
export abstract class CalendarUtils {
  abstract dateAdapter: AngularCalendarDateAdapter;

  getMonthView(args: GetMonthViewArgs): MonthView {
    return getMonthView(this.dateAdapter, args);
  }

  getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[] {
    return getWeekViewHeader(this.dateAdapter, args);
  }

  getWeekView(args: GetWeekViewArgs): WeekView {
    return getWeekView(this.dateAdapter, args);
  }

  getDayView(args: GetDayViewArgs): DayView {
    return getDayView(this.dateAdapter, args);
  }

  getDayViewHourGrid(args: GetDayViewHourGridArgs): DayViewHour[] {
    return getDayViewHourGrid(this.dateAdapter, args);
  }
}
