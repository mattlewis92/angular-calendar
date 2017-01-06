import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { CalendarDateFormatter } from './../providers/calendarDateFormatter.provider';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDatePipe implements PipeTransform {

  /**
   * @hidden
   */
  constructor(private dateFormatter: CalendarDateFormatter, @Inject(LOCALE_ID) private locale: string) {}

  /**
   * @hidden
   */
  transform(date: Date, method: string, locale: string = this.locale): string {
    return this.dateFormatter[method]({date, locale});
  }

}