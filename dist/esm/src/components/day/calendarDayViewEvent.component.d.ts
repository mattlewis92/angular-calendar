import { EventEmitter } from '@angular/core';
import { DayViewEvent } from 'calendar-utils';
export declare class CalendarDayViewEvent {
    dayEvent: DayViewEvent;
    eventClicked: EventEmitter<any>;
}
