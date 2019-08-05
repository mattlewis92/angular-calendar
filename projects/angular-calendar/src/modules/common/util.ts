import {
  CalendarEvent,
  DayViewEvent,
  DayViewHour,
  DayViewHourSegment,
  validateEvents as validateEventsWithoutLog,
  ViewPeriod,
  WeekDay,
  WeekViewAllDayEvent
} from 'calendar-utils';
import { DateAdapter } from '../../date-adapters/date-adapter';

export const validateEvents = (events: CalendarEvent[]) => {
  const warn = (...args) => console.warn('angular-calendar', ...args);
  return validateEventsWithoutLog(events, warn);
};

export function isInside(outer: ClientRect, inner: ClientRect): boolean {
  return (
    Math.floor(outer.left) <= Math.ceil(inner.left) &&
    Math.floor(inner.left) <= Math.ceil(outer.right) &&
    Math.floor(outer.left) <= Math.ceil(inner.right) &&
    Math.floor(inner.right) <= Math.ceil(outer.right) &&
    Math.floor(outer.top) <= Math.ceil(inner.top) &&
    Math.floor(inner.top) <= Math.ceil(outer.bottom) &&
    Math.floor(outer.top) <= Math.ceil(inner.bottom) &&
    Math.floor(inner.bottom) <= Math.ceil(outer.bottom)
  );
}

export function roundToNearest(amount: number, precision: number) {
  return Math.round(amount / precision) * precision;
}

export const trackByEventId = (index: number, event: CalendarEvent) =>
  event.id ? event.id : event;

export const trackByWeekDayHeaderDate = (index: number, day: WeekDay) =>
  day.date.toISOString();

export const trackByHourSegment = (
  index: number,
  segment: DayViewHourSegment
) => segment.date.toISOString();

export const trackByHour = (index: number, hour: DayViewHour) =>
  hour.segments[0].date.toISOString();

export const trackByDayOrWeekEvent = (
  index: number,
  weekEvent: WeekViewAllDayEvent | DayViewEvent
) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);

const MINUTES_IN_HOUR = 60;

export function getMinutesMoved(
  movedY: number,
  hourSegments: number,
  hourSegmentHeight: number,
  eventSnapSize: number
): number {
  const draggedInPixelsSnapSize = roundToNearest(
    movedY,
    eventSnapSize || hourSegmentHeight
  );
  const pixelAmountInMinutes =
    MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight);
  return draggedInPixelsSnapSize * pixelAmountInMinutes;
}

export function getMinimumEventHeightInMinutes(
  hourSegments: number,
  hourSegmentHeight: number
) {
  return (
    (MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight)) * hourSegmentHeight
  );
}

export function getDefaultEventEnd(
  dateAdapter: DateAdapter,
  event: CalendarEvent,
  minimumMinutes: number
): Date {
  if (event.end) {
    return event.end;
  } else {
    return dateAdapter.addMinutes(event.start, minimumMinutes);
  }
}

export function addDaysWithExclusions(
  dateAdapter: DateAdapter,
  date: Date,
  days: number,
  excluded: number[]
): Date {
  let daysCounter = 0;
  let daysToAdd = 0;
  const changeDays = days < 0 ? dateAdapter.subDays : dateAdapter.addDays;
  let result = date;
  while (daysToAdd <= Math.abs(days)) {
    result = changeDays(date, daysCounter);
    const day = dateAdapter.getDay(result);
    if (excluded.indexOf(day) === -1) {
      daysToAdd++;
    }
    daysCounter++;
  }
  return result;
}

export function isDraggedWithinPeriod(
  newStart: Date,
  newEnd: Date,
  period: ViewPeriod
): boolean {
  const end = newEnd || newStart;
  return (
    (period.start <= newStart && newStart <= period.end) ||
    (period.start <= end && end <= period.end)
  );
}

export function shouldFireDroppedEvent(
  dropEvent: { dropData?: { event?: CalendarEvent; calendarId?: symbol } },
  date: Date,
  allDay: boolean,
  calendarId: symbol
) {
  return (
    dropEvent.dropData &&
    dropEvent.dropData.event &&
    (dropEvent.dropData.calendarId !== calendarId ||
      (dropEvent.dropData.event.allDay && !allDay) ||
      (!dropEvent.dropData.event.allDay && allDay))
  );
}

export function getWeekViewPeriod(
  dateAdapter: DateAdapter,
  viewDate: Date,
  weekStartsOn: number,
  excluded: number[] = [],
  daysInWeek?: number
): { viewStart: Date; viewEnd: Date } {
  let viewStart = daysInWeek
    ? dateAdapter.startOfDay(viewDate)
    : dateAdapter.startOfWeek(viewDate, { weekStartsOn });
  if (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1) {
    viewStart = dateAdapter.subDays(
      addDaysWithExclusions(dateAdapter, viewStart, 1, excluded),
      1
    );
  }
  if (daysInWeek) {
    const viewEnd = dateAdapter.endOfDay(
      addDaysWithExclusions(dateAdapter, viewStart, daysInWeek - 1, excluded)
    );
    return { viewStart, viewEnd };
  } else {
    let viewEnd = dateAdapter.endOfWeek(viewDate, { weekStartsOn });
    if (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1) {
      viewEnd = dateAdapter.addDays(
        addDaysWithExclusions(dateAdapter, viewEnd, -1, excluded),
        1
      );
    }
    return { viewStart, viewEnd };
  }
}

export function isWithinThreshold({ x, y }: { x: number; y: number }) {
  const DRAG_THRESHOLD = 1;
  return Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
}
