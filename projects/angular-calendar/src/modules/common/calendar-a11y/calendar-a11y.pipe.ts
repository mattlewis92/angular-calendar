import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { CalendarA11y } from './calendar-a11y.provider';
import { A11yParams } from './calendar-a11y.interface';

/**
 * This pipe is primarily for rendering aria labels. Example usage:
 * ```typescript
 * // where `myEvent` is a `CalendarEvent` and myLocale is a locale identifier
 * {{ { event: myEvent, locale: myLocale } | calendarA11y: 'eventDescription' }}
 * ```
 */
@Pipe({
  name: 'calendarA11y',
})
export class CalendarA11yPipe implements PipeTransform {
  constructor(
    private calendarA11y: CalendarA11y,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  transform(a11yParams: A11yParams, method: string): string {
    a11yParams.locale = a11yParams.locale || this.locale;
    if (typeof this.calendarA11y[method] === 'undefined') {
      const allowedMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(CalendarA11y.prototype)
      ).filter((iMethod) => iMethod !== 'constructor');
      throw new Error(
        `${method} is not a valid a11y method. Can only be one of ${allowedMethods.join(
          ', '
        )}`
      );
    }
    return this.calendarA11y[method](a11yParams);
  }
}
