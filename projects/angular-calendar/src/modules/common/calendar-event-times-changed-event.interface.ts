import { CalendarEvent } from 'calendar-utils';

export enum CalendarEventTimesChangedEventType {
  Drag = 'drag',
  Drop = 'drop',
  Resize = 'resize',
}

/**
 * The output `$event` type when an event is resized or dragged and dropped.
 */
export interface CalendarEventTimesChangedEvent<MetaType = any> {
  type: CalendarEventTimesChangedEventType;
  event: CalendarEvent<MetaType>;
  newStart: Date;
  newEnd?: Date;
  allDay?: boolean;
}
