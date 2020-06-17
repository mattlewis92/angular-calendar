import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // hack to get the styles to apply locally
  templateUrl: 'template.html',
  // you should really include this CSS in your global stylesheet
  styles: [
    `
      .my-custom-class span {
        color: #ff3d7f !important;
      }
    `,
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Has custom class',
      color: colors.yellow,
      start: new Date(),
      cssClass: 'my-custom-class',
    },
  ];
}
