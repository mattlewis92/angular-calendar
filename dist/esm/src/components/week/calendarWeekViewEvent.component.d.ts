import { EventEmitter } from '@angular/core';
import { WeekViewEvent } from 'calendar-utils';
export declare class CalendarWeekViewEvent {
    weekEvent: WeekViewEvent;
    tooltipPlacement: string;
    eventClicked: EventEmitter<any>;
}
