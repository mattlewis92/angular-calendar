import { TemplateRef, EventEmitter } from '@angular/core';
import { WeekDay } from 'calendar-utils';
export declare class CalendarMonthViewHeaderComponent {
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    columnHeaderClicked: EventEmitter<{
        isoDayNumber: number;
        sourceEvent: MouseEvent;
    }>;
    trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
}
