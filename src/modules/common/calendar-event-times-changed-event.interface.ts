import { CalendarEvent } from 'calendar-utils';

/**
 * The output `$event` type when an event is resized or dragged and dropped.
 */
export interface CalendarEventTimesChangedEvent<MetaType = any> {
  event: CalendarEvent<MetaType>;
  newStart: Date;
  newEnd?: Date;
}
