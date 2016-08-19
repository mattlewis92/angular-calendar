import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarDayView} from './components/calendarDayView.component';
import {CalendarWeekView} from './components/calendarWeekView.component';
import {CalendarMonthView} from './components/calendarMonthView.component';
import {CalendarEventActions} from './components/calendarEventActions.component';
import {CalendarEventTitle as CalendarEventTitleComponent} from './components/calendarEventTitle.component';
import {CalendarMonthCell} from './components/calendarMonthCell.component';
import {CalendarSlideBox} from './components/calendarSlideBox.component';
import {CalendarWeekViewHeader} from './components/calendarWeekViewHeader.component';
import {CalendarWeekViewEvent} from './components/calendarWeekViewEvent.component';
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
    CalendarSlideBox,
    CalendarWeekViewHeader,
    CalendarWeekViewEvent,
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