import"./chunk-RACSJ3AQ.js";var e=`import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarTooltipDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
  CalendarEventTitlePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Subject } from 'rxjs';
import { colors } from '../demo-utils/colors';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { NgClass } from '@angular/common';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['./styles.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CalendarHeaderComponent,
    ContextMenuModule,
    NgClass,
    CalendarTooltipDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarDatePipe,
    CalendarEventTitlePipe,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  addEvent(date: Date): void {
    this.events.push({
      start: date,
      title: 'New event',
      color: colors.red,
    });
    this.refresh.next();
  }
}
`;var t=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<context-menu #basicMenu>
  <ng-template contextMenuItem (execute)="addEvent($event.value)">
    Add event
  </ng-template>
</context-menu>

<ng-template
  #monthCellTemplate
  let-day="day"
  let-openDay="openDay"
  let-locale="locale"
  let-tooltipPlacement="tooltipPlacement"
  let-highlightDay="highlightDay"
  let-unhighlightDay="unhighlightDay"
  let-eventClicked="eventClicked"
>
  <div
    class="month-cell-fill-height"
    [contextMenu]="basicMenu"
    [contextMenuValue]="day.date"
  >
    <div class="cal-cell-top">
      @if (day.badgeTotal > 0) {
      <span class="cal-day-badge">{{ day.badgeTotal }}</span>
      }
      <span class="cal-day-number"
        >{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span
      >
    </div>
    <div class="cal-events">
      @for (event of day.events; track event) {
      <div
        class="cal-event"
        [style.backgroundColor]="event.color.primary"
        [ngClass]="event?.cssClass"
        (mouseenter)="highlightDay.emit({event: event})"
        (mouseleave)="unhighlightDay.emit({event: event})"
        [mwlCalendarTooltip]="event.title | calendarEventTitle:'monthTooltip':event"
        [tooltipPlacement]="tooltipPlacement"
        (click)="$event.stopPropagation(); eventClicked.emit({event: event})"
      ></div>
      }
    </div>
  </div>
</ng-template>

<ng-template
  #weekHeaderTemplate
  let-days="days"
  let-locale="locale"
  let-dayHeaderClicked="dayHeaderClicked"
>
  <div class="cal-day-headers">
    @for (day of days; track day) {
    <div
      class="cal-header"
      [class.cal-past]="day.isPast"
      [class.cal-today]="day.isToday"
      [class.cal-future]="day.isFuture"
      [class.cal-weekend]="day.isWeekend"
      (click)="dayHeaderClicked.emit({day: day})"
      [contextMenu]="basicMenu"
      [contextMenuValue]="day.date"
    >
      <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br />
      <span
        >{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span
      >
    </div>
    }
  </div>
</ng-template>

<ng-template
  #dayHourSegmentTemplate
  let-segment="segment"
  let-locale="locale"
  let-segmentHeight="segmentHeight"
>
  <div
    class="cal-hour-segment"
    [style.height.px]="segmentHeight"
    [class.cal-hour-start]="segment.isStart"
    [class.cal-after-hour-start]="!segment.isStart"
    [ngClass]="segment.cssClass"
    [contextMenu]="basicMenu"
    [contextMenuValue]="segment.date"
  >
    <div class="cal-time">
      {{ segment.date | calendarDate: 'dayViewHour':locale }}
    </div>
  </div>
</ng-template>

<ng-template
  #weekViewHourSegment
  let-segment="segment"
  let-locale="locale"
  let-segmentHeight="segmentHeight"
  let-isTimeLabel="isTimeLabel"
>
  <div
    class="cal-hour-segment"
    [style.height.px]="segmentHeight"
    [class.cal-hour-start]="segment.isStart"
    [class.cal-after-hour-start]="!segment.isStart"
    [ngClass]="segment.cssClass"
    [contextMenu]="basicMenu"
    [contextMenuValue]="segment.date"
  >
    @if (isTimeLabel) {
    <div class="cal-time">
      {{ segment.date | calendarDate: 'weekViewHour':locale }}
    </div>
    }
  </div>
</ng-template>

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    [cellTemplate]="monthCellTemplate"
  />
  } @case ('week') {
  <mwl-calendar-week-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    [headerTemplate]="weekHeaderTemplate"
    [hourSegmentTemplate]="weekViewHourSegment"
  />
  } @case ('day') {
  <mwl-calendar-day-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    [hourSegmentTemplate]="dayHourSegmentTemplate"
  />
  } }
</div>
`;var a=`@use '@angular/cdk/overlay-prebuilt.css';
@use '@perfectmemory/ngx-contextmenu/src/assets/stylesheets/base';

.month-cell-fill-height {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
`;var p=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t},{filename:"styles.scss",contents:a}];export{p as sources};
