import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarView } from './calendar-view.enum';

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
  @Input() view: CalendarView;

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * Days to skip when going forward by 1 day
   */
  @Input() excludeDays: number[];

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
    const addFn: any = {
      day: this.dateAdapter.addDays,
      week: this.dateAdapter.addWeeks,
      month: this.dateAdapter.addMonths
    }[this.view];

    let newDate = addFn(this.viewDate, 1);

    while (
      this.view === CalendarView.Day &&
      this.excludeDays &&
      this.excludeDays.indexOf(newDate.getDay()) > -1
    ) {
      newDate = this.dateAdapter.addDays(newDate, 1);
    }

    this.viewDateChange.emit(newDate);
  }
}
