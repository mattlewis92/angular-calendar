import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  TemplateRef,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { WeekDay, CalendarEvent } from 'calendar-utils';
import {
  CalendarResource,
  ResourceWeekView,
  ResourcesMaxRowNumber,
  ResourcesMaxRowsNumber,
} from '../../common/calendar-resource/calendar-resource.interface';
import {
  DraggableDirective,
  DroppableDirective,
  DropEvent,
} from 'angular-draggable-droppable';
import {
  CalendarEventTimesChangedEvent,
  CalendarEventTimesChangedEventType,
} from '../../common/calendar-event-times-changed-event/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../../common/calendar-utils/calendar-utils.provider';
import {
  validateEvents,
  addDaysWithExclusions,
  getWeekViewPeriod,
} from '../../common/util/util';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import { PlacementArray } from 'positioning';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CalendarResourceWeekViewHeaderComponent } from './calendar-resource-week-view-header/calendar-resource-week-view-header.component';
import { CalendarResourceWeekViewRowSegmentComponent } from './calendar-resource-week-view-row-segment/calendar-resource-week-view-row-segment.component';
import { CalendarResourceWeekViewEventComponent } from './calendar-resource-week-view-event/calendar-resource-week-view-event.component';

export interface CalendarResourceWeekViewBeforeRenderEvent
  extends ResourceWeekView {
  header: WeekDay[];
}

export interface CalendarResourceEventTimesChangedEvent
  extends CalendarEventTimesChangedEvent {
  resources?: CalendarResource[];
}

interface ResourceWeekViewDropData {
  event: CalendarEvent;
  calendarId: symbol;
  sourceResource: CalendarResource;
  sourceDate: Date;
}

/**
 * Shows all events on a given week, grouped by resource. Example usage:
 *
 * ```typescript
 * <mwl-calendar-resource-week-view
 *  [viewDate]="viewDate"
 *  [events]="events"
 *  [resources]="resources">
 * </mwl-calendar-resource-week-view>
 * ```
 */
