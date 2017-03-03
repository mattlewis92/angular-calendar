import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
})
export class DemoComponent {
  from: Date = new Date();
  to: Date = new Date(this.from.getFullYear(), this.from.getMonth(), this.from.getDate(), this.from.getHours(), this.from.getMinutes());

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [{
    start: this.from,
    end: this.to,
    title: 'Example',
    color: {
      primary: '#444',
      secondary: '#888'
    }
  }];

  // exclue weekends
  excludeDays: number[] = [0, 6];

}

