import"./chunk-RACSJ3AQ.js";var e=`import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarWeekViewComponent,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { getHours } from 'date-fns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  imports: [FormsModule, CalendarWeekViewComponent],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  viewDate = new Date();

  showMarker = true;

  // just for the purposes of the demo so it all fits in one screen
  dayStartHour = Math.max(0, getHours(new Date()) - 2);

  dayEndHour = Math.min(23, getHours(new Date()) + 2);
}
`;var t=`<ng-template
  #currentTimeMarkerTemplate
  let-columnDate="columnDate"
  let-dayStartHour="dayStartHour"
  let-dayStartMinute="dayStartMinute"
  let-dayEndHour="dayEndHour"
  let-dayEndMinute="dayEndMinute"
  let-isVisible="isVisible"
  let-topPx="topPx"
>
  @if (isVisible && showMarker) {
  <div class="cal-current-time-marker" [style.top.px]="topPx"></div>
  }
</ng-template>

<div class="form-group form-check">
  <input
    type="checkbox"
    class="form-check-input"
    id="showMarker"
    [(ngModel)]="showMarker"
  />
  <label class="form-check-label" for="showMarker">Show marker</label>
</div>

<mwl-calendar-week-view
  [viewDate]="viewDate"
  [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
  [dayStartHour]="dayStartHour"
  [dayEndHour]="dayEndHour"
/>
`;var r=`.cal-current-time-marker {
  height: 3px;
  background: linear-gradient(270deg, #ec268d, #1f55dd);
  background-size: 400% 400%;
  animation: background-fade 5s ease infinite;

  @keyframes background-fade {
    0% {
      background-position: 0 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
}
`;var p=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t},{filename:"styles.scss",contents:r}];export{p as sources};