@Component({
  selector: 'mwl-calendar-resource-week-view',
  template: `
    <div class="cal-resource-week-view" role="grid">
      <mwl-calendar-resource-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
      />

      <div class="cal-time-events cal-resource-events">
        @if (view.rowColumns.length > 0) {
          <div class="cal-time-label-column">
            @for (
              resourceRow of resourcesMaxRowsNumberAsArray;
              track $index;
              let odd = $odd
            ) {
              <div class="cal-hour" [class.cal-row-odd]="odd">
                <mwl-calendar-resource-week-view-row-segment
                  [style.height.px]="
                    hourSegmentHeight *
                    (resourceRow.count > 0 ? resourceRow.count : 1)
                  "
                  [segmentHeight]="
                    hourSegmentHeight *
                    (resourceRow.count > 0 ? resourceRow.count : 1)
                  "
                  [customTemplate]="hourSegmentTemplate"
                  [resourceLabel]="resourceRow?.resource?.name"
                  [daysInWeek]="daysInWeek"
                />
              </div>
            }
          </div>
        }
        <div
          class="cal-day-columns"
          [class.cal-resize-active]="timeEventResizes.size > 0"
          #dayColumns
        >
          @for (column of view.rowColumns; track column.date.toISOString()) {
            <div class="cal-day-column">
              @for (
                eventsContainer of column.eventsGroupedByResource;
                track $index;
                let eventContainerIndex = $index
              ) {
                <div
                  class="cal-events-container"
                  [style.top]="
                    view.resourcesMaxRowsNumber[eventContainerIndex].top + 'px'
                  "
                >
                  @if (eventsContainer.events?.length) {
                    @for (
                      timeEvent of eventsContainer.events;
                      track timeEvent.event.id ?? timeEvent.event
                    ) {
                      <div
                        class="cal-event-container"
                        [ngClass]="timeEvent.event.cssClass"
                        [class.cal-draggable]="timeEvent.event.draggable"
                        [hidden]="
                          timeEvent.height === 0 && timeEvent.width === 0
                        "
                        [style.top.px]="timeEvent.top"
                        [style.height.px]="hourSegmentHeight"
                        [style.left.%]="0"
                        [style.width.%]="timeEvent.width"
                        [style.transform]="
                          timeEvent.event === draggingEvent
                            ? 'translateX(' + draggingOffsetX + 'px)'
                            : null
                        "
                        mwlDraggable
                        dragActiveClass="cal-drag-active"
                        [dragAxis]="{
                          x: timeEvent.event.draggable,
                          y: timeEvent.event.draggable,
                        }"
                        [touchStartLongPress]="{ delay: 300, delta: 30 }"
                        [dropData]="{
                          event: timeEvent.event,
                          calendarId: calendarId,
                          sourceResource: eventsContainer.resource,
                          sourceDate: column.date,
                        }"
                        (dragStart)="onEventDragStart(timeEvent.event)"
                        (dragging)="onEventDragging($event)"
                        (dragEnd)="onEventDragEnd()"
                      >
                        <ng-template [ngTemplateOutlet]="weekEventTemplate" />
                        <ng-template #weekEventTemplate>
                          <mwl-calendar-resource-week-view-event
                            [locale]="locale"
                            [weekEvent]="timeEvent"
                            [tooltipPlacement]="tooltipPlacement"
                            [tooltipTemplate]="tooltipTemplate"
                            [tooltipAppendToBody]="tooltipAppendToBody"
                            [tooltipDelay]="tooltipDelay"
                            [customTemplate]="eventTemplate"
                            [eventTitleTemplate]="eventTitleTemplate"
                            [eventActionsTemplate]="eventActionsTemplate"
                            [column]="column"
                            [daysInWeek]="daysInWeek"
                            (eventClicked)="
                              eventClicked.emit({
                                event: timeEvent.event,
                                sourceEvent: $event.sourceEvent,
                              })
                            "
                          />
                        </ng-template>
                      </div>
                    }
                  } @else {
                    <div
                      class="cal-event-container"
                      [style.height.px]="hourSegmentHeight"
                    >
                      <div [style.height.px]="hourSegmentHeight"></div>
                    </div>
                  }
                </div>
              }

              @for (
                row of resourcesMaxRowsNumberAsArray;
                track $index;
                let odd = $odd
              ) {
                <div
                  class="cal-hour"
                  [class.cal-row-odd]="odd"
                  mwlDroppable
                  dragOverClass="cal-drag-over"
                  (drop)="eventDropped($event, column.date, row.resource)"
                >
                  <mwl-calendar-resource-week-view-row-segment
                    [style.height.px]="
                      hourSegmentHeight * (row.count > 0 ? row.count : 1)
                    "
                    [segmentHeight]="
                      hourSegmentHeight * (row.count > 0 ? row.count : 1)
                    "
                    [segment]="{}"
                    [customTemplate]="hourSegmentTemplate"
                    [daysInWeek]="daysInWeek"
                  />
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  imports: [
    CalendarResourceWeekViewHeaderComponent,
    DraggableDirective,
    DroppableDirective,
    NgTemplateOutlet,
    NgClass,
    CalendarResourceWeekViewRowSegmentComponent,
    CalendarResourceWeekViewEventComponent,
  ],
})
export class CalendarResourceWeekViewComponent
  implements OnChanges, OnInit, OnDestroy, AfterViewInit
{
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * An array of resources to display on view
   */
  @Input() resources: CalendarResource[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

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
   * This is ignored when the `daysInWeek` input is also set as the `viewDate` will be used as the start of the week instead.
   * Note, you should also pass this to the calendar title pipe so it shows the same days: {{ viewDate | calendarDate:(view + 'ViewTitle'):locale:weekStartsOn }}
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
   * A custom template to use for week view events
   */
  @Input() eventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  @Input() eventTitleTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event actions
   */
  @Input() eventActionsTemplate: TemplateRef<any>;

  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input() precision: 'days' | 'minutes' = 'days';

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  @Input() weekendDays: number[];

  /**
   * Whether to snap events to a grid when dragging
   */
  @Input() snapDraggedEvents: boolean = true;

  /**
   * The number of segments in an hour. Must divide equally into 60.
   */
  @Input() hourSegments: number = 2;

  /**
   * The duration of each segment group in minutes
   */
  @Input() hourDuration: number;

  /**
   * The height in pixels of each hour segment
   */
  @Input() hourSegmentHeight: number = 50;

  /**
   * The minimum height in pixels of each event
   */
  @Input() minimumEventHeight: number = 50;

  /**
   * The day start hours in 24 hour time. Must be 0-23
   */
  @Input() dayStartHour: number = 0;

  /**
   * The day start minutes. Must be 0-59
   */
  @Input() dayStartMinute: number = 0;

  /**
   * The day end hours in 24 hour time. Must be 0-23
   */
  @Input() dayEndHour: number = 23;

  /**
   * The day end minutes. Must be 0-59
   */
  @Input() dayEndMinute: number = 59;

  /**
   * A custom template to use to replace the hour segment
   */
  @Input() hourSegmentTemplate: TemplateRef<any>;

  /**
   * The grid size to snap resizing and dragging of hourly events to
   */
  @Input() eventSnapSize: number;

  /**
   * A custom template to use for the all day events label text
   */
  @Input() allDayEventsLabelTemplate: TemplateRef<any>;

  /**
   * The number of days in a week. Can be used to create a shorter or longer week view.
   * The first day of the week will always be the `viewDate` and `weekStartsOn` if set will be ignored
   */
  @Input() daysInWeek: number;

  /**
   * A custom template to use for the current time marker
   */
  @Input() currentTimeMarkerTemplate: TemplateRef<any>;

  /**
   * Should we display events without assigned resources
   */
  @Input() keepUnassignedEvents: boolean = true;

  /**
   * Name to display unassigned resource. This apply only if keepUnassignedEvents is equal to true
   */
  @Input() unassignedRessourceName: string = 'Unassigned';

  /**
   * When dragging an event assigned to several resources, mimic the horizontal movement on
   * that same event's tile in every other resource row it's also assigned to
   */
  @Input() mimicDragAcrossResources: boolean = true;

  /**
   * Allow you to customise where events can be dragged and resized to.
   * Return true to allow dragging and resizing to the new location, or false to prevent it
   */
  @Input() validateEventTimesChanged: (
    event: CalendarEventTimesChangedEvent,
  ) => boolean;

  /**
   * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
   */
  @Output() dayHeaderClicked = new EventEmitter<{
    day: WeekDay;
    sourceEvent: MouseEvent;
  }>();

  /**
   * Called when an event title is clicked
   */
  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  /**
   * Called when an event is dragged and dropped.
   * If dropped onto another resource's row, `resources` reflects the event's new resources
   */
  @Output() eventTimesChanged =
    new EventEmitter<CalendarResourceEventTimesChangedEvent>();

  /**
   * An output that will be called before the view is rendered for the current week.
   * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
   */
  @Output() beforeViewRender =
    new EventEmitter<CalendarResourceWeekViewBeforeRenderEvent>();

  /**
   * Called when an hour segment is clicked
   */
  @Output() hourSegmentClicked = new EventEmitter<{
    date: Date;
    sourceEvent: MouseEvent;
  }>();

  /**
   * @hidden
   */
  days: WeekDay[];

  /**
   * @hidden
   */
  view: ResourceWeekView;

  /**
   * @hidden
   */
  resourcesMaxRowsNumberAsArray: ResourcesMaxRowNumber[];

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  timeEventResizes: Map<CalendarEvent, unknown> = new Map();

  /**
   * @hidden
   */
  calendarId = Symbol('angular calendar resource week view id');

  /**
   * @hidden
   */
  rtl = false;

  /**
   * The event currently being dragged, used to mimic its horizontal movement
   * across every resource row it's also assigned to
   * @hidden
   */
  draggingEvent: CalendarEvent | null = null;

  /**
   * @hidden
   */
  draggingOffsetX = 0;

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
  protected element = inject<ElementRef<HTMLElement>>(ElementRef);

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
      changes.viewDate ||
      changes.excludeDays ||
      changes.weekendDays ||
      changes.daysInWeek ||
      changes.weekStartsOn;

    const refreshBody =
      changes.viewDate ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.hourSegments ||
      changes.hourDuration ||
      changes.weekStartsOn ||
      changes.weekendDays ||
      changes.excludeDays ||
      changes.hourSegmentHeight ||
      changes.events ||
      changes.resources ||
      changes.daysInWeek ||
      changes.minimumEventHeight ||
      changes.keepUnassignedEvents ||
      changes.unassignedRessourceName;

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
  ngAfterViewInit() {
    this.rtl =
      typeof window !== 'undefined' &&
      getComputedStyle(this.element.nativeElement).direction === 'rtl';
    this.cdr.detectChanges();
  }

  /**
   * @hidden
   */
  getResourceArrayFromResourceMaxRowNumber(
    resourcesMaxRowsNumber: ResourcesMaxRowsNumber,
  ): ResourcesMaxRowNumber[] {
    const resources = [];
    for (const resourcesMaxRowNumber in resourcesMaxRowsNumber) {
      resources.push(resourcesMaxRowsNumber[resourcesMaxRowNumber]);
    }
    return resources;
  }

  /**
   * @hidden
   */
  onEventDragStart(event: CalendarEvent): void {
    if (!this.mimicDragAcrossResources) {
      return;
    }
    this.draggingEvent = event;
    this.draggingOffsetX = 0;
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  onEventDragging({ x }: { x: number; y: number }): void {
    if (!this.mimicDragAcrossResources) {
      return;
    }
    this.draggingOffsetX = x;
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  onEventDragEnd(): void {
    this.draggingEvent = null;
    this.draggingOffsetX = 0;
    this.cdr.markForCheck();
  }

  /**
   * @hidden
   */
  eventDropped(
    dropEvent: Pick<DropEvent<ResourceWeekViewDropData>, 'dropData'>,
    targetDate: Date,
    targetResource: CalendarResource,
  ): void {
    const dropData = dropEvent.dropData;
    if (!dropData?.event || dropData.calendarId !== this.calendarId) {
      return;
    }

    const { event, sourceResource, sourceDate } = dropData;
    const sourceId = sourceResource?.id;
    const targetId = targetResource?.id;
    const resourceChanged = sourceId !== targetId;

    if (
      resourceChanged &&
      targetId !== undefined &&
      event.resources?.some((resource) => resource.id === targetId)
    ) {
      return;
    }

    let resources = event.resources;
    if (resourceChanged) {
      resources =
        sourceId !== undefined
          ? (event.resources ?? []).filter(
              (resource) => resource.id !== sourceId,
            )
          : [...(event.resources ?? [])];
      if (targetId !== undefined) {
        resources = [...resources, targetResource];
      }
    }

    const daysDiff = this.dateAdapter.differenceInDays(targetDate, sourceDate);
    const newStart = addDaysWithExclusions(
      this.dateAdapter,
      event.start,
      daysDiff,
      this.excludeDays,
    );
    const newEnd = event.end
      ? addDaysWithExclusions(
          this.dateAdapter,
          event.end,
          daysDiff,
          this.excludeDays,
        )
      : undefined;

    this.eventTimesChanged.emit({
      type: CalendarEventTimesChangedEventType.Drop,
      event,
      newStart,
      newEnd,
      resources,
    });
  }

  protected refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek,
      ),
    });
  }

  protected refreshBody(): void {
    this.view = this.getResourceWeekView(this.events, this.resources);
  }

  protected refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.emitBeforeViewRender();
  }

  protected emitBeforeViewRender(): void {
    if (this.days && this.view) {
      this.beforeViewRender.emit({
        header: this.days,
        ...this.view,
      });
    }
  }

  protected getResourceWeekView(
    events: CalendarEvent[],
    resources: CalendarResource[],
  ) {
    const resourceWeekView = this.utils.getResourceWeekView({
      events,
      resources,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      minimumEventHeight: this.minimumEventHeight,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek,
      ),
      keepUnassignedEvents: this.keepUnassignedEvents,
      unassignedRessourceName: this.unassignedRessourceName,
    });
    this.resourcesMaxRowsNumberAsArray =
      this.getResourceArrayFromResourceMaxRowNumber(
        resourceWeekView.resourcesMaxRowsNumber,
      );
    return resourceWeekView;
  }
}
