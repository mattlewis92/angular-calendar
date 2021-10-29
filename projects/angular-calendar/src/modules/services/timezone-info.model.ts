/**
 * Used by the angular-calendar to handle the date with the timezone
 * The ECMA Date is used instead of Moment to have better performance
 */

export interface TimezoneInfo {
  hasDST: boolean;
  startOfDST: Date;
  endOfDST: Date;
  offset: number; //offset out of DST;
  offsetInDST: number;
}
