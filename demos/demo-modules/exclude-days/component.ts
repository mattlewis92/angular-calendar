import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
})
export class DemoComponent {

  view: string = 'month';

  viewDate: Date = new Date('2016-01-05');

  events: CalendarEvent[] = [{
    start: new Date('2016-01-08'),
    end: new Date('2016-01-10'),
    title: 'One day excluded event',
    color: {
      primary: '#444',
      secondary: '#888'
    }
  }, {
      start: new Date('2016-01-01'),
      end: new Date('2016-01-09'),
      title: 'Multiple weeks events',
      color: {
          primary: '#8f5b2a',
          secondary: '#ddd'
      }
  }];

  // exclude weekend
  excludeDays: number[] = [0, 6];

}

