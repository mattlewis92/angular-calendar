import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import subMonths from 'date-fns/esm/subMonths';
import addMonths from 'date-fns/esm/addMonths';
import addDays from 'date-fns/esm/addDays';
import addWeeks from 'date-fns/esm/addWeeks';
import subDays from 'date-fns/esm/subDays';
import subWeeks from 'date-fns/esm/subWeeks';
import startOfMonth from 'date-fns/esm/startOfMonth';
import endOfMonth from 'date-fns/esm/endOfMonth';
import startOfWeek from 'date-fns/esm/startOfWeek';
import endOfWeek from 'date-fns/esm/endOfWeek';
import startOfDay from 'date-fns/esm/startOfDay';
import endOfDay from 'date-fns/esm/endOfDay';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['styles.css'],
  // this is a hack to get styles to apply to the inner component. Your app should just use a global stylesheet
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent {
  view: CalendarPeriod = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  minDate: Date = subMonths(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 1);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  constructor() {
    this.dateOrViewChanged();
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
}
