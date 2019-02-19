import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

import { colors } from '../demo-utils/colors';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit, OnDestroy {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An event',
      start: new Date(),
      color: colors.red
    }
  ];

  private darkThemeClass = 'dark-theme';

  // this is bad practise and only exists for the demo, don't do this in your app
  private navbar =
    this.document.querySelector('.navbar') ||
    this.document.createElement('div');

  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
    this.navbar.classList.add('navbar-dark', 'bg-dark');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
    this.navbar.classList.remove('navbar-dark', 'bg-dark');
  }
}
