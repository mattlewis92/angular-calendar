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
import { DateAdapter } from '../../date-adapters/date-adapter';

@Injectable()
export class CalendarUtils {
  constructor(private dateAdapter: DateAdapter) {}

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
