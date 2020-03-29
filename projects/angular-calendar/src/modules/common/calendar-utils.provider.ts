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

  getMonthView(args: GetMonthViewArgs): MonthView {
    return getMonthView(this.dateAdapter, args);
  }

  getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[] {
    return getWeekViewHeader(this.dateAdapter, args);
  }

  getWeekView(args: GetWeekViewArgs): WeekView {
    return getWeekView(this.dateAdapter, args);
  }
}
