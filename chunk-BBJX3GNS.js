import"./chunk-RACSJ3AQ.js";var e=`import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarWeekViewComponent,
  CalendarDatePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WeekViewHourSegment } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { NgClass } from '@angular/common';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  providers: [
    provideCalendar(
      { provide: DateAdapter, useFactory: adapterFactory },
      {
        eventTitleFormatter: {
          provide: CalendarEventTitleFormatter,
          useClass: CustomEventTitleFormatter,
        },
      },
    ),
  ],
  styles: [
    \`
      .disable-hover {
        pointer-events: none;
      }
    \`,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    NgClass,
    CalendarWeekViewComponent,
    CalendarDatePipe,
  ],
})
export class DemoComponent {
  viewDate = new Date();

  events: CalendarEvent[] = [];

  dragToCreateActive = false;

  weekStartsOn: 0 = 0;

  private cdr = inject(ChangeDetectorRef);

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement,
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup')),
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30,
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width,
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
`;var t=`<div class="row">
  <div class="col-md-6">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        mwlCalendarPreviousView
        [view]="'week'"
        [(viewDate)]="viewDate"
      >
        Previous
      </div>
      <div
        class="btn btn-outline-secondary"
        mwlCalendarToday
        [(viewDate)]="viewDate"
      >
        Today
      </div>
      <div
        class="btn btn-primary"
        mwlCalendarNextView
        [view]="'week'"
        [(viewDate)]="viewDate"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-6 text-right">
    <h3>{{ viewDate | calendarDate:('weekViewTitle') }}</h3>
  </div>
</div>
<br />

<ng-template
  #weekViewHourSegmentTemplate
  let-segment="segment"
  let-locale="locale"
  let-segmentHeight="segmentHeight"
  let-isTimeLabel="isTimeLabel"
>
  <div
    #segmentElement
    class="cal-hour-segment"
    [style.height.px]="segmentHeight"
    [class.cal-hour-start]="segment.isStart"
    [class.cal-after-hour-start]="!segment.isStart"
    [ngClass]="segment.cssClass"
    (mousedown)="startDragToCreate(segment, $event, segmentElement)"
  >
    @if (isTimeLabel) {
    <div class="cal-time">
      {{ segment.date | calendarDate:'weekViewHour':locale }}
    </div>
    }
  </div>
</ng-template>

<mwl-calendar-week-view
  [viewDate]="viewDate"
  [events]="events"
  [hourSegmentTemplate]="weekViewHourSegmentTemplate"
  [weekStartsOn]="weekStartsOn"
/>
`;var l=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{l as sources};
