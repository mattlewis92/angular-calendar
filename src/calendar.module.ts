import './../scss/angular2-calendar.scss';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarDayView} from './components/day/calendarDayView.component';
import {CalendarWeekView} from './components/week/calendarWeekView.component';
import {CalendarMonthView} from './components/month/calendarMonthView.component';
import {CalendarEventActions} from './components/common/calendarEventActions.component';
import {CalendarEventTitle as CalendarEventTitleComponent} from './components/common/calendarEventTitle.component';
import {CalendarMonthCell} from './components/month/calendarMonthCell.component';
import {CalendarOpenDayEvents} from './components/month/calendarOpenDayEvents.component';
import {CalendarWeekViewHeader} from './components/week/calendarWeekViewHeader.component';
import {CalendarWeekViewEvent} from './components/week/calendarWeekViewEvent.component';
import {CalendarAllDayEvent} from './components/day/calendarAllDayEvent.component';
import {CalendarDayViewHourSegment} from './components/day/calendarDayViewHourSegment.component';
import {CalendarDayViewEvent} from './components/day/calendarDayViewEvent.component';
import {CalendarTooltipWindow, CalendarTooltip} from './directives/calendarTooltip.directive';
import {CalendarDate} from './pipes/calendarDate.pipe';
import {CalendarEventTitle as CalendarEventTitlePipe} from './pipes/calendarEventTitle.pipe';

@NgModule({
  declarations: [
    CalendarDayView,
    CalendarWeekView,
    CalendarMonthView,
    CalendarEventActions,
    CalendarEventTitleComponent,
    CalendarMonthCell,
    CalendarOpenDayEvents,
    CalendarWeekViewHeader,
    CalendarWeekViewEvent,
    CalendarAllDayEvent,
    CalendarDayViewHourSegment,
    CalendarDayViewEvent,
    CalendarTooltipWindow,
    CalendarTooltip,
    CalendarDate,
    CalendarEventTitlePipe
  ],
  imports: [CommonModule],
  exports: [CalendarDayView, CalendarWeekView, CalendarMonthView, CalendarDate],
  entryComponents: [CalendarTooltipWindow]
})
export class CalendarModule {}