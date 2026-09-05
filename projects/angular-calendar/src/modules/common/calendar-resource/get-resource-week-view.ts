import {
  CalendarEvent,
  getEventsInPeriod,
  getWeekViewHeader,
} from 'calendar-utils';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import {
  CalendarResource,
  GetResourceWeekViewArgs,
  ResourceWeekView,
  ResourceWeekViewRowColumn,
  ResourcesMaxRowNumber,
  ResourcesMaxRowsNumber,
} from './calendar-resource.interface';

function sanitiseHours(hours: number): number {
  return Math.max(Math.min(23, hours), 0);
}

function sanitiseMinutes(minutes: number): number {
  return Math.max(Math.min(59, minutes), 0);
}

function getResourceDayEvents(
  dateAdapter: DateAdapter,
  events: CalendarEvent[],
  viewDate: Date,
  dayStart: { hour: number; minute: number },
  dayEnd: { hour: number; minute: number },
): CalendarEvent[] {
  const startOfView = dateAdapter.setMinutes(
    dateAdapter.setHours(
      dateAdapter.startOfDay(viewDate),
      sanitiseHours(dayStart.hour),
    ),
    sanitiseMinutes(dayStart.minute),
  );
  const endOfView = dateAdapter.setMinutes(
    dateAdapter.setHours(
      dateAdapter.startOfMinute(dateAdapter.endOfDay(viewDate)),
      sanitiseHours(dayEnd.hour),
    ),
    sanitiseMinutes(dayEnd.minute),
  );
  endOfView.setSeconds(59, 999);

  return getEventsInPeriod(dateAdapter, {
    events,
    periodStart: startOfView,
    periodEnd: endOfView,
  }).sort((eventA, eventB) => eventA.start.valueOf() - eventB.start.valueOf());
}

function getResourceWeekViewRowColumns(
  dateAdapter: DateAdapter,
  {
    events,
    resources,
    viewDate,
    dayStart,
    dayEnd,
    weekStartsOn,
    excluded,
    weekendDays,
    segmentHeight,
    viewStart,
    viewEnd,
    keepUnassignedEvents,
    unassignedRessourceName,
  }: {
    events: CalendarEvent[];
    resources: CalendarResource[];
    viewDate: Date;
    dayStart: { hour: number; minute: number };
    dayEnd: { hour: number; minute: number };
    weekStartsOn: number;
    excluded: number[];
    weekendDays?: number[];
    segmentHeight: number;
    viewStart: Date;
    viewEnd: Date;
    keepUnassignedEvents: boolean;
    unassignedRessourceName: string;
  },
  setResourcesMaxRowsNumber: (result: ResourcesMaxRowsNumber) => void,
): ResourceWeekViewRowColumn[] {
  const weekDays = getWeekViewHeader(dateAdapter, {
    viewDate,
    weekStartsOn,
    excluded,
    weekendDays,
    viewStart,
    viewEnd,
  });

  const resourcesMaxRowsNumber: ResourcesMaxRowNumber[] = [];

  return weekDays.map((day) => {
    const dayEvents = getResourceDayEvents(
      dateAdapter,
      events,
      day.date,
      dayStart,
      dayEnd,
    );

    const mappedEvents = (calendarEvents: CalendarEvent[]) =>
      calendarEvents.map((event, index) => ({
        event,
        height: segmentHeight,
        left: 0,
        width: 100,
        top: index * segmentHeight,
      }));

    const accumulatePreviousContainerCountsByIndex = (
      currentContainerIndex: number,
    ) => {
      let count = 0;
      for (let k = 0; k < currentContainerIndex; k++) {
        count += resourcesMaxRowsNumber[k].count;
      }
      return count;
    };

    const unknownResource = {
      id: undefined,
      name: unassignedRessourceName,
    } as unknown as CalendarResource;
    const combinedResourceList = keepUnassignedEvents
      ? [...resources, unknownResource]
      : resources;

    const eventsGroupedByResource = combinedResourceList.map(
      (resource, resourceIndex) => {
        const filterClosure =
          resource.id !== undefined
            ? (event: CalendarEvent) =>
                event.resources?.some(
                  (oneResource) => oneResource.id === resource.id,
                )
            : (event: CalendarEvent) =>
                !event.resources || event.resources.length === 0;

        const filteredEvents = dayEvents.filter(filterClosure);

        const resourcesMaxRowsNumberItem =
          resourcesMaxRowsNumber[resourceIndex];
        const isCountGreaterThanPrevious =
          !!resourcesMaxRowsNumberItem &&
          resourcesMaxRowsNumberItem.count >= filteredEvents.length;
        const newCount = isCountGreaterThanPrevious
          ? resourcesMaxRowsNumberItem.count
          : filteredEvents.length;

        resourcesMaxRowsNumber[resourceIndex] = {
          ...resourcesMaxRowsNumberItem,
          count: newCount + (resourceIndex >= 0 && newCount === 0 ? 1 : 0),
          resource,
          top:
            accumulatePreviousContainerCountsByIndex(resourceIndex) *
            segmentHeight,
        };

        return {
          resource,
          resourceCurrentDayEventNumber: filteredEvents.length,
          events: mappedEvents(filteredEvents),
        };
      },
    );

    setResourcesMaxRowsNumber(
      resourcesMaxRowsNumber as unknown as ResourcesMaxRowsNumber,
    );

    return {
      date: day.date,
      eventsGroupedByResource,
    };
  });
}

export function getResourceWeekView(
  dateAdapter: DateAdapter,
  {
    events = [],
    resources = [],
    viewDate,
    weekStartsOn,
    excluded = [],
    hourSegments,
    dayStart,
    dayEnd,
    weekendDays,
    segmentHeight,
    viewStart = dateAdapter.startOfWeek(viewDate, { weekStartsOn }),
    viewEnd = dateAdapter.endOfWeek(viewDate, { weekStartsOn }),
    keepUnassignedEvents = true,
    unassignedRessourceName = 'Unassigned',
  }: GetResourceWeekViewArgs,
): ResourceWeekView {
  viewStart = dateAdapter.startOfDay(viewStart);
  viewEnd = dateAdapter.endOfDay(viewEnd);

  const eventsInPeriod = getEventsInPeriod(dateAdapter, {
    events,
    periodStart: viewStart,
    periodEnd: viewEnd,
  });

  const header = getWeekViewHeader(dateAdapter, {
    viewDate,
    weekStartsOn,
    excluded,
    weekendDays,
    viewStart,
    viewEnd,
  });

  let resourcesMaxRowsNumber: ResourcesMaxRowsNumber = {};

  const rowColumns = getResourceWeekViewRowColumns(
    dateAdapter,
    {
      events,
      resources,
      viewDate,
      dayStart,
      dayEnd,
      weekStartsOn,
      excluded,
      weekendDays,
      segmentHeight,
      viewStart,
      viewEnd,
      keepUnassignedEvents,
      unassignedRessourceName,
    },
    (result) => {
      resourcesMaxRowsNumber = result;
    },
  );

  return {
    period: {
      events: eventsInPeriod,
      start: header[0].date,
      end: dateAdapter.endOfDay(header[header.length - 1].date),
    },
    rowColumns,
    resourcesMaxRowsNumber,
  };
}
