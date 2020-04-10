import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewAllDayEvent, WeekViewTimeEvent, WeekViewHourColumn } from 'calendar-utils';
import { PlacementArray } from 'positioning';
export declare class CalendarWeekViewEventComponent {
    locale: string;
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent;
    tooltipPlacement: PlacementArray;
    tooltipAppendToBody: boolean;
    tooltipDisabled: boolean;
    tooltipDelay: number | null;
    customTemplate: TemplateRef<any>;
    eventTitleTemplate: TemplateRef<any>;
    eventActionsTemplate: TemplateRef<any>;
    tooltipTemplate: TemplateRef<any>;
    column: WeekViewHourColumn;
    daysInWeek: number;
    eventClicked: EventEmitter<{
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
}
