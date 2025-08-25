import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarWeekViewComponent } from 'angular-calendar';
import { getHours } from 'date-fns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  imports: [FormsModule, CalendarWeekViewComponent],
})
export class DemoComponent {
  viewDate = new Date();

  showMarker = true;

  // just for the purposes of the demo so it all fits in one screen
  dayStartHour = Math.max(0, getHours(new Date()) - 2);

  dayEndHour = Math.min(23, getHours(new Date()) + 2);
}
