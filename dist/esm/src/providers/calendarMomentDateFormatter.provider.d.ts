import { OpaqueToken } from '@angular/core';
import { CalendarDateFormatterInterface, DateFormatterParams } from './../interfaces/calendarDateFormatter.interface';
export declare const MOMENT: OpaqueToken;
export declare class CalendarMomentDateFormatter implements CalendarDateFormatterInterface {
    private moment;
    constructor(moment: any);
    monthViewColumnHeader({date, locale}: DateFormatterParams): string;
    monthViewDayNumber({date, locale}: DateFormatterParams): string;
    monthViewTitle({date, locale}: DateFormatterParams): string;
    weekViewColumnHeader({date, locale}: DateFormatterParams): string;
    weekViewColumnSubHeader({date, locale}: DateFormatterParams): string;
    weekViewTitle({date, locale}: DateFormatterParams): string;
    dayViewHour({date, locale}: DateFormatterParams): string;
    dayViewTitle({date, locale}: DateFormatterParams): string;
}
