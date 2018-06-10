import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CalendarUtils } from './calendar-utils.provider';

/**
 * Change the view date to the next view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Next
 * </button>
 * ```
 */
@Directive({
  selector: '[mwlCalendarNextView]'
})
export class CalendarNextViewDirective {
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
    const addFn: any = {
      day: this.calendarUtils.dateAdapter.addDays,
      week: this.calendarUtils.dateAdapter.addWeeks,
      month: this.calendarUtils.dateAdapter.addMonths
    }[this.view];

    this.viewDateChange.emit(addFn(this.viewDate, 1));
  }
}
