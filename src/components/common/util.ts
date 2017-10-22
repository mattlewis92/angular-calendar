import {
  CalendarEvent,
  validateEvents as validateEventsWithoutLog
} from 'calendar-utils';

export const validateEvents = (events: CalendarEvent[]) => {
  const warn = (...args) => console.warn('angular-calendar', ...args);
  return validateEventsWithoutLog(events, warn);
};
