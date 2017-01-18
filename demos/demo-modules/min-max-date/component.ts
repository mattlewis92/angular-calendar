import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { subMonths, addMonths, addDays, addWeeks, subDays, subWeeks } from 'date-fns';

function getAddFn(view: string): any {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[view];
}

function getSubFn(view: string): any {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[view];
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

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  minDate: Date = subMonths(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 1);

  dayModifier: Function;

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  constructor() {
    this.dayModifier = function(day: CalendarMonthViewDay): void {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    }.bind(this);
    this.dateOrViewChanged();
  }

  increment(): void {
    this.changeDate(getAddFn(this.view)(this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(getSubFn(this.view)(this.viewDate, 1));
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

  changeView(view: string): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(getSubFn(this.view)(this.viewDate, 1));
    this.nextBtnDisabled = !this.dateIsValid(getAddFn(this.view)(this.viewDate, 1));
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

}

