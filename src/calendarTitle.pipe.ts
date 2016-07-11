import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'calendarTitle'
})
export class CalendarTitle implements PipeTransform {

  transform(viewDate: Date, view: string): string {

    switch (view) {
      case 'month':
        return moment(viewDate).format('MMMM YYYY');

      case 'week':
        return moment(viewDate).format('[Week] W [of] YYYY');

      case 'day':
        return moment(viewDate).format('dddd D MMMM, YYYY');

      default:
        return '';
    }

  }

}