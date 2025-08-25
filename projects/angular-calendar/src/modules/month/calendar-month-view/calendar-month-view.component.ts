import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  CalendarEvent,
  WeekDay,
  MonthView,
  MonthViewDay,
  ViewPeriod,
} from 'calendar-utils';
import { Subject, Subscription } from 'rxjs';
import {
  CalendarEventTimesChangedEvent,
  CalendarEventTimesChangedEventType,
} from '../../common/calendar-event-times-changed-event/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../../common/calendar-utils/calendar-utils.provider';
import { validateEvents } from '../../common/util/util';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import { PlacementArray } from 'positioning';
import { CalendarMonthViewHeaderComponent } from './calendar-month-view-header/calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './calendar-month-cell/calendar-month-cell.component';
import { DroppableDirective } from 'angular-draggable-droppable';
import { NgClass, NgStyle, SlicePipe } from '@angular/common';
import { ClickDirective } from '../../common/click/click.directive';
import { KeydownEnterDirective } from '../../common/keydown-enter/keydown-enter.directive';
import { CalendarOpenDayEventsComponent } from './calendar-open-day-events/calendar-open-day-events.component';
import { CalendarA11yPipe } from '../../common/calendar-a11y/calendar-a11y.pipe';

export interface CalendarMonthViewBeforeRenderEvent {
  header: WeekDay[];
  body: MonthViewDay[];
  period: ViewPeriod;
}

export interface CalendarMonthViewEventTimesChangedEvent<
  EventMetaType = any,
  DayMetaType = any,
> extends CalendarEventTimesChangedEvent<EventMetaType> {
  day: MonthViewDay<DayMetaType>;
}

