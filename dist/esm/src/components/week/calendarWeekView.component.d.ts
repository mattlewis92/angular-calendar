import { EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WeekDay, CalendarEvent, WeekViewEventRow } from 'calendar-utils';
export declare class CalendarWeekView implements OnChanges, OnInit, OnDestroy {
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
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * The placement of the event tooltip
     */
    tooltipPlacement: string;
    /**
     * The start number of the week
     */
    weekStartsOn: number;
    /**
     * Called when a header week day is clicked
     */
    dayClicked: EventEmitter<{
        date: Date;
    }>;
    /**
     * Called when the event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    days: WeekDay[];
    eventRows: WeekViewEventRow[];
    refreshSubscription: Subscription;
    constructor(cdr: ChangeDetectorRef, locale: string);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    private refreshHeader();
    private refreshBody();
    private refreshAll();
}
