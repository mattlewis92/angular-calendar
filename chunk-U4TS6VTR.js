import"./chunk-RACSJ3AQ.js";var e=`import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styles: [
    \`
      .scroll-container {
        height: calc(100vh - 320px);
        overflow-y: auto;
      }
    \`,
  ],
  imports: [
    CalendarHeaderComponent,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  private cdr = inject(ChangeDetectorRef);

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
        startOfDay(new Date()),
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }
}
`;var t=`<mwl-demo-utils-calendar-header
  [(view)]="view"
  [(viewDate)]="viewDate"
  (viewChange)="viewChanged()"
/>

<div class="scroll-container" #scrollContainer>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view [viewDate]="viewDate" [events]="events" />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var s=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{s as sources};