/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-month-view>
 * ```
 */
@Component({
  selector: 'mwl-calendar-month-view',
  template: `
    <div class="cal-month-view" role="grid">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        (columnHeaderClicked)="columnHeaderClicked.emit($event)"
        [customTemplate]="headerTemplate"
      />
      <div class="cal-days">
        @for (rowIndex of view.rowOffsets; track rowIndex) {
          <div>
            <div role="row" class="cal-cell-row">
              @for (
                day of view.days
                  | slice: rowIndex : rowIndex + view.totalDaysVisibleInWeek;
                track day.date.toISOString()
              ) {
                <mwl-calendar-month-cell
                  role="gridcell"
                  [ngClass]="day?.cssClass"
                  [day]="day"
                  [openDay]="openDay"
                  [locale]="locale"
                  [tooltipPlacement]="tooltipPlacement"
                  [tooltipAppendToBody]="tooltipAppendToBody"
                  [tooltipTemplate]="tooltipTemplate"
                  [tooltipDelay]="tooltipDelay"
                  [customTemplate]="cellTemplate"
                  [ngStyle]="{ backgroundColor: day.backgroundColor }"
                  (mwlClick)="
                    dayClicked.emit({ day: day, sourceEvent: $event })
                  "
                  [clickListenerDisabled]="!dayClicked.observed"
                  (mwlKeydownEnter)="
                    dayClicked.emit({ day: day, sourceEvent: $event })
                  "
                  (highlightDay)="toggleDayHighlight($event.event, true)"
                  (unhighlightDay)="toggleDayHighlight($event.event, false)"
                  mwlDroppable
                  dragOverClass="cal-drag-over"
                  (drop)="
                    eventDropped(
                      day,
                      $event.dropData.event,
                      $event.dropData.draggedFrom
                    )
                  "
                  (eventClicked)="
                    eventClicked.emit({
                      event: $event.event,
                      sourceEvent: $event.sourceEvent,
                    })
                  "
                  [attr.tabindex]="{} | calendarA11y: 'monthCellTabIndex'"
                />
              }
            </div>
            <mwl-calendar-open-day-events
              [locale]="locale"
              [isOpen]="openRowIndex === rowIndex"
              [events]="openDay?.events"
              [date]="openDay?.date"
              [customTemplate]="openDayEventsTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              (eventClicked)="
                eventClicked.emit({
                  event: $event.event,
                  sourceEvent: $event.sourceEvent,
                })
              "
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  openDay,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
            />
          </div>
        }
      </div>
    </div>
  `,
  imports: [
    CalendarMonthViewHeaderComponent,
    CalendarMonthCellComponent,
    DroppableDirective,
    NgClass,
    NgStyle,
    ClickDirective,
    KeydownEnterDirective,
    CalendarOpenDayEventsComponent,
    SlicePipe,
    CalendarA11yPipe,
  ],
})
export class CalendarMonthViewComponent
  implements OnChanges, OnInit, OnDestroy
{
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view.
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

  /**
   * Whether the events list for the day of the `viewDate` option is visible or not
   */
  @Input() activeDayIsOpen: boolean = false;

  /**
   * If set will be used to determine the day that should be open. If not set, the `viewDate` is used
   */
  @Input() activeDay: Date;

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string = inject(LOCALE_ID);

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement: PlacementArray = 'auto';

  /**
   * A custom template to use for the event tooltips
   */
  @Input() tooltipTemplate: TemplateRef<any>;

  /**
   * Whether to append tooltips to the body or next to the trigger element
   */
  @Input() tooltipAppendToBody: boolean = true;

  /**
   * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
   * will be displayed immediately.
   */
  @Input() tooltipDelay: number | null = null;

  /**
   * The start number of the week.
   * If using the moment date adapter this option won't do anything and you'll need to set it globally like so:
   * ```
   * moment.updateLocale('en', {
   *   week: {
   *     dow: 1, // set start of week to monday instead
   *     doy: 0,
   *   },
   * });
   * ```
   */
  @Input() weekStartsOn: number;

  /**
   * A custom template to use to replace the header
   */
  @Input() headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use to replace the day cell
   */
  @Input() cellTemplate: TemplateRef<any>;

  /**
   * A custom template to use for the slide down box of events for the active day
   */
  @Input() openDayEventsTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  @Input() eventTitleTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event actions
   */
  @Input() eventActionsTemplate: TemplateRef<any>;

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  @Input() weekendDays: number[];

  /**
   * An output that will be called before the view is rendered for the current month.
   * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
   */
  @Output() beforeViewRender =
    new EventEmitter<CalendarMonthViewBeforeRenderEvent>();

  /**
   * Called when the day cell is clicked
   */
  @Output() dayClicked = new EventEmitter<{
    day: MonthViewDay;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  /**
   * Called when a header week day is clicked. Returns ISO day number.
   */
  @Output() columnHeaderClicked = new EventEmitter<{
    isoDayNumber: number;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  /**
   * Called when an event is dragged and dropped
   */
  @Output()
  eventTimesChanged =
    new EventEmitter<CalendarMonthViewEventTimesChangedEvent>();

  /**
   * @hidden
   */
  columnHeaders: WeekDay[];

  /**
   * @hidden
   */
  view: MonthView;

  /**
   * @hidden
   */
  openRowIndex: number;

  /**
   * @hidden
   */
  openDay: MonthViewDay;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  protected cdr = inject(ChangeDetectorRef);

  /**
   * @hidden
   */
  protected utils = inject(CalendarUtils);

  /**
   * @hidden
   */
  protected dateAdapter = inject(DateAdapter);

  /**
   * @hidden
   */
  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
    const refreshHeader =
      changes.viewDate || changes.excludeDays || changes.weekendDays;
    const refreshBody =
      changes.viewDate ||
      changes.events ||
      changes.excludeDays ||
      changes.weekendDays;

    if (refreshHeader) {
      this.refreshHeader();
    }

    if (changes.events) {
      validateEvents(this.events);
    }

    if (refreshBody) {
      this.refreshBody();
    }

    if (refreshHeader || refreshBody) {
      this.emitBeforeViewRender();
    }

    if (
      changes.activeDayIsOpen ||
      changes.viewDate ||
      changes.events ||
      changes.excludeDays ||
      changes.activeDay
    ) {
      this.checkActiveDayIsOpen();
    }
  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
    this.view.days.forEach((day) => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor =
          (event.color && event.color.secondary) || '#D1E8FF';
      } else {
        delete day.backgroundColor;
      }
    });
  }

  /**
   * @hidden
   */
  eventDropped(
    droppedOn: MonthViewDay,
    event: CalendarEvent,
    draggedFrom?: MonthViewDay,
  ): void {
    if (droppedOn !== draggedFrom) {
      const year: number = this.dateAdapter.getYear(droppedOn.date);
      const month: number = this.dateAdapter.getMonth(droppedOn.date);
      const date: number = this.dateAdapter.getDate(droppedOn.date);
      const newStart: Date = this.dateAdapter.setDate(
        this.dateAdapter.setMonth(
          this.dateAdapter.setYear(event.start, year),
          month,
        ),
        date,
      );
      let newEnd: Date;
      if (event.end) {
        const secondsDiff: number = this.dateAdapter.differenceInSeconds(
          newStart,
          event.start,
        );
        newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
      }
      this.eventTimesChanged.emit({
        event,
        newStart,
        newEnd,
        day: droppedOn,
        type: CalendarEventTimesChangedEventType.Drop,
      });
    }
  }

  protected refreshHeader(): void {
    this.columnHeaders = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays,
    });
  }

  protected refreshBody(): void {
    this.view = this.utils.getMonthView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays,
    });
  }

  protected checkActiveDayIsOpen(): void {
    if (this.activeDayIsOpen === true) {
      const activeDay = this.activeDay || this.viewDate;
      this.openDay = this.view.days.find((day) =>
        this.dateAdapter.isSameDay(day.date, activeDay),
      );
      const index: number = this.view.days.indexOf(this.openDay);
      this.openRowIndex =
        Math.floor(index / this.view.totalDaysVisibleInWeek) *
        this.view.totalDaysVisibleInWeek;
    } else {
      this.openRowIndex = null;
      this.openDay = null;
    }
  }

  protected refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.emitBeforeViewRender();
    this.checkActiveDayIsOpen();
  }

  protected emitBeforeViewRender(): void {
    if (this.columnHeaders && this.view) {
      this.beforeViewRender.emit({
        header: this.columnHeaders,
        body: this.view.days,
        period: this.view.period,
      });
    }
  }
}
