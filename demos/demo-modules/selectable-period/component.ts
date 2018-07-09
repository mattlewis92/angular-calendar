import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { DayViewHour } from 'calendar-utils';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  // don't do this in your app, its only so the styles get applied globally
  styles: [
    `
      .cal-day-selected,
      .cal-day-selected:hover {
        background-color: deeppink !important;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent {
  view = 'month';

  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  dayView: DayViewHour[];

  events: CalendarEvent[] = [];

  selectedDays: any = [];
  hexTimeArray: any = [];

  dayClicked(day: CalendarMonthViewDay): void {
    this.selectedMonthViewDay = day;
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const dateIndex = this.hexTimeArray.indexOf(selectedDateTime);
    if (dateIndex > -1) {
      delete this.selectedMonthViewDay.cssClass;
      this.selectedDays.splice(dateIndex, 1);
      this.hexTimeArray.splice(dateIndex, 1);
    } else {
      this.selectedDays.push(this.selectedMonthViewDay);
      this.hexTimeArray.push(selectedDateTime);
      day.cssClass = 'cal-day-selected';
      this.selectedMonthViewDay = day;
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      const index = this.hexTimeArray.indexOf(day.date.getTime());
      if (index > -1) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    this.dayView = dayView;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.dayView.forEach(hourSegment => {
      hourSegment.segments.forEach(segment => {
        delete segment.cssClass;
        if (
          this.selectedDayViewDate &&
          segment.date.getTime() === this.selectedDayViewDate.getTime()
        ) {
          segment.cssClass = 'cal-day-selected';
        }
      });
    });
  }
}
