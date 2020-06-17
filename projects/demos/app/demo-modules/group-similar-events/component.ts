import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { colors } from '../demo-utils/colors';
import { isSameMinute, startOfDay } from 'date-fns';

interface EventGroupMeta {
  type: string;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styles: [
    `
      .cell-totals {
        margin: 5px;
        text-align: center;
      }
      .badge {
        margin-right: 5px;
      }
    `,
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
          title: `${similarEvents.length + 1} events`,
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
