import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from './calendar-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';

export {
  CalendarDayViewComponent,
  CalendarDayViewBeforeRenderEvent,
} from './calendar-day-view.component';

@NgModule({
  imports: [CommonModule, CalendarCommonModule, CalendarWeekModule],
  declarations: [CalendarDayViewComponent],
  exports: [CalendarDayViewComponent],
})
export class CalendarDayModule {}
