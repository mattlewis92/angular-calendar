import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarDateFormatter} from './../providers/calendarDateFormatter.provider';
import {DEFAULT_LOCALE} from './../constants';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDate implements PipeTransform {

  constructor(private dateFormatter: CalendarDateFormatter) {}

  transform(date: Date | Moment, method: string, locale: string = DEFAULT_LOCALE): string {

    date = moment(date).toDate();
    return this.dateFormatter[method]({date, locale});

  }

}