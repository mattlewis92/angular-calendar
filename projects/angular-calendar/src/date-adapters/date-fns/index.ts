import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/date-fns';
import * as addWeeks from 'date-fns/add_weeks/index';
import * as addMonths from 'date-fns/add_months/index';
import * as subDays from 'date-fns/sub_days/index';
import * as subWeeks from 'date-fns/sub_weeks/index';
import * as subMonths from 'date-fns/sub_months/index';
import * as getISOWeek from 'date-fns/get_iso_week/index';
import * as setDate from 'date-fns/set_date/index';
import * as setMonth from 'date-fns/set_month/index';
import * as setYear from 'date-fns/set_year/index';
import * as getDate from 'date-fns/get_date/index';
import * as getYear from 'date-fns/get_year/index';
import { DateAdapter } from '../date-adapter';

export function adapterFactory(): DateAdapter {
  return {
    ...baseAdapterFactory(),
    addWeeks,
    addMonths,
    subDays,
    subWeeks,
    subMonths,
    getISOWeek,
    setDate,
    setMonth,
    setYear,
    getDate,
    getYear
  };
}
