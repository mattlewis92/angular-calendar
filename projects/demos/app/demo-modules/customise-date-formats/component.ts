import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
