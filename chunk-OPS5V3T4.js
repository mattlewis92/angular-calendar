import"./chunk-RACSJ3AQ.js";var e=`import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  provideCalendar,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
  DateAdapter,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { FormsModule } from '@angular/forms';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { JsonPipe } from '@angular/common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    \`
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    \`,
  ],
  templateUrl: 'template.html',
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    FormsModule,
    JsonPipe,
    CalendarDatePipe,
    FlatpickrDirective,
  ],
  providers: [
    provideFlatpickrDefaults(),
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  private modal = inject(NgbModal);

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
`;var t=`<div class="row text-center">
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        mwlCalendarPreviousView
        [view]="view"
        [(viewDate)]="viewDate"
        (viewDateChange)="closeOpenMonthViewDay()"
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
        [view]="view"
        [(viewDate)]="viewDate"
        (viewDateChange)="closeOpenMonthViewDay()"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
  </div>
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        (click)="setView(CalendarView.Month)"
        [class.active]="view === CalendarView.Month"
      >
        Month
      </div>
      <div
        class="btn btn-primary"
        (click)="setView(CalendarView.Week)"
        [class.active]="view === CalendarView.Week"
      >
        Week
      </div>
      <div
        class="btn btn-primary"
        (click)="setView(CalendarView.Day)"
        [class.active]="view === CalendarView.Day"
      >
        Day
      </div>
    </div>
  </div>
</div>
<br />
<div>
  @switch (view) { @case (CalendarView.Month) {
  <mwl-calendar-month-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    [activeDayIsOpen]="activeDayIsOpen"
    (dayClicked)="dayClicked($event.day)"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  />
  } @case (CalendarView.Week) {
  <mwl-calendar-week-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  />
  } @case (CalendarView.Day) {
  <mwl-calendar-day-view
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  />
  } }
</div>

<!-- Everything you see below is just for the demo, you don't need to include it in your app -->

<br /><br /><br />

<h3>
  Edit events
  <button class="btn btn-primary float-end" (click)="addEvent()">
    Add new
  </button>
  <div class="clearfix"></div>
</h3>

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Title</th>
        <th>Primary color</th>
        <th>Secondary + text color</th>
        <th>Starts at</th>
        <th>Ends at</th>
        <th>Remove</th>
      </tr>
    </thead>

    <tbody>
      @for (event of events; track event) {
      <tr>
        <td>
          <input
            type="text"
            class="form-control"
            [(ngModel)]="event.title"
            (keyup)="refresh.next()"
          />
        </td>
        <td>
          <input
            type="color"
            [(ngModel)]="event.color.primary"
            (change)="refresh.next()"
          />
        </td>
        <td>
          <input
            type="color"
            [(ngModel)]="event.color.secondary"
            (change)="refresh.next()"
          />
          <input
            type="color"
            [ngModel]="event.color.secondaryText ?? '#1e90ff'"
            (ngModelChange)="event.color.secondaryText = $event"
            (change)="refresh.next()"
          />
        </td>
        <td>
          <input
            class="form-control"
            type="text"
            mwlFlatpickr
            [(ngModel)]="event.start"
            (ngModelChange)="refresh.next()"
            [altInput]="true"
            [convertModelValue]="true"
            [enableTime]="true"
            dateFormat="Y-m-dTH:i"
            altFormat="F j, Y H:i"
            placeholder="Not set"
          />
        </td>
        <td>
          <input
            class="form-control"
            type="text"
            mwlFlatpickr
            [(ngModel)]="event.end"
            (ngModelChange)="refresh.next()"
            [altInput]="true"
            [convertModelValue]="true"
            [enableTime]="true"
            dateFormat="Y-m-dTH:i"
            altFormat="F j, Y H:i"
            placeholder="Not set"
          />
        </td>
        <td>
          <button class="btn btn-danger" (click)="deleteEvent(event)">
            Delete
          </button>
        </td>
      </tr>
      }
    </tbody>
  </table>
</div>

<ng-template #modalContent let-close="close">
  <div class="modal-header">
    <h5 class="modal-title">Event action occurred</h5>
    <button type="button" class="close" (click)="close()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div>
      Action:
      <pre>{{ modalData?.action }}</pre>
    </div>
    <div>
      Event:
      <pre>{{ modalData?.event | json }}</pre>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="close()">
      OK
    </button>
  </div>
</ng-template>
`;var d=[{filename:"component.ts",contents:e},{filename:"template.html",contents:t}];export{d as sources};
