import { OnChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CalendarEvent, DayView, DayViewHour } from 'calendar-utils';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
export declare class CalendarDayView implements OnChanges {
    private cdr;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     */
    events: CalendarEvent[];
    /**
     * The number of segments in an hour. Must be <= 6
     */
    hourSegments: number;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     */
    dayStartHour: number;
    /**
     * The day start minutes. Must be 0-59
     */
    dayStartMinute: number;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     */
    dayEndHour: number;
    /**
     * The day end minutes. Must be 0-59
     */
    dayEndMinute: number;
    /**
     * The width in pixels of each event on the view
     */
    eventWidth: number;
    /**
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * A function that will be called before each hour segment is called. The first argument will contain the hour segment.
     * If you add the `cssClass` property to the segment it will add that class to the hour segment in the template
     */
    hourSegmentModifier: Function;
    /**
     * Called when an event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    /**
     * Called when an hour segment is clicked
     */
    hourSegmentClicked: EventEmitter<{
        date: Date;
    }>;
    hours: DayViewHour[];
    view: DayView;
    width: number;
    refreshSubscription: Subscription;
    constructor(cdr: ChangeDetectorRef, locale: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: any): void;
    private refreshHourGrid();
    private refreshView();
    private refreshAll();
}
