import { CalendarEvent, WeekViewTimeEvent, WeekViewHour, WeekViewHourSegment, ViewPeriod, WeekDay, WeekViewAllDayEvent } from 'calendar-utils';
import { DateAdapter } from '../../date-adapters/date-adapter';
export declare const validateEvents: (events: CalendarEvent<any>[]) => boolean;
export declare function isInside(outer: ClientRect, inner: ClientRect): boolean;
export declare function roundToNearest(amount: number, precision: number): number;
export declare const trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
export declare const trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
export declare const trackByHourSegment: (index: number, segment: WeekViewHourSegment) => string;
export declare const trackByHour: (index: number, hour: WeekViewHour) => string;
export declare const trackByWeekAllDayEvent: (index: number, weekEvent: WeekViewAllDayEvent) => string | number | CalendarEvent<any>;
export declare const trackByWeekTimeEvent: (index: number, weekEvent: WeekViewTimeEvent) => string | number | CalendarEvent<any>;
export declare function getMinutesMoved(movedY: number, hourSegments: number, hourSegmentHeight: number, eventSnapSize: number): number;
export declare function getMinimumEventHeightInMinutes(hourSegments: number, hourSegmentHeight: number): number;
export declare function getDefaultEventEnd(dateAdapter: DateAdapter, event: CalendarEvent, minimumMinutes: number): Date;
export declare function addDaysWithExclusions(dateAdapter: DateAdapter, date: Date, days: number, excluded: number[]): Date;
export declare function isDraggedWithinPeriod(newStart: Date, newEnd: Date, period: ViewPeriod): boolean;
export declare function shouldFireDroppedEvent(dropEvent: {
    dropData?: {
        event?: CalendarEvent;
        calendarId?: symbol;
    };
}, date: Date, allDay: boolean, calendarId: symbol): boolean;
export declare function getWeekViewPeriod(dateAdapter: DateAdapter, viewDate: Date, weekStartsOn: number, excluded?: number[], daysInWeek?: number): {
    viewStart: Date;
    viewEnd: Date;
};
export declare function isWithinThreshold({ x, y }: {
    x: number;
    y: number;
}): boolean;
