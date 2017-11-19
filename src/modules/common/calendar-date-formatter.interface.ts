/**
 * The parameter type passed to the date formatter methods.
 */
export interface DateFormatterParams {
  /**
   * The date to format.
   */
  date: Date;

  /**
   * The users preferred locale.
   */
  locale?: string;
}

/**
 * If using a completely custom date formatter then it should implement this interface.
 */
export interface CalendarDateFormatterInterface {
  /**
   * The month view header week day labels
   */
  monthViewColumnHeader({ date: Date }: DateFormatterParams): string;

  /**
   * The month view cell day number
   */
  monthViewDayNumber({ date: Date }: DateFormatterParams): string;

  /**
   * The month view title
   */
  monthViewTitle({ date: Date }: DateFormatterParams): string;

  /**
   * The week view header week day labels
   */
  weekViewColumnHeader({ date: Date }: DateFormatterParams): string;

  /**
   * The week view sub header day and month labels
   */
  weekViewColumnSubHeader({ date: Date }: DateFormatterParams): string;

  /**
   * The week view title
   */
  weekViewTitle({ date: Date }: DateFormatterParams): string;

  /**
   * The time formatting down the left hand side of the day view
   */
  dayViewHour({ date: Date }: DateFormatterParams): string;

  /**
   * The day view title
   */
  dayViewTitle({ date: Date }: DateFormatterParams): string;
}
