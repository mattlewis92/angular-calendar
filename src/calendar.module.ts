import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import {
  DragAndDropModule,
  DraggableHelper
} from 'angular-draggable-droppable';
import { CalendarDayViewComponent } from './components/day/calendarDayView.component';
import { CalendarWeekViewComponent } from './components/week/calendarWeekView.component';
import { CalendarMonthViewComponent } from './components/month/calendarMonthView.component';
import { CalendarMonthViewHeaderComponent } from './components/month/calendarMonthViewHeader.component';
import { CalendarEventActionsComponent } from './components/common/calendarEventActions.component';
import { CalendarEventTitleComponent } from './components/common/calendarEventTitle.component';
import { CalendarMonthCellComponent } from './components/month/calendarMonthCell.component';
import { CalendarOpenDayEventsComponent } from './components/month/calendarOpenDayEvents.component';
import { CalendarWeekViewHeaderComponent } from './components/week/calendarWeekViewHeader.component';
import { CalendarWeekViewEventComponent } from './components/week/calendarWeekViewEvent.component';
import { CalendarAllDayEventComponent } from './components/day/calendarAllDayEvent.component';
import { CalendarDayViewHourSegmentComponent } from './components/day/calendarDayViewHourSegment.component';
import { CalendarDayViewEventComponent } from './components/day/calendarDayViewEvent.component';
import {
  CalendarTooltipWindowComponent,
  CalendarTooltipDirective
} from './directives/calendarTooltip.directive';
import { CalendarPreviousViewDirective } from './directives/calendarPreviousView.directive';
import { CalendarNextViewDirective } from './directives/calendarNextView.directive';
import { CalendarTodayDirective } from './directives/calendarToday.directive';
import { ClickDirective } from './directives/click.directive';
import { CalendarDatePipe } from './pipes/calendarDate.pipe';
import { CalendarEventTitlePipe } from './pipes/calendarEventTitle.pipe';
import { CalendarEventTitleFormatter } from './providers/calendarEventTitleFormatter.provider';
import { CalendarDateFormatter } from './providers/calendarDateFormatter.provider';
import { CalendarUtils } from './providers/calendarUtils.provider';

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
