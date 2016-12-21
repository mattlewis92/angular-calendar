import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule, DraggableHelper } from 'angular-draggable-droppable';
import { CalendarDayViewComponent } from './components/day/calendarDayView.component';
import { CalendarWeekViewComponent } from './components/week/calendarWeekView.component';
import { CalendarMonthViewComponent } from './components/month/calendarMonthView.component';
import { CalendarEventActionsComponent } from './components/common/calendarEventActions.component';
import { CalendarEventTitleComponent } from './components/common/calendarEventTitle.component';
import { CalendarMonthCellComponent } from './components/month/calendarMonthCell.component';
import { CalendarOpenDayEventsComponent } from './components/month/calendarOpenDayEvents.component';
import { CalendarWeekViewHeaderComponent } from './components/week/calendarWeekViewHeader.component';
import { CalendarWeekViewEventComponent } from './components/week/calendarWeekViewEvent.component';
import { CalendarAllDayEventComponent } from './components/day/calendarAllDayEvent.component';
import { CalendarDayViewHourSegmentComponent } from './components/day/calendarDayViewHourSegment.component';
import { CalendarDayViewEventComponent } from './components/day/calendarDayViewEvent.component';
import { CalendarTooltipWindowComponent, CalendarTooltipDirective } from './directives/calendarTooltip.directive';
import { CalendarDate } from './pipes/calendarDate.pipe';
import { CalendarEventTitle as CalendarEventTitlePipe } from './pipes/calendarEventTitle.pipe';
import { CalendarEventTitleFormatter } from './providers/calendarEventTitle.provider';
import { CalendarDateFormatter } from './providers/calendarDateFormatter.provider';

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
    CalendarDayViewEventComponent,
    CalendarTooltipWindowComponent,
    CalendarTooltipDirective,
    CalendarDate,
    CalendarEventTitlePipe
  ],
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule
  ],
  exports: [
    CalendarDayViewComponent,
    CalendarWeekViewComponent,
    CalendarMonthViewComponent,
    CalendarDate
  ],
  entryComponents: [CalendarTooltipWindowComponent]
})
export class CalendarModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: CalendarModule,
      providers: [
        CalendarEventTitleFormatter,
        CalendarDateFormatter,
        DraggableHelper
      ]
    };

  }

}