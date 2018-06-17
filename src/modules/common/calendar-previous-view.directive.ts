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

    this.viewDateChange.emit(subFn(this.viewDate, 1));
  }
}
