import { CalendarDateFormatterInterface, DateFormatterParams } from './../interfaces/calendarDateFormatter.interface';
export declare class CalendarNativeDateFormatter implements CalendarDateFormatterInterface {
    monthViewColumnHeader({date, locale}: DateFormatterParams): string;
    monthViewDayNumber({date, locale}: DateFormatterParams): string;
    monthViewTitle({date, locale}: DateFormatterParams): string;
    weekViewColumnHeader({date, locale}: DateFormatterParams): string;
    weekViewColumnSubHeader({date, locale}: DateFormatterParams): string;
    weekViewTitle({date, locale}: DateFormatterParams): string;
    dayViewHour({date, locale}: DateFormatterParams): string;
    dayViewTitle({date, locale}: DateFormatterParams): string;
}
