import {Pipe, PipeTransform} from '@angular/core';
import {CalendarDate} from './calendarDate.pipe';

@Pipe({
  name: 'calendarTitle'
})
export class CalendarTitle implements PipeTransform {

  constructor(private calendarDatePipe: CalendarDate) {}

  transform(viewDate: Date, view: string): string {
    return this.calendarDatePipe.transform(viewDate, `${view}ViewTitle`);
  }

}