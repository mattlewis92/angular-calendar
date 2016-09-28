export interface DateFormatterParams {
    date: Date;
    locale?: string;
}
export interface CalendarDateFormatterInterface {
    monthViewColumnHeader({date: Date}: DateFormatterParams): string;
    monthViewDayNumber({date: Date}: DateFormatterParams): string;
    monthViewTitle({date: Date}: DateFormatterParams): string;
    weekViewColumnHeader({date: Date}: DateFormatterParams): string;
    weekViewColumnSubHeader({date: Date}: DateFormatterParams): string;
    weekViewTitle({date: Date}: DateFormatterParams): string;
    dayViewHour({date: Date}: DateFormatterParams): string;
    dayViewTitle({date: Date}: DateFormatterParams): string;
}
