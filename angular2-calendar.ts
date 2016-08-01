import './scss/angular2-calendar.scss';
import {CalendarMonthView} from './src/calendarMonthView.component';
import {CalendarWeekView} from './src/calendarWeekView.component';
import {CalendarDayView} from './src/calendarDayView.component';
import {CalendarTitle} from './src/calendarTitle.pipe';
import {CalendarDate} from './src/calendarDate.pipe';
import {CalendarConfig} from './src/calendarConfig.provider';

export * from './src/calendarMonthView.component';
export * from './src/calendarWeekView.component';
export * from './src/calendarDayView.component';
export * from './src/calendarTitle.pipe';
export * from './src/calendarDate.pipe';
export * from './src/calendarConfig.provider';
export * from './src/calendarDateFormatter.interface';
export * from './src/calendarMomentDateFormatter.provider';
export * from './src/calendarNativeDateFormatter.provider';
export * from './src/calendarDateFormatter.provider';
export {CalendarEvent, EventAction as CalendarEventAction} from 'calendar-utils';

// for angular-cli
export default {
  directives: [CalendarMonthView, CalendarWeekView, CalendarDayView],
  pipes: [CalendarTitle, CalendarDate],
  providers: [CalendarConfig]
};
