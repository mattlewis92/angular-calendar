import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-week-view.component';
import { CalendarWeekViewHeaderComponent } from './calendar-week-view-header.component';
import { CalendarWeekViewEventComponent } from './calendar-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekViewHourSegmentComponent } from './calendar-week-view-hour-segment.component';

export {
  CalendarWeekViewComponent,
  CalendarWeekViewBeforeRenderEvent
} from './calendar-week-view.component';
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
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarWeekViewHourSegmentComponent
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarWeekViewHourSegmentComponent
  ]
})
export class CalendarWeekModule {}
