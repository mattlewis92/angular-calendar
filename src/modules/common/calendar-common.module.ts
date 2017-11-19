import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableHelper } from 'angular-draggable-droppable';
import { CalendarEventActionsComponent } from './calendar-event-actions.component';
import { CalendarEventTitleComponent } from './calendar-event-title.component';
import {
  CalendarTooltipDirective,
  CalendarTooltipWindowComponent
} from './calendar-tooltip.directive';
import { CalendarPreviousViewDirective } from './calendar-previous-view.directive';
import { CalendarNextViewDirective } from './calendar-next-view.directive';
import { CalendarTodayDirective } from './calendar-today.directive';
import { CalendarDatePipe } from './calendar-date.pipe';
import { CalendarEventTitlePipe } from './calendar-event-title.pipe';
import { ClickDirective } from './click.directive';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
import { CalendarUtils } from './calendar-utils.provider';

export interface CalendarModuleConfig {
  eventTitleFormatter?: Provider;
  dateFormatter?: Provider;
  utils?: Provider;
}

export * from './calendar-event-title-formatter.provider';
export * from './calendar-moment-date-formatter.provider';
export * from './calendar-native-date-formatter.provider';
export * from './calendar-angular-date-formatter.provider';
export * from './calendar-date-formatter.provider';
export * from './calendar-utils.provider';
export * from './calendar-date-formatter.interface';
export * from './calendar-event-times-changed-event.interface';

export {
  CalendarEvent,
  EventAction as CalendarEventAction,
  DAYS_OF_WEEK
} from 'calendar-utils';

/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule } from 'angular-calendar/modules/common';
 * import { CalendarMonthModule } from 'angular-calendar/modules/month';
 *
 * @NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
@NgModule({
  declarations: [
    CalendarEventActionsComponent,
    CalendarEventTitleComponent,
    CalendarTooltipWindowComponent,
    CalendarTooltipDirective,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarDatePipe,
    CalendarEventTitlePipe,
    ClickDirective
  ],
  imports: [CommonModule],
  exports: [
    CalendarEventActionsComponent,
    CalendarEventTitleComponent,
    CalendarTooltipWindowComponent,
    CalendarTooltipDirective,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarDatePipe,
    CalendarEventTitlePipe,
    ClickDirective
  ],
  entryComponents: [CalendarTooltipWindowComponent]
})
export class CalendarCommonModule {
  static forRoot(config: CalendarModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: CalendarCommonModule,
      providers: [
        DraggableHelper,
        config.eventTitleFormatter || CalendarEventTitleFormatter,
        config.dateFormatter || CalendarDateFormatter,
        config.utils || CalendarUtils
      ]
    };
  }
}
