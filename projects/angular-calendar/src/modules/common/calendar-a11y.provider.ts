import { LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { pluralize } from './util';

/**
 * This class is responsible for adding accessibility to the calendar.
 * You may override any of its methods via angulars DI to suit your requirements.
 * For example:
 *
 * ```typescript
 * import { Injectable, Inject, LOCALE_ID } from '@angular/core';
 * import { CalendarA11y } from 'angular-calendar';
 *
 * export class CalendarA11yService extends CalendarA11y {
 *   locale: string;
 *   constructor(@Inject(LOCALE_ID) locale: string) {
 *     super(locale);
 *     this.locale = locale;
 *   }
 *
 *   // overriding a function
 *   hideMonthCellEvents(): boolean {
 *     return false;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarA11y,
 *  useClass: CustomCalendarA11y
 * }]
 * ```
 */
export class CalendarA11y {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  /**
   * Aria label for the badges/date of a cell
   * @example: `Saturday October 19 1 event`
   */
  monthCell(day: MonthViewDay): string {
    if (day.badgeTotal > 0) {
      return `
        ${formatDate(day.date, 'EEEE MMMM d', this.locale)}
         ${pluralize('event', day.badgeTotal, true)},
         click to expand
      `;
    } else {
      return `${formatDate(day.date, 'EEEE MMMM d', this.locale)}`;
    }
  }

  /**
   * Aria label for the open day events start landmark
   * @example: `Saturday October 19 expanded view`
   */
  openDayEventsLM(date: Date): string {
    return `
      Beginning of expanded view for ${formatDate(
        date,
        'EEEE MMMM dd',
        this.locale
      )}
    `;
  }

  /**
   * Aria label for alert that a day in the month view was expanded
   * @example: `Saturday October 19 expanded`
   */
  openDayEventsAlert(date: Date): string {
    return `
      ${formatDate(date, 'EEEE MMMM dd', this.locale)} expanded
    `;
  }

  /**
   * Descriptive aria label for an event
   * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
   */
  eventDescription(event: CalendarEvent): string {
    if (event.allDay === true) {
      return this.allDayEventDescription(event);
    }

    const aria = `
      ${formatDate(event.start, 'EEEE MMMM dd', this.locale)},
      ${event.title}, from ${formatDate(event.start, 'hh:mm a', this.locale)}
    `;
    if (event.end) {
      return aria + ` to ${formatDate(event.end, 'hh:mm a', this.locale)}`;
    }
    return aria;
  }

  /**
   * Descriptive aria label for an all day event
   * @example:
   * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
   */
  allDayEventDescription(event: CalendarEvent): string {
    const aria = `
      ${event.title}, event spans multiple days:
      start time ${formatDate(event.start, 'MMMM dd hh:mm a', this.locale)}
    `;
    if (event.end) {
      return (
        aria +
        `, stop time ${formatDate(event.end, 'MMMM d hh:mm a', this.locale)}`
      );
    }
    return aria + `, no stop time`;
  }

  /**
   * Aria label for the calendar event actions icons
   * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
   */
  actionButtonLabel(label: string): string {
    if (label.includes(`pencil`)) {
      return `Edit`;
    }
    if (label.includes(`times`)) {
      return `Delete`;
    }
    return '';
  }

  /**
   * @returns true if the events inside the month cell should be aria-hidden
   */
  hideMonthCellEvents(): boolean {
    return true;
  }

  /**
   * @returns true if event titles should be aria-hidden (global)
   */
  hideEventTitle(): boolean {
    return true;
  }

  /**
   * @returns true if hour segments in the week view should be aria-hidden
   */
  hideWeekHourSeg(): boolean {
    return true;
  }

  /**
   * @returns true if hour segments in the day view should be aria-hidden
   */
  hideDayHourSeg(): boolean {
    return true;
  }
}
