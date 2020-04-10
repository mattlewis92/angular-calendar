import { NgZone, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DateAdapter } from '../../date-adapters/date-adapter';
export declare class CalendarWeekViewCurrentTimeMarkerComponent implements OnChanges {
    private dateAdapter;
    private zone;
    columnDate: Date;
    dayStartHour: number;
    dayStartMinute: number;
    dayEndHour: number;
    dayEndMinute: number;
    hourSegments: number;
    hourSegmentHeight: number;
    customTemplate: TemplateRef<any>;
    private columnDate$;
    marker$: Observable<{
        isVisible: boolean;
        top: number;
    }>;
    constructor(dateAdapter: DateAdapter, zone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
}
