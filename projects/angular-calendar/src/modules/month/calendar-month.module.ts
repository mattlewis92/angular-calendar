import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-month-view.component';
import { CalendarMonthViewHeaderComponent } from './calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './calendar-month-cell.component';
import { CalendarOpenDayEventsComponent } from './calendar-open-day-events.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarMonthRowComponent } from './calendar-month-row.component';

export {
  CalendarMonthViewComponent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewEventTimesChangedEvent,
} from './calendar-month-view.component';
export { MonthViewDay as CalendarMonthViewDay } from 'calendar-utils';
export { collapseAnimation } from './calendar-open-day-events.component';
export { CalendarMonthCellComponent } from './calendar-month-cell.component';
export { CalendarOpenDayEventsComponent } from './calendar-open-day-events.component';
export { CalendarMonthViewHeaderComponent } from './calendar-month-view-header.component';
export { CalendarMonthRowComponent } from './calendar-month-row.component';

@NgModule({
  imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
  declarations: [
    CalendarMonthViewComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthRowComponent,
  ],
  exports: [
    DragAndDropModule,
    CalendarMonthViewComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthRowComponent,
  ],
})
export class CalendarMonthModule {}
