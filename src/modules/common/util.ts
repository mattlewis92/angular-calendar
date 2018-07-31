import {
  CalendarEvent,
  DayViewEvent,
  DayViewHour,
  DayViewHourSegment,
  validateEvents as validateEventsWithoutLog,
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
    Math.ceil(outer.left) <= Math.ceil(inner.left) &&
    Math.ceil(inner.left) <= Math.ceil(outer.right) &&
    Math.ceil(outer.left) <= Math.ceil(inner.right) &&
    Math.ceil(inner.right) <= Math.ceil(outer.right) &&
    Math.ceil(outer.top) <= Math.ceil(inner.top) &&
    Math.ceil(inner.top) <= Math.ceil(outer.bottom) &&
    Math.ceil(outer.top) <= Math.ceil(inner.bottom) &&
    Math.ceil(inner.bottom) <= Math.ceil(outer.bottom)
  );
}

export function roundToNearest(amount: number, precision: number) {
  return Math.round(amount / precision) * precision;
}

export const trackByEventId = (index: number, event: CalendarEvent) =>
  event.id ? event.id : event;

export const trackByWeekDayHeaderDate = (index: number, day: WeekDay) =>
  day.date.toISOString();

export const trackByIndex = (index: number) => index;

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
  return (MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight)) * 30;
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
