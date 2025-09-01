import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Subject } from 'rxjs';
import { colors } from '../demo-utils/colors';
import {
  DroppableDirective,
  DraggableDirective,
} from 'angular-draggable-droppable';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styles: [
    \`
      .drag-active {
        position: relative;
        z-index: 1;
        pointer-events: none;
      }
      .drag-over {
        background-color: #eee;
      }
    \`,
  ],
  imports: [
    DroppableDirective,
    DraggableDirective,
    CalendarHeaderComponent,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  CalendarView = CalendarView;

  view = CalendarView.Month;

  viewDate = new Date();

  externalEvents: CalendarEvent[] = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      draggable: true,
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      draggable: true,
    },
  ];

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;

  refresh = new Subject<void>();

  eventDropped({
    event,
    newStart,
    newEnd,
    allDay,
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.externalEvents.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];
  }

  externalDrop(event: CalendarEvent) {
    if (this.externalEvents.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      this.externalEvents.push(event);
    }
  }
}
`;var t=`<div class="row">
  <div class="col-md-3">
    <div
      class="card"
      mwlDroppable
      (drop)="externalDrop($event.dropData.event)"
      dragOverClass="drag-over"
    >
      <div class="card-body">
        @if (externalEvents.length === 0) {
        <p><em>No events added</em></p>
        }
        <ul>
          @for (event of externalEvents; track event) {
          <li
            mwlDraggable
            [dropData]="{event: event}"
            [touchStartLongPress]="{ delay: 300, delta: 30 }"
            dragActiveClass="drag-active"
          >
            <a href="javascript:;" [style.color]="event.color.primary">
              {{ event.title }}
            </a>
          </li>
          }
        </ul>
      </div>
    </div>
  </div>

  <div class="col-md-9">
    <mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

    <div>
      @switch (view) { @case (CalendarView.Month) {
      <mwl-calendar-month-view
        [viewDate]="viewDate"
        [events]="events"
        [activeDayIsOpen]="activeDayIsOpen"
        [refresh]="refresh"
        (eventTimesChanged)="eventDropped($event)"
      />
      } @case (CalendarView.Week) {
      <mwl-calendar-week-view
        [viewDate]="viewDate"
        [events]="events"
        [refresh]="refresh"
        [snapDraggedEvents]="false"
        (eventTimesChanged)="eventDropped($event)"
      />
      } @case (CalendarView.Day) {
      <mwl-calendar-day-view
        [viewDate]="viewDate"
        [events]="events"
        [refresh]="refresh"
        [snapDraggedEvents]="false"
        (eventTimesChanged)="eventDropped($event)"
      />
      } }
    </div>
  </div>
</div>
`;var v=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{v as sources};
