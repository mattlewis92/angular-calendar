import {
  NgModule,
  ModuleWithProviders,
  Provider,
  EnvironmentProviders,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  CalendarCommonModule,
  CalendarModuleConfig,
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  CalendarA11y,
} from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarUtils } from './common/calendar-utils/calendar-utils.provider';

export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './day/calendar-day.module';

/**
 * Provides calendar configuration for standalone components.
 *
 * Example usage:
 *
 * ```typescript
 * import { provideCalendar } from 'angular-calendar';
 * import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
 * import { DateAdapter } from 'angular-calendar/date-adapters/date-adapter';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideCalendar({
 *       provide: DateAdapter,
 *       useFactory: adapterFactory
 *     })
 *   ]
 * });
 * ```
 *
 * @param dateAdapter The date adapter provider
 * @param config Optional configuration for the calendar
 * @returns Environment providers for the calendar
 */
export function provideCalendar(
  dateAdapter: Provider,
  config: CalendarModuleConfig = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    dateAdapter,
    config.eventTitleFormatter || CalendarEventTitleFormatter,
    config.dateFormatter || CalendarDateFormatter,
    config.utils || CalendarUtils,
    config.a11y || CalendarA11y,
  ]);
}

/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 * @deprecated Use the standalone `provideCalendar` function instead.
 * See https://angular.dev/guide/standalone-components for more information.
 *
 */
@NgModule({
  imports: [
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
  ],
  exports: [
    CalendarCommonModule,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
  ],
})
export class CalendarModule {
  /**
   * @deprecated Use the standalone `provideCalendar` function instead.
   */
  static forRoot(
    dateAdapter: Provider,
    config: CalendarModuleConfig = {},
  ): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
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
