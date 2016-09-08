import {Pipe, PipeTransform, LOCALE_ID, Inject} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarDateFormatter} from './../providers/calendarDateFormatter.provider';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDate implements PipeTransform {

  constructor(private dateFormatter: CalendarDateFormatter, @Inject(LOCALE_ID) private locale: string) {}

  transform(date: Date | Moment, method: string, locale: string = this.locale): string {

    date = moment(date).toDate();
    return this.dateFormatter[method]({date, locale});

  }

}