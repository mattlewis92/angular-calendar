import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarResource } from '../../common/calendar-resource/calendar-resource.interface';
import { Subject } from 'rxjs';
import { CalendarEventTimesChangedEvent } from '../../common/calendar-event-times-changed-event/calendar-event-times-changed-event.interface';
import { PlacementArray } from 'positioning';
import { CalendarResourceWeekViewBeforeRenderEvent } from '../../resource-week/calendar-resource-week.module';
import {
  CalendarResourceEventTimesChangedEvent,
  CalendarResourceWeekViewComponent,
} from '../../resource-week/calendar-resource-week-view/calendar-resource-week-view.component';

export type CalendarResourceDayViewBeforeRenderEvent =
  CalendarResourceWeekViewBeforeRenderEvent;

/**
 * Shows all events on a given day, grouped by resource. Example usage:
 *
 * ```typescript
 * <mwl-calendar-resource-day-view
 *  [viewDate]="viewDate"
 *  [events]="events"
 *  [resources]="resources">
 * </mwl-calendar-resource-day-view>
 * ```
 */
@Component({
  selector: 'mwl-calendar-resource-day-view',
  template: `
    <mwl-calendar-resource-week-view
      class="cal-resource-day-view"
      [daysInWeek]="1"
      [viewDate]="viewDate"
      [events]="events"
      [resources]="resources"
      [hourSegments]="hourSegments"
      [hourDuration]="hourDuration"
      [hourSegmentHeight]="hourSegmentHeight"
      [minimumEventHeight]="minimumEventHeight"
      [dayStartHour]="dayStartHour"
      [dayStartMinute]="dayStartMinute"
      [dayEndHour]="dayEndHour"
      [dayEndMinute]="dayEndMinute"
      [refresh]="refresh"
      [locale]="locale"
      [eventSnapSize]="eventSnapSize"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipAppendToBody]="tooltipAppendToBody"
      [tooltipDelay]="tooltipDelay"
      [hourSegmentTemplate]="hourSegmentTemplate"
      [eventTemplate]="eventTemplate"
      [eventTitleTemplate]="eventTitleTemplate"
      [eventActionsTemplate]="eventActionsTemplate"
      [snapDraggedEvents]="snapDraggedEvents"
      [allDayEventsLabelTemplate]="allDayEventsLabelTemplate"
      [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
      [validateEventTimesChanged]="validateEventTimesChanged"
      [keepUnassignedEvents]="keepUnassignedEvents"
      [unassignedRessourceName]="unassignedRessourceName"
      [mimicDragAcrossResources]="mimicDragAcrossResources"
      (eventClicked)="eventClicked.emit($event)"
      (hourSegmentClicked)="hourSegmentClicked.emit($event)"
      (eventTimesChanged)="eventTimesChanged.emit($event)"
      (beforeViewRender)="beforeViewRender.emit($event)"
    />
  `,
  imports: [CalendarResourceWeekViewComponent],
})
export class CalendarResourceDayViewComponent {
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
   * The number of segments in an hour. Must divide equally into 60.
   */
  @Input() hourSegments: number = 2;

  /**
   * The height in pixels of each hour segment
   */
  @Input() hourSegmentHeight: number = 50;

  /**
   * The duration of each segment group in minutes
   */
  @Input() hourDuration: number;

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
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string;

  /**
   * The grid size to snap resizing and dragging of events to
   */
  @Input() eventSnapSize: number;

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
   * A custom template to use to replace the hour segment
   */
  @Input() hourSegmentTemplate: TemplateRef<any>;

  /**
   * A custom template to use for day view events
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
   * Whether to snap events to a grid when dragging
   */
  @Input() snapDraggedEvents: boolean = true;

  /**
   * A custom template to use for the all day events label text
   */
  @Input() allDayEventsLabelTemplate: TemplateRef<any>;

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
   * Called when an event title is clicked
   */
  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  /**
   * Called when an hour segment is clicked
   */
  @Output() hourSegmentClicked = new EventEmitter<{
    date: Date;
    sourceEvent: MouseEvent;
  }>();

  /**
   * Called when an event is dragged and dropped.
   * If dropped onto another resource's row, `resources` reflects the event's new resources
   */
  @Output() eventTimesChanged =
    new EventEmitter<CalendarResourceEventTimesChangedEvent>();

  /**
   * An output that will be called before the view is rendered for the current day.
   * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
   */
  @Output() beforeViewRender =
    new EventEmitter<CalendarResourceDayViewBeforeRenderEvent>();
}
