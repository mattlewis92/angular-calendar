import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import subDays from 'date-fns/sub_days';
import subWeeks from 'date-fns/sub_weeks';
import subMonths from 'date-fns/sub_months';

/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * &lt;button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view"&gt;
 *  Previous
 * &lt;/button&gt;
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

  /**
   * @hidden
   */
  @HostListener('click')
  onClick(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDateChange.emit(subFn(this.viewDate, 1));

  }

}