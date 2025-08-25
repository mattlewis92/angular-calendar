import { NgModule } from '@angular/core';
import { CalendarDayViewComponent } from './calendar-day-view/calendar-day-view.component';

export {
  CalendarDayViewComponent,
  CalendarDayViewBeforeRenderEvent,
} from './calendar-day-view/calendar-day-view.component';

/**
 * @deprecated import the standalone component `CalendarDayViewComponent` instead
 */
@NgModule({
  imports: [CalendarDayViewComponent],
  exports: [CalendarDayViewComponent],
})
export class CalendarDayModule {}
