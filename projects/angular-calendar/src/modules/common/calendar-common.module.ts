import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { CalendarEventActionsComponent } from './calendar-event-actions.component';
import { CalendarEventTitleComponent } from './calendar-event-title.component';
import {
  CalendarTooltipDirective,
  CalendarTooltipWindowComponent,
} from './calendar-tooltip.directive';
import { CalendarPreviousViewDirective } from './calendar-previous-view.directive';
import { CalendarNextViewDirective } from './calendar-next-view.directive';
import { CalendarTodayDirective } from './calendar-today.directive';
import { CalendarDatePipe } from './calendar-date.pipe';
import { CalendarEventTitlePipe } from './calendar-event-title.pipe';
import { ClickDirective } from './click.directive';
import { KeydownEnterDirective } from './keydown-enter.directive';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
import { CalendarUtils } from './calendar-utils.provider';
import { CalendarA11y } from './calendar-a11y.provider';
import { CalendarA11yPipe } from './calendar-a11y.pipe';

export interface CalendarModuleConfig {
  eventTitleFormatter?: Provider;
  dateFormatter?: Provider;
  utils?: Provider;
  a11y?: Provider;
}

export * from './calendar-event-title-formatter.provider';
export * from './calendar-moment-date-formatter.provider';
export * from './calendar-native-date-formatter.provider';
export * from './calendar-angular-date-formatter.provider';
export * from './calendar-date-formatter.provider';
export * from './calendar-utils.provider';
export * from './calendar-a11y.provider';
export * from './calendar-a11y.interface';
export * from './calendar-date-formatter.interface';
export * from './calendar-event-times-changed-event.interface';
export * from '../../date-adapters/date-adapter';
export * from './calendar-view.enum';

// needed for ivy, not part of the public api
export { CalendarEventActionsComponent as ɵCalendarEventActionsComponent } from './calendar-event-actions.component';
export { CalendarEventTitleComponent as ɵCalendarEventTitleComponent } from './calendar-event-title.component';
export {
  CalendarTooltipDirective as ɵCalendarTooltipDirective,
  CalendarTooltipWindowComponent as ɵCalendarTooltipWindowComponent,
} from './calendar-tooltip.directive';
export { CalendarPreviousViewDirective as ɵCalendarPreviousViewDirective } from './calendar-previous-view.directive';
export { CalendarNextViewDirective as ɵCalendarNextViewDirective } from './calendar-next-view.directive';
export { CalendarTodayDirective as ɵCalendarTodayDirective } from './calendar-today.directive';
export { CalendarDatePipe as ɵCalendarDatePipe } from './calendar-date.pipe';
export { CalendarEventTitlePipe as ɵCalendarEventTitlePipe } from './calendar-event-title.pipe';
export { ClickDirective as ɵClickDirective } from './click.directive';
export { KeydownEnterDirective as ɵKeydownEnterDirective } from './keydown-enter.directive';
export { CalendarA11yPipe as ɵCalendarA11yPipe } from './calendar-a11y.pipe';

export {
  CalendarEvent,
  EventAction as CalendarEventAction,
  DAYS_OF_WEEK,
  ViewPeriod as CalendarViewPeriod,
} from 'calendar-utils';

/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
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
    CalendarA11yPipe,
    ClickDirective,
    KeydownEnterDirective,
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
    CalendarA11yPipe,
    ClickDirective,
    KeydownEnterDirective,
  ],
  providers: [I18nPluralPipe],
})
export class CalendarCommonModule {
  static forRoot(
    dateAdapter: Provider,
    config: CalendarModuleConfig = {}
  ): ModuleWithProviders<CalendarCommonModule> {
    return {
      ngModule: CalendarCommonModule,
      providers: [
        dateAdapter,
        config.eventTitleFormatter || CalendarEventTitleFormatter,
        config.dateFormatter || CalendarDateFormatter,
        config.utils || CalendarUtils,
        config.a11y || CalendarA11y,
      ],
    };
  }
}
