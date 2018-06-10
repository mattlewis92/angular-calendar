import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CalendarUtils } from './calendar-utils.provider';

/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
@Directive({
  selector: '[mwlCalendarPreviousView]'
})
export class CalendarPreviousViewDirective {
  /**
   * The current view
   */
  @Input() view: string;

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
    const subFn: any = {
      day: this.calendarUtils.dateAdapter.subDays,
      week: this.calendarUtils.dateAdapter.subWeeks,
      month: this.calendarUtils.dateAdapter.subMonths
    }[this.view];

    this.viewDateChange.emit(subFn(this.viewDate, 1));
  }
}
