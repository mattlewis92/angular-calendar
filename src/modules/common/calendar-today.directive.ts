import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CalendarUtils } from './calendar-utils.provider';

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

  constructor(private calendarUtils: CalendarUtils) {}

  /**
   * @hidden
   */
  @HostListener('click')
  onClick(): void {
    this.viewDateChange.emit(
      this.calendarUtils.dateAdapter.startOfDay(new Date())
    );
  }
}
