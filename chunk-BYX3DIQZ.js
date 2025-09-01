import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarEventActionsComponent,
  CalendarEventTitleComponent,
  CalendarTooltipDirective,
  ClickDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
  CalendarEventTitlePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { colors } from '../demo-utils/colors';
import { isSameMinute, startOfDay } from 'date-fns';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgStyle } from '@angular/common';

interface EventGroupMeta {
  type: string;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styles: [
    \`
      .cell-totals {
        margin: 5px;
        text-align: center;
      }
      .badge {
        margin-right: 5px;
      }
    \`,
  ],
  imports: [
    CalendarHeaderComponent,
    CalendarEventActionsComponent,
    CalendarEventTitleComponent,
    NgbPopover,
    NgStyle,
    CalendarTooltipDirective,
    ClickDirective,
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
export class DemoComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: startOfDay(new Date()),
      meta: {
        type: 'warning',
      },
    },
    {
      title: 'Event 2',
      color: colors.yellow,
      start: startOfDay(new Date()),
      meta: {
        type: 'warning',
      },
    },
    {
      title: 'Event 3',
      color: colors.blue,
      start: startOfDay(new Date()),
      meta: {
        type: 'info',
      },
    },
    {
      title: 'Event 4',
      color: colors.red,
      start: startOfDay(new Date()),
      meta: {
        type: 'danger',
      },
    },
    {
      title: 'Event 5',
      color: colors.red,
      start: startOfDay(new Date()),
      meta: {
        type: 'danger',
      },
    },
  ];

  groupedSimilarEvents: CalendarEvent[] = [];

  ngOnInit() {
    // group any events together that have the same type and dates
    // use for when you have a lot of events on the week or day view at the same time
    this.groupedSimilarEvents = [];
    const processedEvents = new Set();
    this.events.forEach((event) => {
      if (processedEvents.has(event)) {
        return;
      }
      const similarEvents = this.events.filter((otherEvent) => {
        return (
          otherEvent !== event &&
          !processedEvents.has(otherEvent) &&
          isSameMinute(otherEvent.start, event.start) &&
          (isSameMinute(otherEvent.end, event.end) ||
            (!otherEvent.end && !event.end)) &&
          otherEvent.color.primary === event.color.primary &&
          otherEvent.color.secondary === event.color.secondary
        );
      });
      processedEvents.add(event);
      similarEvents.forEach((otherEvent) => {
        processedEvents.add(otherEvent);
      });
      if (similarEvents.length > 0) {
        this.groupedSimilarEvents.push({
          title: \`\${similarEvents.length + 1} events\`,
          color: event.color,
          start: event.start,
          end: event.end,
          meta: {
            groupedEvents: [event, ...similarEvents],
          },
        });
      } else {
        this.groupedSimilarEvents.push(event);
      }
    });
  }

  beforeMonthViewRender({
    body,
  }: {
    body: CalendarMonthViewDay<EventGroupMeta>[];
  }): void {
    // month view has a different UX from the week and day view so we only really need to group by the type
    body.forEach((cell) => {
      const groups = {};
      cell.events.forEach((event: CalendarEvent<EventGroupMeta>) => {
        groups[event.meta.type] = groups[event.meta.type] || [];
        groups[event.meta.type].push(event);
      });
      cell['eventGroups'] = Object.entries(groups);
    });
  }
}
`;var t=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<ng-template #customCellTemplate let-day="day" let-locale="locale">
  <div class="cal-cell-top">
    @if (day.badgeTotal > 0) {
    <span class="cal-day-badge">{{ day.badgeTotal }}</span>
    }
    <span class="cal-day-number"
      >{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span
    >
  </div>
  <div class="cell-totals">
    @for (group of day.eventGroups; track group) {
    <span class="badge text-bg-{{ group[0] }}"> {{ group[1].length }} </span>
    }
  </div>
</ng-template>

<ng-template
  #customEventTemplate
  let-weekEvent="weekEvent"
  let-tooltipPlacement="tooltipPlacement"
  let-eventClicked="eventClicked"
  let-tooltipTemplate="tooltipTemplate"
  let-tooltipAppendToBody="tooltipAppendToBody"
  let-tooltipDisabled="tooltipDisabled"
  let-tooltipDelay="tooltipDelay"
  let-column="column"
>
  <ng-template #groupedEventsTemplate>
    <div style="min-width: 150px">
      @for (event of weekEvent.event.meta.groupedEvents; track event) {
      <div>
        <mwl-calendar-event-actions [event]="event" />
        &ngsp;
        <mwl-calendar-event-title [event]="event" view="week" />
      </div>
      }
    </div>
  </ng-template>

  <div
    [ngbPopover]="groupedEventsTemplate"
    [disablePopover]="!weekEvent.event.meta.groupedEvents"
    class="cal-event"
    [ngStyle]="{
          color: weekEvent.event.color?.secondaryText,
          backgroundColor: weekEvent.event.color?.secondary,
          borderColor: weekEvent.event.color?.primary
        }"
    [mwlCalendarTooltip]="
          !tooltipDisabled && !weekEvent.event.meta.groupedEvents
            ? (weekEvent.event.title
              | calendarEventTitle: 'weekTooltip':weekEvent.event)
            : ''
        "
    [tooltipPlacement]="tooltipPlacement"
    [tooltipEvent]="weekEvent.event"
    [tooltipTemplate]="tooltipTemplate"
    [tooltipAppendToBody]="tooltipAppendToBody"
    [tooltipDelay]="tooltipDelay"
    (mwlClick)="eventClicked.emit()"
  >
    @if (!weekEvent.event.meta.groupedEvents) {

    <mwl-calendar-event-actions [event]="weekEvent.event" />
    &ngsp; }
    <mwl-calendar-event-title [event]="weekEvent.event" view="week" />
  </div>
</ng-template>

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [cellTemplate]="customCellTemplate"
    (beforeViewRender)="beforeMonthViewRender($event)"
    [activeDayIsOpen]="true"
  />
  } @case ('week') {
  <mwl-calendar-week-view
    [viewDate]="viewDate"
    [events]="groupedSimilarEvents"
    [eventTemplate]="customEventTemplate"
  />
  } @case ('day') {
  <mwl-calendar-day-view
    [viewDate]="viewDate"
    [events]="groupedSimilarEvents"
    [eventTemplate]="customEventTemplate"
  />
  } }
</div>
`;var v=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{v as sources};
