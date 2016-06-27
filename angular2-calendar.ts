import {CalendarMonthView} from './src/calendarMonthView.component';
import {CalendarWeekView} from './src/calendarWeekView.component';

export * from './src/calendarMonthView.component';
export * from './src/calendarWeekView.component';
export {CalendarEvent} from './src/interfaces';

// for angular-cli
export default {
  directives: [CalendarMonthView, CalendarWeekView]
};
