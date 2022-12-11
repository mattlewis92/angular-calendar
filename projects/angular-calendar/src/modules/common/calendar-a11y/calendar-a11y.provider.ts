import { Injectable } from '@angular/core';
import { formatDate, I18nPluralPipe } from '@angular/common';
import { A11yParams } from './calendar-a11y.interface';

/**
 * This class is responsible for adding accessibility to the calendar.
 * You may override any of its methods via angulars DI to suit your requirements.
 * For example:
 *
 * ```typescript
 * import { A11yParams, CalendarA11y } from 'angular-calendar';
 * import { formatDate, I18nPluralPipe } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * // adding your own a11y params
 * export interface CustomA11yParams extends A11yParams {
 *   isDrSuess?: boolean;
 * }
 *
 * @Injectable()
 * export class CustomCalendarA11y extends CalendarA11y {
 *   constructor(protected i18nPlural: I18nPluralPipe) {
 *     super(i18nPlural);
 *   }
 *
 *   // overriding a function
 *   public openDayEventsLandmark({ date, locale, isDrSuess }: CustomA11yParams): string {
 *     if (isDrSuess) {
 *       return `
 *         ${formatDate(date, 'EEEE MMMM d', locale)}
 *          Today you are you! That is truer than true! There is no one alive
 *          who is you-er than you!
 *       `;
 *     }
 *   }
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *  provide: CalendarA11y,
 *  useClass: CustomCalendarA11y
 * }]
 * ```
 */
@Injectable()
export class CalendarA11y {
  constructor(protected i18nPlural: I18nPluralPipe) {}

  /**
   * Aria label for the badges/date of a cell
   * @example: `Saturday October 19 1 event click to expand`
   */
  public monthCell({ day, locale }: A11yParams): string {
    if (day.badgeTotal > 0) {
      return `
        ${formatDate(day.date, 'EEEE MMMM d', locale)},
        ${this.i18nPlural.transform(day.badgeTotal, {
          '=0': 'No events',
          '=1': 'One event',
          other: '# events',
        })},
         click to expand
      `;
    } else {
      return `${formatDate(day.date, 'EEEE MMMM d', locale)}`;
    }
  }

  /**
   * Aria label for the open day events start landmark
   * @example: `Saturday October 19 expanded view`
   */
  public openDayEventsLandmark({ date, locale }: A11yParams): string {
    return `
      Beginning of expanded view for ${formatDate(date, 'EEEE MMMM dd', locale)}
    `;
  }

  /**
   * Aria label for alert that a day in the month view was expanded
   * @example: `Saturday October 19 expanded`
   */
  public openDayEventsAlert({ date, locale }: A11yParams): string {
    return `${formatDate(date, 'EEEE MMMM dd', locale)} expanded`;
  }

  /**
   * Descriptive aria label for an event
   * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
   */
  public eventDescription({ event, locale }: A11yParams): string {
    if (event.allDay === true) {
      return this.allDayEventDescription({ event, locale });
    }

    const aria = `
      ${formatDate(event.start, 'EEEE MMMM dd', locale)},
      ${event.title}, from ${formatDate(event.start, 'hh:mm a', locale)}
    `;
    if (event.end) {
      return aria + ` to ${formatDate(event.end, 'hh:mm a', locale)}`;
    }
    return aria;
  }

  /**
   * Descriptive aria label for an all day event
   * @example:
   * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
   */
  public allDayEventDescription({ event, locale }: A11yParams): string {
    const aria = `
      ${event.title}, event spans multiple days:
      start time ${formatDate(event.start, 'MMMM dd hh:mm a', locale)}
    `;
    if (event.end) {
      return (
        aria + `, stop time ${formatDate(event.end, 'MMMM d hh:mm a', locale)}`
      );
    }
    return aria + `, no stop time`;
  }

  /**
   * Aria label for the calendar event actions icons
   * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
   */
  public actionButtonLabel({ action }: A11yParams): string {
    return action.a11yLabel;
  }

  /**
   * @returns {number} Tab index to be given to month cells
   */
  public monthCellTabIndex(): number {
    return 0;
  }

  /**
   * @returns true if the events inside the month cell should be aria-hidden
   */
  public hideMonthCellEvents(): boolean {
    return true;
  }

  /**
   * @returns true if event titles should be aria-hidden (global)
   */
  public hideEventTitle(): boolean {
    return true;
  }

  /**
   * @returns true if hour segments in the week view should be aria-hidden
   */
  public hideWeekHourSegment(): boolean {
    return true;
  }

  /**
   * @returns true if hour segments in the day view should be aria-hidden
   */
  public hideDayHourSegment(): boolean {
    return true;
  }
}
