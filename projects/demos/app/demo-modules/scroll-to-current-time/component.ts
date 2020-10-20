import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styles: [
    `
      .scroll-container {
        height: calc(100vh - 320px);
        overflow-y: auto;
      }
    `,
  ],
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.scrollToCurrentView();
  }

  viewChanged() {
    this.cdr.detectChanges();
    this.scrollToCurrentView();
  }

  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }
}
