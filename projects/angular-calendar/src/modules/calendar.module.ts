import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import {
  CalendarA11y,
  CalendarCommonModule,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarProviderConfig,
  CalendarUtils,
} from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';

export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './day/calendar-day.module';

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
 * @deprecated instead use `provideCalendar()` and the standalone components/directives/pipes instead
 *
 * e.g.
 * @Component({
 *   imports: [
 *     CalendarPreviousViewDirective,
 *     CalendarNextViewDirective,
 *     CalendarTodayDirective,
 *     CalendarDatePipe,
 *     CalendarMonthViewComponent,
 *     CalendarWeekViewComponent,
 *     CalendarDayViewComponent,
 *   ],
 *   providers: [
 *     provideCalendar({provide: DateAdapter, useFactory: adapterFactory})
 *   ],
 * })
 * class MyComponent {}
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
  static forRoot(
    dateAdapter: Provider,
    config: CalendarProviderConfig = {},
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
