import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekListViewComponent } from './calendar-week-list-view.component';
import { CalendarWeekListViewHeaderComponent } from './calendar-week-list-view-header.component';
import { CalendarWeekListViewEventComponent } from './calendar-week-list-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekListViewDayComponent } from './calendar-week-list-view-day.component';

export {
  CalendarWeekListViewComponent,
  CalendarWeekViewBeforeRenderEvent as CalendarWeekListViewBeforeRenderEvent,
} from './calendar-week-list-view.component';
export { CalendarWeekListViewHeaderComponent } from './calendar-week-list-view-header.component';
export { CalendarWeekListViewEventComponent } from './calendar-week-list-view-event.component';
export { CalendarWeekListViewDayComponent } from './calendar-week-list-view-day.component';
export { getWeekViewPeriod } from '../common/util';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule,
  ],
  declarations: [
    CalendarWeekListViewComponent,
    CalendarWeekListViewHeaderComponent,
    CalendarWeekListViewEventComponent,
    CalendarWeekListViewDayComponent,
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarWeekListViewComponent,
    CalendarWeekListViewHeaderComponent,
    CalendarWeekListViewEventComponent,
    CalendarWeekListViewDayComponent,
  ],
})
export class CalendarWeekListModule {}
