import"./chunk-RACSJ3AQ.js";var e=`import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  DOCUMENT,
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

import { colors } from '../demo-utils/colors';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['styles.scss'],
  encapsulation: ViewEncapsulation.None,
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
export class DemoComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An event',
      start: new Date(),
      color: colors.red,
    },
  ];

  private document = inject<Document>(DOCUMENT);

  private readonly darkThemeClass = 'dark-theme';

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
    // Required if using bootstrap
    this.document.body.parentElement.setAttribute('data-bs-theme', 'dark');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
    // Required if using bootstrap
    this.document.body.parentElement.removeAttribute('data-bs-theme');
  }
}
`;var a=`<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate" />

<div>
  @switch (view) { @case ('month') {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [activeDayIsOpen]="true"
  />
  } @case ('week') {
  <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
  } @case ('day') {
  <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
  } }
</div>
`;var t=`@use '../../../../angular-calendar/src/angular-calendar';

.dark-theme {
  // First define some global color variables for your app, these are just for the demo, they can be anything you like
  $bg-dark-primary: #1f262d;
  $bg-dark-secondary: #394046;
  $bg-active: #2c343a;
  $text-color: #d5d6d7;
  $border-color: rgb(0 0 0 / 60%);

  // Call the calendar mixin with a sass color map of your theme. Every property is optional.
  // For a list of all variables and how they are used,
  // see https://github.com/mattlewis92/angular-calendar/tree/main/projects/angular-calendar/src/variables.scss
  @include angular-calendar.cal-theme(
    (
      bg-primary: $bg-dark-primary,
      bg-secondary: $bg-dark-secondary,
      weekend-color: indianred,
      bg-active: $bg-active,
      border-color: $border-color,
      gray: $bg-dark-secondary,
      today-bg: $bg-dark-secondary,
      event-color-primary: $bg-dark-secondary,
    )
  );

  // How to override a non themable property, this was copied from chrome -> inspect element -> styles panel
  .cal-month-view .cal-day-cell.cal-out-month .cal-day-number {
    opacity: 0.15;
  }
}
`;var p=[{filename:"component.ts",contents:e},{filename:"template.html",contents:a},{filename:"styles.scss",contents:t.replace("../../../../angular-calendar/src/angular-calendar","angular-calendar/scss/angular-calendar")}];export{p as sources};
