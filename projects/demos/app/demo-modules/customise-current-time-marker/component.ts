import { Component, ChangeDetectionStrategy } from '@angular/core';
import { getHours } from 'date-fns';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class DemoComponent {
  viewDate = new Date();

  showMarker = true;

  // just for the purposes of the demo so it all fits in one screen
  dayStartHour = Math.max(0, getHours(new Date()) - 2);

  dayEndHour = Math.min(23, getHours(new Date()) + 2);
}
