import * as moment from 'moment';
import {CalendarEvent} from 'calendar-utils';

export class CalendarConfig {

  dateFormatter: 'angular' | 'moment' = 'angular';

  dateFormats: any = {
    month: {
      columnHeader: {
        angular: 'EEEE',
        moment: 'dddd'
      },
      dayNumber: {
        angular: 'd',
        moment: 'D'
      },
      title: {
        angular: 'MMMM y',
        moment: 'MMMM YYYY'
      }
    },
    week: {
      columnHeader: {
        angular: 'EEEE',
        moment: 'dddd'
      },
      columnSubHeader: {
        angular: 'd MMM',
        moment: 'D MMM'
      },
      title: {
        angular: 'Week W of yyyy',
        moment: '[Week] W [of] YYYY'
      }
    },
    day: {
      title: {
        angular: 'EEEE d MMMM, yyyy',
        moment: 'dddd D MMMM, YYYY'
      },
      hour: {
        angular: 'ha',
        moment: 'ha'
      }
    }
  };

  eventTitles: any = {
    month(event: CalendarEvent): string {
      return event.title;
    },
    week(event: CalendarEvent): string {
      return event.title;
    },
    day(event: CalendarEvent): string {
      return event.title;
    }
  };

}