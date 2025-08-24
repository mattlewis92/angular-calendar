import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from './calendar-day-view/calendar-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';

export {
  CalendarDayViewComponent,
  CalendarDayViewBeforeRenderEvent,
} from './calendar-day-view/calendar-day-view.component';

/**
 * @deprecated Use standalone components instead. Import `CalendarDayViewComponent` directly.
 * See https://angular.dev/guide/standalone-components for more information.
 */
@NgModule({
  imports: [
    CommonModule,
    CalendarCommonModule,
    CalendarWeekModule,
    CalendarDayViewComponent,
  ],
  exports: [CalendarDayViewComponent],
})
export class CalendarDayModule {}
