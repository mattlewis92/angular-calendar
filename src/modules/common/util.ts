import {
  CalendarEvent,
  DayViewHour,
  DayViewHourSegment,
  validateEvents as validateEventsWithoutLog,
  WeekDay
} from 'calendar-utils';
import { DateAdapter } from '../../date-adapters/date-adapter';

export const validateEvents = (events: CalendarEvent[]) => {
  const warn = (...args) => console.warn('angular-calendar', ...args);
  return validateEventsWithoutLog(events, warn);
};

export function isInside(outer: ClientRect, inner: ClientRect): boolean {
  return (
    Math.round(outer.left) <= Math.round(inner.left) &&
    Math.round(inner.left) <= Math.round(outer.right) &&
    Math.round(outer.left) <= Math.round(inner.right) &&
    Math.round(inner.right) <= Math.round(outer.right) &&
    Math.round(outer.top) <= Math.round(inner.top) &&
    Math.round(inner.top) <= Math.round(outer.bottom) &&
    Math.round(outer.top) <= Math.round(inner.bottom) &&
    Math.round(inner.bottom) <= Math.round(outer.bottom)
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

export function getDefaultEventEnd(
  dateAdapter: DateAdapter,
  event: CalendarEvent,
  hourSegments: number,
  hourSegmentHeight: number
): Date {
  if (event.end) {
    return event.end;
  } else {
    const pixelAmountInMinutes =
      MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight);
    return dateAdapter.addMinutes(event.start, 30 * pixelAmountInMinutes);
  }
}
