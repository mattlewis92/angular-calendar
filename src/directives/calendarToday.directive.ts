import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import startOfToday from 'date-fns/start_of_today';

/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * &lt;button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate"&gt;
 *  Today
 * &lt;/button&gt;
 * ```
 */
@Directive({
  selector: '[mwlCalendarToday]'
})
export class CalendarTodayDirective {

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  /**
   * @hidden
   */
  @HostListener('click')
  onClick(): void {
    this.viewDateChange.emit(startOfToday());
  }

}