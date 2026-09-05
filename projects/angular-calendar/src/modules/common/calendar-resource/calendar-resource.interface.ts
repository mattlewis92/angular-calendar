import { CalendarEvent } from 'calendar-utils';

export type CalendarResourceIdType = string | number;

export interface CalendarResource<CalendarResourceMetaType = any> {
  id: CalendarResourceIdType;
  name: string;
  meta?: CalendarResourceMetaType;
}

export interface ResourcesMaxRowNumber<CalendarResourceMetaType = any> {
  count: number;
  resource: CalendarResource<CalendarResourceMetaType>;
  top: number;
}

export interface ResourcesMaxRowsNumber<CalendarResourceMetaType = any> {
  [index: number]: ResourcesMaxRowNumber<CalendarResourceMetaType>;
}

export interface ResourceWeekViewRowEvent<EventMetaType = any> {
  event: CalendarEvent<EventMetaType>;
  height: number;
  width: number;
  top: number;
  left: number;
}

export interface ResourceWeekViewRowEventContainer<
  EventMetaType = any,
  ResourceMetaType = any,
> {
  resource: CalendarResource<ResourceMetaType>;
  resourceCurrentDayEventNumber: number;
  events: ResourceWeekViewRowEvent<EventMetaType>[];
}

export interface ResourceWeekViewRowColumn<
  EventMetaType = any,
  ResourceMetaType = any,
> {
  date: Date;
  eventsGroupedByResource: ResourceWeekViewRowEventContainer<
    EventMetaType,
    ResourceMetaType
  >[];
}

export interface ResourceWeekViewRowSegment {
  isStart?: boolean;
  date?: Date;
  cssClass?: string;
}

export interface ResourceWeekView<EventMetaType = any, ResourceMetaType = any> {
  period: {
    start: Date;
    end: Date;
    events: CalendarEvent<EventMetaType>[];
  };
  rowColumns: ResourceWeekViewRowColumn<EventMetaType, ResourceMetaType>[];
  resourcesMaxRowsNumber: ResourcesMaxRowsNumber;
}

export interface GetResourceWeekViewArgs {
  events?: CalendarEvent[];
  resources: CalendarResource[];
  viewDate: Date;
  weekStartsOn: number;
  excluded?: number[];
  precision?: 'minutes' | 'days';
  absolutePositionedEvents?: boolean;
  hourSegments?: number;
  dayStart: { hour: number; minute: number };
  dayEnd: { hour: number; minute: number };
  weekendDays?: number[];
  segmentHeight: number;
  viewStart?: Date;
  viewEnd?: Date;
  minimumEventHeight?: number;
  keepUnassignedEvents?: boolean;
  unassignedRessourceName?: string;
}

declare module 'calendar-utils' {
  interface CalendarEvent<MetaType = any> {
    resources?: CalendarResource[];
  }
}
