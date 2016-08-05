import './scss/angular2-calendar.scss';
import {CalendarMonthView} from './src/components/calendarMonthView.component';
import {CalendarWeekView} from './src/components/calendarWeekView.component';
import {CalendarDayView} from './src/components/calendarDayView.component';
import {CalendarDate} from './src/pipes/calendarDate.pipe';
import {CalendarEventTitle} from './src/providers/calendarEventTitle.provider';
import {CalendarDateFormatter} from './src/providers/calendarDateFormatter.provider';
import {CalendarNativeDateFormatter} from './src/providers/calendarNativeDateFormatter.provider';
import {CalendarMomentDateFormatter} from './src/providers/calendarMomentDateFormatter.provider';

export * from './src/components/calendarMonthView.component';
export * from './src/components/calendarWeekView.component';
export * from './src/components/calendarDayView.component';
export * from './src/pipes/calendarDate.pipe';
export * from './src/providers/calendarEventTitle.provider';
export * from './src/providers/calendarMomentDateFormatter.provider';
export * from './src/providers/calendarNativeDateFormatter.provider';
export * from './src/providers/calendarDateFormatter.provider';
export * from './src/interfaces/calendarDateFormatter.interface';
export {CalendarEvent, EventAction as CalendarEventAction} from 'calendar-utils';

// for angular-cli
export default {
  directives: [CalendarMonthView, CalendarWeekView, CalendarDayView],
  pipes: [CalendarDate],
  providers: [CalendarEventTitle, CalendarDateFormatter, CalendarNativeDateFormatter, CalendarMomentDateFormatter]
};
