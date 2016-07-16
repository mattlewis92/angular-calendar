import './scss/main.scss';
import {CalendarMonthView} from './src/calendarMonthView.component';
import {CalendarWeekView} from './src/calendarWeekView.component';
import {CalendarTitle} from './src/calendarTitle.pipe';

export * from './src/calendarMonthView.component';
export * from './src/calendarWeekView.component';
export * from './src/calendarTitle.pipe';
export {CalendarEvent} from 'calendar-utils';

// for angular-cli
export default {
  directives: [CalendarMonthView, CalendarWeekView],
  pipes: [CalendarTitle]
};
