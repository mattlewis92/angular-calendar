import { Injectable, inject } from '@angular/core';
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
import { DateAdapter } from '../../../date-adapters/date-adapter';
import { getResourceWeekView } from '../calendar-resource/get-resource-week-view';
import {
  ResourceWeekView,
  GetResourceWeekViewArgs,
} from '../calendar-resource/calendar-resource.interface';

@Injectable()
export class CalendarUtils {
  protected dateAdapter = inject(DateAdapter);

  getMonthView(args: GetMonthViewArgs): MonthView {
    return getMonthView(this.dateAdapter, args);
  }

  getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[] {
    return getWeekViewHeader(this.dateAdapter, args);
  }

  getWeekView(args: GetWeekViewArgs): WeekView {
    return getWeekView(this.dateAdapter, args);
  }

  getResourceWeekView(args: GetResourceWeekViewArgs): ResourceWeekView {
    return getResourceWeekView(this.dateAdapter, args);
  }
}
