import { NgModule } from '@angular/core';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarResourceWeekViewComponent } from './calendar-resource-week-view/calendar-resource-week-view.component';
import { CalendarResourceWeekViewHeaderComponent } from './calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component';
import { CalendarResourceWeekViewEventComponent } from './calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarResourceWeekViewRowSegmentComponent } from './calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';

export {
  CalendarResourceWeekViewComponent,
  CalendarResourceWeekViewBeforeRenderEvent,
  CalendarResourceEventTimesChangedEvent,
} from './calendar-resource-week-view/calendar-resource-week-view.component';
export {
  ResourceWeekView as CalendarResourceWeekView,
  ResourceWeekViewRowColumn as CalendarResourceWeekViewRowColumn,
  ResourceWeekViewRowEvent as CalendarResourceWeekViewRowEvent,
  ResourceWeekViewRowSegment as CalendarResourceWeekViewRowSegment,
  GetResourceWeekViewArgs as CalendarGetResourceWeekViewArgs,
} from '../common/calendar-resource/calendar-resource.interface';
export { getWeekViewPeriod } from '../common/util/util';

export { CalendarResourceWeekViewHeaderComponent } from './calendar-resource-week-view/calendar-resource-week-view-header/calendar-resource-week-view-header.component';
export { CalendarResourceWeekViewEventComponent } from './calendar-resource-week-view/calendar-resource-week-view-event/calendar-resource-week-view-event.component';
export { CalendarResourceWeekViewRowSegmentComponent } from './calendar-resource-week-view/calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';

/**
 * @deprecated import the standalone component `CalendarResourceWeekViewComponent` instead
 */
@NgModule({
  imports: [
    DragAndDropModule,
    CalendarCommonModule,
    CalendarResourceWeekViewComponent,
    CalendarResourceWeekViewHeaderComponent,
    CalendarResourceWeekViewEventComponent,
    CalendarResourceWeekViewRowSegmentComponent,
  ],
  exports: [
    DragAndDropModule,
    CalendarResourceWeekViewComponent,
    CalendarResourceWeekViewHeaderComponent,
    CalendarResourceWeekViewEventComponent,
    CalendarResourceWeekViewRowSegmentComponent,
  ],
})
export class CalendarResourceWeekModule {}
