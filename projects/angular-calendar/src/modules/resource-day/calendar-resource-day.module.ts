import { NgModule } from '@angular/core';
import { CalendarResourceDayViewComponent } from './calendar-resource-day-view/calendar-resource-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarResourceWeekModule } from '../resource-week/calendar-resource-week.module';

export {
  CalendarResourceDayViewComponent,
  CalendarResourceDayViewBeforeRenderEvent,
} from './calendar-resource-day-view/calendar-resource-day-view.component';

/**
 * @deprecated import the standalone component `CalendarResourceDayViewComponent` instead
 */
@NgModule({
  imports: [
    CalendarCommonModule,
    CalendarResourceWeekModule,
    CalendarResourceDayViewComponent,
  ],
  exports: [CalendarResourceDayViewComponent],
})
export class CalendarResourceDayModule {}
