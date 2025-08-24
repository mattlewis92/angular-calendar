import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-week-view/calendar-week-view.component';
import { CalendarWeekViewHeaderComponent } from './calendar-week-view/calendar-week-view-header/calendar-week-view-header.component';
import { CalendarWeekViewEventComponent } from './calendar-week-view/calendar-week-view-event/calendar-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekViewHourSegmentComponent } from './calendar-week-view/calendar-week-view-hour-segment/calendar-week-view-hour-segment.component';
import { CalendarWeekViewCurrentTimeMarkerComponent } from './calendar-week-view/calendar-week-view-current-time-marker/calendar-week-view-current-time-marker.component';

export {
  CalendarWeekViewComponent,
  CalendarWeekViewBeforeRenderEvent,
} from './calendar-week-view/calendar-week-view.component';
export {
  WeekViewAllDayEvent as CalendarWeekViewAllDayEvent,
  WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs,
} from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';

// needed for ivy, not part of the public api
export { CalendarWeekViewHeaderComponent as ɵCalendarWeekViewHeaderComponent } from './calendar-week-view/calendar-week-view-header/calendar-week-view-header.component';
export { CalendarWeekViewEventComponent as ɵCalendarWeekViewEventComponent } from './calendar-week-view/calendar-week-view-event/calendar-week-view-event.component';
export { CalendarWeekViewHourSegmentComponent as ɵCalendarWeekViewHourSegmentComponent } from './calendar-week-view/calendar-week-view-hour-segment/calendar-week-view-hour-segment.component';
export { CalendarWeekViewCurrentTimeMarkerComponent as ɵCalendarWeekViewCurrentTimeMarkerComponent } from './calendar-week-view/calendar-week-view-current-time-marker/calendar-week-view-current-time-marker.component';

/**
 * @deprecated Use standalone components instead. Import `CalendarWeekViewComponent` directly.
 * See https://angular.dev/guide/standalone-components for more information.
 */
@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule,
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarWeekViewHourSegmentComponent,
    CalendarWeekViewCurrentTimeMarkerComponent,
  ],
  exports: [
    ResizableModule,
    DragAndDropModule,
    CalendarWeekViewComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarWeekViewHourSegmentComponent,
    CalendarWeekViewCurrentTimeMarkerComponent,
  ],
})
export class CalendarWeekModule {}
