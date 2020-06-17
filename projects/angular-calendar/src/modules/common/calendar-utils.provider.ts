import { Injectable } from '@angular/core';
import {
  GetMonthViewArgs,
  MonthView,
  GetWeekViewHeaderArgs,
  WeekDay,
  GetWeekViewArgs,
  WeekView,
  getMonthView,
  getWeekViewHeader,
  getWeekView,
} from 'calendar-utils';
import { DateAdapter } from '../../date-adapters/date-adapter';

@Injectable()
export class CalendarUtils {
  constructor(protected dateAdapter: DateAdapter) {}

  getMonthView(args: GetMonthViewArgs, timezone?: string): MonthView {
    return getMonthView(this.dateAdapter.withTimezone(timezone), args);
  }

  getWeekViewHeader(args: GetWeekViewHeaderArgs, timezone?: string): WeekDay[] {
    return getWeekViewHeader(this.dateAdapter.withTimezone(timezone), args);
  }

  getWeekView(args: GetWeekViewArgs, timezone?: string): WeekView {
    return getWeekView(this.dateAdapter.withTimezone(timezone), args);
  }
}
