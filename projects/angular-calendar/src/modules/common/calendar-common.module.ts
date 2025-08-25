import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CalendarEventActionsComponent } from './calendar-event-actions/calendar-event-actions.component';
import { CalendarEventTitleComponent } from './calendar-event-title/calendar-event-title.component';
import {
  CalendarTooltipDirective,
  CalendarTooltipWindowComponent,
} from './calendar-tooltip/calendar-tooltip.directive';
import { CalendarPreviousViewDirective } from './calendar-previous-view/calendar-previous-view.directive';
import { CalendarNextViewDirective } from './calendar-next-view/calendar-next-view.directive';
import { CalendarTodayDirective } from './calendar-today/calendar-today.directive';
import { CalendarDatePipe } from './calendar-date/calendar-date.pipe';
import { CalendarEventTitlePipe } from './calendar-event-title/calendar-event-title.pipe';
import { ClickDirective } from './click/click.directive';
import { KeydownEnterDirective } from './keydown-enter/keydown-enter.directive';
import { CalendarA11yPipe } from './calendar-a11y/calendar-a11y.pipe';
import { CalendarProviderConfig } from './provide-calendar/provide-calendar.function';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter/calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from './calendar-date-formatter/calendar-date-formatter.provider';
import { CalendarUtils } from './calendar-utils/calendar-utils.provider';
import { CalendarA11y } from './calendar-a11y/calendar-a11y.provider';

export * from './calendar-event-title-formatter/calendar-event-title-formatter.provider';
export * from './calendar-moment-date-formatter/calendar-moment-date-formatter.provider';
export * from './calendar-native-date-formatter/calendar-native-date-formatter.provider';
export * from './calendar-angular-date-formatter/calendar-angular-date-formatter.provider';
export * from './calendar-date-formatter/calendar-date-formatter.provider';
export * from './calendar-utils/calendar-utils.provider';
export * from './calendar-a11y/calendar-a11y.provider';
export * from './calendar-a11y/calendar-a11y.interface';
export * from './calendar-date-formatter/calendar-date-formatter.interface';
export * from './calendar-event-times-changed-event/calendar-event-times-changed-event.interface';
export * from '../../date-adapters/date-adapter';
export * from './calendar-view/calendar-view.enum';

export { CalendarEventActionsComponent } from './calendar-event-actions/calendar-event-actions.component';
export { CalendarEventTitleComponent } from './calendar-event-title/calendar-event-title.component';
export {
  CalendarTooltipDirective,
  CalendarTooltipWindowComponent,
} from './calendar-tooltip/calendar-tooltip.directive';
export { CalendarPreviousViewDirective } from './calendar-previous-view/calendar-previous-view.directive';
export { CalendarNextViewDirective } from './calendar-next-view/calendar-next-view.directive';
export { CalendarTodayDirective } from './calendar-today/calendar-today.directive';
export { CalendarDatePipe } from './calendar-date/calendar-date.pipe';
export { CalendarEventTitlePipe } from './calendar-event-title/calendar-event-title.pipe';
export { ClickDirective } from './click/click.directive';
export { KeydownEnterDirective } from './keydown-enter/keydown-enter.directive';
export { CalendarA11yPipe } from './calendar-a11y/calendar-a11y.pipe';

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
 * @deprecated use `provideCalendar(adapterFactory())` and import the standalone `CalendarPreviousViewDirective` / `CalendarNextViewDirective` / `CalendarTodayDirective` / `CalendarDatePipe` directives + pipes instead
 *
 */
@NgModule({
  imports: [
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
})
export class CalendarCommonModule {
  static forRoot(
    dateAdapter: Provider,
    config: CalendarProviderConfig = {},
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
