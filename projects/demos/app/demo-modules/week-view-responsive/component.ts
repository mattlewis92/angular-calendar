import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent implements OnInit, OnDestroy {
  private deviceSubscription: Subscription;

  view: string = 'week';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  daysInWeek = 7;

  CALENDAR_RESPONSIVE = {
    small: '(max-width: 576px)',
    medium: '(max-width: 768px)',
    large: '(max-width: 960px)'
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.deviceSubscription = this.breakpointObserver
      .observe([
        this.CALENDAR_RESPONSIVE.large,
        this.CALENDAR_RESPONSIVE.medium,
        this.CALENDAR_RESPONSIVE.small
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[this.CALENDAR_RESPONSIVE.small]) {
          console.log('small');
          this.daysInWeek = 2;
          this.cd.markForCheck();
        } else if (state.breakpoints[this.CALENDAR_RESPONSIVE.medium]) {
          console.log('medium');
          this.daysInWeek = 3;
          this.cd.markForCheck();
        } else if (state.breakpoints[this.CALENDAR_RESPONSIVE.large]) {
          console.log('large');
          this.daysInWeek = 5;
          this.cd.markForCheck();
        } else {
          this.daysInWeek = 7;
          this.cd.markForCheck();
        }
      });
  }

  ngOnDestroy() {
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
  }
}
