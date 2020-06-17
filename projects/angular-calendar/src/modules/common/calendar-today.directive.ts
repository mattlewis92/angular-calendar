import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';

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
  selector: '[mwlCalendarToday]',
})
export class CalendarTodayDirective {
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * The timezone of the date
   */
  @Input() timezone: string;

  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(private dateAdapter: DateAdapter) {}

  /**
   * @hidden
   */
  @HostListener('click')
  onClick(): void {
    this.viewDateChange.emit(
      this.dateAdapter.withTimezone(this.timezone).startOfDay(new Date())
    );
  }
}
