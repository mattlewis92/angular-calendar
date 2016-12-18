import { CalendarEvent } from 'calendar-utils';

export interface CalendarEventTimesChangedEvent {
  event: CalendarEvent;
  newStart: Date;
  newEnd?: Date;
}