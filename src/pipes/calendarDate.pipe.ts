import {Pipe, PipeTransform, LOCALE_ID, Inject} from '@angular/core';
import {CalendarDateFormatter} from './../providers/calendarDateFormatter.provider';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDate implements PipeTransform {

  constructor(private dateFormatter: CalendarDateFormatter, @Inject(LOCALE_ID) private locale: string) {}

  transform(date: Date, method: string, locale: string = this.locale): string {
    return this.dateFormatter[method]({date, locale});
  }

}