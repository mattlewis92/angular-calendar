import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import {
  DragAndDropModule,
  DraggableHelper
} from 'angular-draggable-droppable';
import { CalendarDayViewComponent } from './components/day/calendar-day-view.component';
import { CalendarWeekViewComponent } from './components/week/calendar-week-view.component';
import { CalendarMonthViewComponent } from './components/month/calendar-month-view.component';
import { CalendarMonthViewHeaderComponent } from './components/month/calendar-month-view-header.component';
import { CalendarEventActionsComponent } from './components/common/calendar-event-actions.component';
import { CalendarEventTitleComponent } from './components/common/calendar-event-title.component';
import { CalendarMonthCellComponent } from './components/month/calendar-month-cell.component';
import { CalendarOpenDayEventsComponent } from './components/month/calendar-open-day-events.component';
import { CalendarWeekViewHeaderComponent } from './components/week/calendar-week-view-header.component';
import { CalendarWeekViewEventComponent } from './components/week/calendar-week-view-event.component';
import { CalendarAllDayEventComponent } from './components/day/calendar-all-day-event.component';
import { CalendarDayViewHourSegmentComponent } from './components/day/calendar-day-view-hour-segment.component';
import { CalendarDayViewEventComponent } from './components/day/calendar-day-view-event.component';
import {
  CalendarTooltipWindowComponent,
  CalendarTooltipDirective
} from './directives/calendar-tooltip.directive';
import { CalendarPreviousViewDirective } from './directives/calendar-previous-view.directive';
import { CalendarNextViewDirective } from './directives/calendar-next-view.directive';
import { CalendarTodayDirective } from './directives/calendar-today.directive';
import { ClickDirective } from './directives/click.directive';
import { CalendarDatePipe } from './pipes/calendar-date.pipe';
import { CalendarEventTitlePipe } from './pipes/calendar-event-title.pipe';
import { CalendarEventTitleFormatter } from './providers/calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from './providers/calendar-date-formatter.provider';
import { CalendarUtils } from './providers/calendar-utils.provider';

export interface CalendarModuleConfig {
  eventTitleFormatter?: Provider;
  dateFormatter?: Provider;
  utils?: Provider;
}

/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * &commat;NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
@NgModule({
  declarations: [
    CalendarDayViewComponent,
    CalendarWeekViewComponent,
    CalendarMonthViewComponent,
    CalendarEventActionsComponent,
    CalendarEventTitleComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarAllDayEventComponent,
    CalendarDayViewHourSegmentComponent,
    CalendarTooltipWindowComponent,
    CalendarTooltipDirective,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarDatePipe,
    CalendarEventTitlePipe,
    CalendarMonthViewHeaderComponent,
    CalendarDayViewEventComponent,
    ClickDirective
  ],
  imports: [CommonModule, ResizableModule, DragAndDropModule],
  exports: [
    CalendarDayViewComponent,
    CalendarWeekViewComponent,
    CalendarMonthViewComponent,
    CalendarEventActionsComponent,
    CalendarEventTitleComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarWeekViewHeaderComponent,
    CalendarWeekViewEventComponent,
    CalendarAllDayEventComponent,
    CalendarDayViewHourSegmentComponent,
    CalendarTooltipWindowComponent,
    CalendarTooltipDirective,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarDatePipe,
    CalendarEventTitlePipe,
    CalendarMonthViewHeaderComponent,
    CalendarDayViewEventComponent,
    ClickDirective
  ],
  entryComponents: [CalendarTooltipWindowComponent]
})
export class CalendarModule {
  static forRoot(config: CalendarModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: CalendarModule,
      providers: [
        DraggableHelper,
        config.eventTitleFormatter || CalendarEventTitleFormatter,
        config.dateFormatter || CalendarDateFormatter,
        config.utils || CalendarUtils
      ]
    };
  }
}
