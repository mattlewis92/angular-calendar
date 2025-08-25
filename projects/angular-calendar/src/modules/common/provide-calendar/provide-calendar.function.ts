import { Provider } from '@angular/core';
import { CalendarEventTitleFormatter } from '../calendar-event-title-formatter/calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from '../calendar-date-formatter/calendar-date-formatter.provider';
import { CalendarUtils } from '../calendar-utils/calendar-utils.provider';
import { CalendarA11y } from '../calendar-a11y/calendar-a11y.provider';
import { DateAdapter } from '../../../date-adapters/date-adapter';

export interface CalendarProviderConfig {
  eventTitleFormatter?: Provider;
  dateFormatter?: Provider;
  utils?: Provider;
  a11y?: Provider;
}

export function provideCalendar(
  dateAdapter: DateAdapter,
  config: CalendarProviderConfig = {},
): Provider[] {
  return [
    { provide: DateAdapter, useValue: dateAdapter },
    config.eventTitleFormatter || CalendarEventTitleFormatter,
    config.dateFormatter || CalendarDateFormatter,
    config.utils || CalendarUtils,
    config.a11y || CalendarA11y,
  ];
}
