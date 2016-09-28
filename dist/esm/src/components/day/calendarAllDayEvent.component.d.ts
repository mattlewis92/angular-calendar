import { EventEmitter } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
export declare class CalendarAllDayEvent {
    event: CalendarEvent;
    eventClicked: EventEmitter<any>;
}
