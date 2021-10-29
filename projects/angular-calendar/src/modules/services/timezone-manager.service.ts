import * as moment from 'moment';
import * as MomentTz from 'moment-timezone';
import isAfterFns from 'date-fns/esm/isAfter';
import isBeforeFns from 'date-fns/esm/isBefore';
import { Injectable } from '@angular/core';
import { TimezoneInfo } from './timezone-info.model';

@Injectable({
  providedIn: 'root',
})
export class TimezoneManager {
  private timezoneInfos: Map<string, Map<number, TimezoneInfo>> = new Map(); // timezone info per year per timezone

  /**
   * Returns the date in the current timezone corresponding to the input date in the local timezone
   * Example:
   * - current timezone: +8
   * - local timezone: +2
   * - input: 10:00am
   * - result: 04:00pm
   */
  public reverseTz(date: Date, timezone: string) {
    const localeOffset = date.getTimezoneOffset() * -1;
    const utcOffset = this.getDateOffset(date, timezone);
    const diffOffset = localeOffset - utcOffset;
    return new Date(date.valueOf() + diffOffset * -1 * 60 * 1000);
  }

  private getDateOffset(date: Date, timezone: string): number {
    const year = date.getFullYear();
    let tzInfoPerYear = this.timezoneInfos.get(timezone);
    let tzInfo;
    if (tzInfoPerYear) {
      tzInfo = tzInfoPerYear.get(year);
    } else {
      tzInfoPerYear = new Map();
      this.timezoneInfos.set(timezone, tzInfoPerYear);
    }

    if (!tzInfo) {
      tzInfo = this.computeTimezoneInfo(year, timezone);
      tzInfoPerYear.set(year, tzInfo);
    }

    if (
      tzInfo.hasDST &&
      this.isInDST(date, tzInfo.startOfDST, tzInfo.endOfDST)
    ) {
      return tzInfo.offsetInDST;
    } else {
      return tzInfo.offset;
    }
  }

  /**
   * @param year
   * @param timezone
   * @return the timezone info
   *
   * Algorithm:
   * - Go through the months of the year, and for each month:
   * - If the start and the end of the month have not the same timezone offset then:
   * | - Go through the days of the month, and for each day:
   * | - If the start and the end of the day have not the same timezone offset then:
   * | | - Go through the hours of the day, and for each hour:
   * | | - If the end of the hour has a bigger timezone offset than the beginning then:
   * | | | - This date (year, month, day, hours) is the start of the DST (from winter to summer)
   * | | | - The timezone offset of the end of the hour is the offset of the timezone in the DST
   * | | | - Stop looking for the DST switch in this day
   * | | - Else, if the end of the hour has a smaller timezone offset than the beginning then:
   * | | | - This date (year, month, day, hours) is the end of the DST (from summer to winter)
   * | | | - The timezone offset of the end of the hour is the offset of the timezone out of the DST
   * | | | - Stop looking for the DST switch in this day
   * | | - Stop looking for the DST switch in this month
   * - If the start and the end of the DST have been found, then leave the loop
   *
   * Note:
   * The use of the previousOffset variable allows to handle the DST switches occurring at midnight
   *
   * assumptions:
   * - No double DST switch in the same month
   * - No more than 2 DST switch in a year
   * - All DST switch are done at minute 0
   *
   */
  private computeTimezoneInfo(year: number, timezone: string): TimezoneInfo {
    let startOfDST: moment.Moment = null;
    let endOfDST: moment.Moment = null;
    let offset: number = null;
    let offsetInDST: number = null;

    const startOfYear = MomentTz.tz({ year: year }, timezone);
    const endOfYear = startOfYear.clone().endOf('year');
    const monthCount = endOfYear.diff(startOfYear, 'months') + 1;

    // Iterate through all the months to find the ones containing the DST switch
    let previousOffset = startOfYear.clone().subtract(1, 's').utcOffset();
    for (let month = 0; month < monthCount; month++) {
      const startOfMonth = MomentTz.tz({ year: year, month: month }, timezone);
      const endOfMonth = startOfMonth.clone().endOf('month');
      let offsetDiff =
        startOfMonth.utcOffset() - endOfMonth.utcOffset() ||
        previousOffset - startOfMonth.utcOffset();
      if (offsetDiff != 0) {
        // DST switch occurs during this month
        const dayCount = endOfMonth.clone().diff(startOfMonth, 'days') + 1;

        // Iterate through all the days to find the DST switch day
        for (let day = 1; day <= dayCount; day++) {
          let DSTSwitch = false;
          const startOfDay = startOfMonth.clone().date(day);
          const endOfDay = startOfDay.clone().endOf('day');
          offsetDiff =
            startOfDay.utcOffset() - endOfDay.utcOffset() ||
            previousOffset - startOfDay.utcOffset();
          if (offsetDiff != 0) {
            // a DST switch occurs during this hour
            const hourCount = endOfDay.diff(startOfDay, 'hours') + 1;

            // Iterate through all the hours to find the DST switch
            for (let hour = 0; hour < hourCount; hour++) {
              let startOfHour = startOfDay.clone().hour(hour);
              offsetDiff = previousOffset - startOfHour.utcOffset();

              if (offsetDiff < 0) {
                // switch from winter to summer: start of DST
                startOfDST = startOfHour;
                offset = previousOffset;
                offsetInDST = startOfDST.utcOffset();
                DSTSwitch = true;
              } else if (offsetDiff > 0) {
                // Switch from summer to winter: end of DST
                endOfDST = startOfHour;
                offset = startOfHour.utcOffset();
                offsetInDST = previousOffset;
                DSTSwitch = true;
              }
              previousOffset = startOfHour.clone().endOf('hour').utcOffset();
              if (DSTSwitch) {
                break;
              }
            }
          }
          previousOffset = endOfDay.utcOffset();
          if (DSTSwitch) {
            break;
          }
        }
      }
      previousOffset = endOfMonth.utcOffset();
      if (startOfDST && endOfDST) {
        break;
      }
    }

    return {
      hasDST: !!(startOfDST || endOfDST), // considering the case where we have a start without and end, or end without start (removing a DST or adding a DST)
      startOfDST: startOfDST ? startOfDST.toDate() : null,
      endOfDST: endOfDST ? endOfDST.toDate() : null,
      offset: offset || startOfYear.utcOffset(),
      offsetInDST: offsetInDST,
    };
  }

  private isInDST(date: Date, startOfDST: Date, endOfDST: Date): boolean {
    if (startOfDST && endOfDST) {
      return isAfterFns(date, startOfDST) && isBeforeFns(date, endOfDST);
    } else if (startOfDST && !endOfDST) {
      return isAfterFns(date, startOfDST);
    } else if (!startOfDST && endOfDST) {
      return isBeforeFns(date, endOfDST);
    }
    return false;
  }
}
