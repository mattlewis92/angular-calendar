import {
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
} from 'angular-calendar';

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
