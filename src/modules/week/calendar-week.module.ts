import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-week-view.component';
import { CalendarWeekViewHeaderComponent } from './calendar-week-view-header.component';
import { CalendarWeekViewEventComponent } from './calendar-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';

export {
  CalendarWeekViewComponent,
  CalendarWeekViewBeforeRenderEvent
} from './calendar-week-view.component';
export {
  WeekViewEvent as CalendarWeekViewEvent,
  WeekViewEventRow as CalendarWeekViewEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs
} from 'calendar-utils';

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
    CalendarWeekViewEventComponent
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent
  ]
})
export class CalendarWeekModule {}
