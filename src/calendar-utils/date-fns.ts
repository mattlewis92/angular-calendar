import { Injectable } from '@angular/core';
import {
  getMonthView,
  GetMonthViewArgs,
  MonthView,
  getWeekViewHeader,
  GetWeekViewHeaderArgs,
  WeekDay,
  getWeekView,
  GetWeekViewArgs,
  getDayView,
  GetDayViewArgs,
  DayView,
  getDayViewHourGrid,
  GetDayViewHourGridArgs,
  DayViewHour,
  WeekView
} from 'calendar-utils';
import { CalendarUtils } from 'angular-calendar';
import { adapterFactory } from 'calendar-utils/date-adapters/date-fns';
import addWeeks from 'date-fns/add_weeks/index';
import addMonths from 'date-fns/add_months/index';
import subDays from 'date-fns/sub_days/index';
import subWeeks from 'date-fns/sub_weeks/index';
import subMonths from 'date-fns/sub_months/index';
import getISOWeek from 'date-fns/get_iso_week/index';
import setDate from 'date-fns/set_date/index';
import setMonth from 'date-fns/set_month/index';
import setYear from 'date-fns/set_year/index';
import getDate from 'date-fns/get_date/index';
import getMonth from 'date-fns/get_month/index';
import getYear from 'date-fns/get_year/index';

@Injectable()
export class CalendarUtilsDateFns extends CalendarUtils {
  dateAdapter = {
    ...adapterFactory(),
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
    getMonth,
    getYear
  };

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
