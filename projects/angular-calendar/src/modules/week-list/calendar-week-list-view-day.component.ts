import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { DayViewEvent, WeekDay, WeekViewHourColumn } from 'calendar-utils';
import { PlacementArray } from 'positioning';
import { ValidateDrag } from 'angular-draggable-droppable';

@Component({
  selector: 'mwl-calendar-week-list-view-day',
  template: `
    <ng-template
      #defaultTemplate
      let-column="column"
      let-validateDrag="validateDrag"
      let-dragStart="dragStart"
      let-dragMove="dragMove"
      let-dragEnded="dragEnded"
    >
      <div class="cal-day">
        <div
          *ngFor="let timeEvent of column.events; trackBy: trackByTimeEvent"
          #event
          class="cal-event-container"
          [class.cal-draggable]="timeEvent.event.draggable"
          [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
          [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
          [ngClass]="timeEvent.event.cssClass"
          [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
          mwlDraggable
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: timeEvent.event, calendarId: calendarId }"
          [dragAxis]="{
            x: timeEvent.event.draggable,
            y: timeEvent.event.draggable
          }"
          [ghostDragEnabled]="true"
          [validateDrag]="validateDrag"
          (dragStart)="dragStart.emit({ event: event, timeEvent: timeEvent })"
          (dragging)="dragMove.emit({ timeEvent: timeEvent, event: $event })"
          (dragEnd)="dragEnded.emit({ timeEvent: timeEvent, event: $event })"
        >
          <mwl-calendar-week-list-view-event
            [weekEvent]="timeEvent"
            [tooltipPlacement]="tooltipPlacement"
            [tooltipTemplate]="tooltipTemplate"
            [tooltipAppendToBody]="tooltipAppendToBody"
            [tooltipDisabled]="dragActive"
            [tooltipDelay]="tooltipDelay"
            [customTemplate]="eventTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            [eventActionsTemplate]="eventActionsTemplate"
            (eventClicked)="eventClicked.emit({ event: timeEvent.event })"
          >
          </mwl-calendar-week-list-view-event>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        column: column,
        day: day,
        validateDrag: validateDrag,
        dragStart: dragStart,
        dragMove: dragMove,
        dragEnded: dragEnded
      }"
    >
    </ng-template>
  `
})
export class CalendarWeekListViewDayComponent {
  @Input() column: WeekViewHourColumn;

  @Input() day: WeekDay;

  @Input() validateDrag: ValidateDrag;

  @Input() dragActive: boolean;

  @Input() tooltipPlacement: PlacementArray;

  @Input() eventTemplate: TemplateRef<any>;

  @Input() tooltipAppendToBody: boolean;

  @Input() tooltipDelay: number | null;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Input() eventActionsTemplate: TemplateRef<any>;

  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  @Output() dragStart: EventEmitter<any> = new EventEmitter();

  @Output() dragMove: EventEmitter<any> = new EventEmitter();

  @Output() dragEnded: EventEmitter<any> = new EventEmitter();

  /**
   * @hidden
   */
  calendarId = Symbol('angular calendar week list view id');

  /**
   * @hidden
   */
  trackByTimeEvent = (index: number, dayEvent: DayViewEvent) =>
    dayEvent.event.start.toISOString();
}
