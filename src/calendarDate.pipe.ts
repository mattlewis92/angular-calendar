import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarDateFormatter} from './calendarDateFormatter.provider';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDate implements PipeTransform {

  constructor(private dateFormatter: CalendarDateFormatter) {}

  transform(date: Date | Moment, method: string): string {

    date = moment(date).toDate();
    return this.dateFormatter[method]({date});

  }

}