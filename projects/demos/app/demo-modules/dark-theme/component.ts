import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  DOCUMENT,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['styles.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
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

  private readonly darkThemeClass = 'dark-theme';

  constructor(@Inject(DOCUMENT) private document: Document) {}

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
