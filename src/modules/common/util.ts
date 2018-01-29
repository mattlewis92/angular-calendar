import {
  CalendarEvent,
  validateEvents as validateEventsWithoutLog,
  WeekDay
} from 'calendar-utils';

export const validateEvents = (events: CalendarEvent[]) => {
  const warn = (...args) => console.warn('angular-calendar', ...args);
  return validateEventsWithoutLog(events, warn);
};

export function isInside(outer: ClientRect, inner: ClientRect): boolean {
  return (
    outer.left <= inner.left &&
    inner.left <= outer.right &&
    outer.left <= inner.right &&
    inner.right <= outer.right &&
    outer.top <= inner.top &&
    inner.top <= outer.bottom &&
    outer.top <= inner.bottom &&
    inner.bottom <= outer.bottom
  );
}

export const trackByEventId = (index: number, event: CalendarEvent) =>
  event.id ? event.id : event;

export const trackByWeekDayHeaderDate = (index: number, day: WeekDay) =>
  day.date.toISOString();

export const trackByIndex = (index: number) => index;
