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
  @Input() view: CalendarView;

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * Days to skip when going back by 1 day
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
    const subFn: any = {
      day: this.dateAdapter.subDays,
      week: this.dateAdapter.subWeeks,
      month: this.dateAdapter.subMonths
    }[this.view];

    let newDate = subFn(this.viewDate, 1);

    while (
      this.view === CalendarView.Day &&
      this.excludeDays &&
      this.excludeDays.indexOf(newDate.getDay()) > -1
    ) {
      newDate = this.dateAdapter.subDays(newDate, 1);
    }

    this.viewDateChange.emit(newDate);
  }
}
