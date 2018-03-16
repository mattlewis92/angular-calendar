import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import startOfDay from 'date-fns/esm/startOfDay';

/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate">
 *  Today
 * </button>
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
    this.viewDateChange.emit(startOfDay(Date.now()));
  }
}
