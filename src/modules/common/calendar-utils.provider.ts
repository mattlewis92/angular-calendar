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
  WeekView
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

  abstract getMonthView(args: GetMonthViewArgs): MonthView;

  abstract getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[];

  abstract getWeekView(args: GetWeekViewArgs): WeekView;

  abstract getDayView(args: GetDayViewArgs): DayView;

  abstract getDayViewHourGrid(args: GetDayViewHourGridArgs): DayViewHour[];
}
