import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarDayView} from './components/calendarDayView.component';
import {CalendarWeekView} from './components/calendarWeekView.component';
import {CalendarMonthView} from './components/calendarMonthView.component';
import {CalendarEventActions} from './components/calendarEventActions.component';
import {CalendarTooltipWindow, CalendarTooltip} from './directives/calendarTooltip.directive';
import {CalendarDate} from './pipes/calendarDate.pipe';
import {CalendarEventTitle} from './pipes/calendarEventTitle.pipe';

@NgModule({
  declarations: [
    CalendarDayView,
    CalendarWeekView,
    CalendarMonthView,
    CalendarEventActions,
    CalendarTooltipWindow,
    CalendarTooltip,
    CalendarDate,
    CalendarEventTitle
  ],
  imports: [CommonModule],
  exports: [CalendarDayView, CalendarWeekView, CalendarMonthView, CalendarDate],
  entryComponents: [CalendarTooltipWindow]
})
export class CalendarModule {}