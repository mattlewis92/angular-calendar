import { CalendarDateFormatterInterface, DateFormatterParams } from './calendar-date-formatter.interface';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
export declare class CalendarAngularDateFormatter implements CalendarDateFormatterInterface {
    protected dateAdapter: DateAdapter;
    constructor(dateAdapter: DateAdapter);
    /**
     * The month view header week day labels
     */
    monthViewColumnHeader({ date, locale }: DateFormatterParams): string;
    /**
     * The month view cell day number
     */
    monthViewDayNumber({ date, locale }: DateFormatterParams): string;
    /**
     * The month view title
     */
    monthViewTitle({ date, locale }: DateFormatterParams): string;
    /**
     * The week view header week day labels
     */
    weekViewColumnHeader({ date, locale }: DateFormatterParams): string;
    /**
     * The week view sub header day and month labels
     */
    weekViewColumnSubHeader({ date, locale, }: DateFormatterParams): string;
    /**
     * The week view title
     */
    weekViewTitle({ date, locale, weekStartsOn, excludeDays, daysInWeek, }: DateFormatterParams): string;
    /**
     * The time formatting down the left hand side of the week view
     */
    weekViewHour({ date, locale }: DateFormatterParams): string;
    /**
     * The time formatting down the left hand side of the day view
     */
    dayViewHour({ date, locale }: DateFormatterParams): string;
    /**
     * The day view title
     */
    dayViewTitle({ date, locale }: DateFormatterParams): string;
}
