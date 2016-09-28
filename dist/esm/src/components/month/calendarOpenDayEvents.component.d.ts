import { EventEmitter } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
export declare class CalendarOpenDayEvents {
    isOpen: boolean;
    events: CalendarEvent[];
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
}
