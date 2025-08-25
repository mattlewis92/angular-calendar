import { NgModule } from '@angular/core';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-month-view/calendar-month-view.component';
import { CalendarMonthViewHeaderComponent } from './calendar-month-view/calendar-month-view-header/calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './calendar-month-view/calendar-month-cell/calendar-month-cell.component';
import { CalendarOpenDayEventsComponent } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';
import { CalendarCommonModule } from '../common/calendar-common.module';

export {
  CalendarMonthViewComponent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewEventTimesChangedEvent,
} from './calendar-month-view/calendar-month-view.component';
export { MonthViewDay as CalendarMonthViewDay } from 'calendar-utils';
export { collapseAnimation } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';

export { CalendarMonthCellComponent } from './calendar-month-view/calendar-month-cell/calendar-month-cell.component';
export { CalendarMonthViewHeaderComponent } from './calendar-month-view/calendar-month-view-header/calendar-month-view-header.component';
export { CalendarOpenDayEventsComponent } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';

/**
 * @deprecated import the standalone component `CalendarMonthViewComponent` instead
 */
@NgModule({
  imports: [
    DragAndDropModule,
    CalendarCommonModule,
    CalendarMonthViewComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarMonthViewHeaderComponent,
  ],
  exports: [
    DragAndDropModule,
    CalendarMonthViewComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarMonthViewHeaderComponent,
  ],
})
export class CalendarMonthModule {}
