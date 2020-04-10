import { TemplateRef } from '@angular/core';
import { WeekViewHourSegment } from 'calendar-utils';
export declare class CalendarWeekViewHourSegmentComponent {
    segment: WeekViewHourSegment;
    segmentHeight: number;
    locale: string;
    isTimeLabel: boolean;
    daysInWeek: number;
    customTemplate: TemplateRef<any>;
}
