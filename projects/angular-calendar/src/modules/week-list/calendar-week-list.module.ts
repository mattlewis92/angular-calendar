import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekListViewComponent } from './calendar-week-list-view.component';
import { CalendarWeekListViewHeaderComponent } from './calendar-week-list-view-header.component';
import { CalendarWeekListViewEventComponent } from './calendar-week-list-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekListDayViewEventComponent } from './calendar-week-list-day-view.component';

export {
  CalendarWeekListViewComponent,
  CalendarWeekViewBeforeRenderEvent
} from './calendar-week-list-view.component';
export {
  WeekViewAllDayEvent as CalendarWeekViewAllDayEvent,
  WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs
} from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule
  ],
  declarations: [
    CalendarWeekListViewComponent,
    CalendarWeekListViewHeaderComponent,
    CalendarWeekListViewEventComponent,
    CalendarWeekListDayViewEventComponent
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarWeekListViewComponent,
    CalendarWeekListViewHeaderComponent,
    CalendarWeekListViewEventComponent,
    CalendarWeekListDayViewEventComponent
  ]
})
export class CalendarWeekListModule {}
