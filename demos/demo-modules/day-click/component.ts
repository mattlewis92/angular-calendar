import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

}

