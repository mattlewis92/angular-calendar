import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  LOCALE_ID,
  inject,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfWeek,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarView,
  CalendarEvent,
  CalendarResource,
  CalendarResourceEventTimesChangedEvent,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarDatePipe,
  CalendarMonthViewComponent,
  CalendarResourceWeekViewComponent,
  CalendarResourceDayViewComponent,
  CalendarTooltipDirective,
  CalendarEventActionsComponent,
  ClickDirective,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { JsonPipe, NgStyle } from '@angular/common';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    h3 {
      margin: 0 0 10px;
    }

    pre {
      background-color: #f5f5f5;
      padding: 15px;
    }

    .resource-event-time,
    .resource-event-title {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.2;
      font-size: 11px;
    }
  `,
  templateUrl: 'template.html',
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarDatePipe,
    CalendarMonthViewComponent,
    CalendarResourceWeekViewComponent,
    CalendarResourceDayViewComponent,
    CalendarTooltipDirective,
    CalendarEventActionsComponent,
    ClickDirective,
    NgStyle,
    FormsModule,
    FlatpickrDirective,
    JsonPipe,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
    provideFlatpickrDefaults(),
  ],
})
export class DemoComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  @ViewChild('resourceEventTemplate', { static: true })
  resourceEventTemplate: TemplateRef<any>;

  locale = inject(LOCALE_ID);

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

  resources: CalendarResource[] = [
    {
      id: 1,
      name: 'Edoinise',
    },
    {
      id: 2,
      name: 'Jean-Donald',
    },
    {
      id: 3,
      name: 'Laeticia',
    },
    {
      id: 4,
      name: 'Mateo',
    },
    {
      id: 5,
      name: 'Khephren',
    },
  ];

  events: CalendarEvent[] = [
    {
      id: 1247,
      start: addHours(startOfWeek(new Date()), 8),
      end: addHours(startOfWeek(new Date()), 12),
      title: 'Workshop with Dassault System',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(1), this.getResourceById(4)],
    },
    {
      id: 1248,
      start: addHours(addDays(startOfWeek(new Date()), 1), 8),
      end: addHours(addDays(startOfWeek(new Date()), 1), 12),
      title: 'Workshop with Google',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(1), this.getResourceById(4)],
    },
    {
      id: 1249,
      start: addHours(addDays(startOfWeek(new Date()), 3), 8),
      end: addHours(addDays(startOfWeek(new Date()), 3), 12),
      title: 'Workshop with Netflix',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(1), this.getResourceById(2)],
    },
    {
      id: 1250,
      start: addHours(startOfWeek(new Date()), 14),
      end: addHours(startOfWeek(new Date()), 18),
      title: 'Product demonstration',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(2), this.getResourceById(4)],
    },
    {
      id: 1251,
      start: addHours(addDays(startOfWeek(new Date()), 2), 8),
      end: addHours(addDays(startOfWeek(new Date()), 2), 12),
      title: 'Call for tenders',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(3)],
    },
    {
      id: 1252,
      start: addHours(addDays(startOfWeek(new Date()), 4), 14),
      end: addHours(addDays(startOfWeek(new Date()), 4), 18),
      title: 'Call for tenders',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(3)],
    },
    {
      id: 1253,
      start: addHours(addDays(startOfWeek(new Date()), 4), 8),
      end: addHours(addDays(startOfWeek(new Date()), 4), 12),
      title: 'Workshop with Amazon',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [
        this.getResourceById(1),
        this.getResourceById(3),
        this.getResourceById(5),
      ],
    },
    {
      id: 1254,
      start: addHours(addDays(startOfWeek(new Date()), 3), 8),
      end: addHours(addDays(startOfWeek(new Date()), 3), 12),
      title: 'Customer weekly meeting',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(5)],
    },
    {
      id: 1255,
      start: addHours(addDays(startOfWeek(new Date()), 3), 13),
      end: addHours(addDays(startOfWeek(new Date()), 3), 15),
      title: 'App Insight Verification',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(5)],
    },
    {
      id: 1256,
      start: addHours(addDays(startOfWeek(new Date()), 3), 15),
      end: addHours(addDays(startOfWeek(new Date()), 3), 19),
      title: 'Customers Tickets Review',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: false,
      draggable: true,
      resources: [this.getResourceById(5)],
    },
    {
      id: 1257,
      start: addHours(addDays(startOfWeek(new Date()), 5), 8),
      end: addHours(addDays(startOfWeek(new Date()), 5), 12),
      title: 'Team Building',
      color: { ...colors.yellow },
      actions: this.actions,
      allDay: true,
      draggable: true,
      resources: [
        this.getResourceById(1),
        this.getResourceById(2),
        this.getResourceById(3),
        this.getResourceById(4),
        this.getResourceById(5),
      ],
    },
    {
      id: 1258,
      start: startOfWeek(new Date()),
      end: addDays(startOfWeek(new Date()), 2),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      draggable: true,
    },
    {
      id: 1259,
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
      draggable: true,
    },
    {
      id: 1260,
      start: addDays(startOfWeek(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  mimicDragAcrossResources: boolean = true;

  keepUnassignedEvents: boolean = true;

  unassignedRessourceName: string = 'Unassigned';

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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
    resources,
  }: CalendarResourceEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    if (resources) {
      event.resources = resources;
    }
    this.events = [...this.events];
  }

  isResourceAssigned(
    event: CalendarEvent,
    resource: CalendarResource,
  ): boolean {
    return !!event.resources?.some(
      (eventResource) => eventResource.id === resource.id,
    );
  }

  updateEventResources(event: CalendarEvent, changeEvent: Event): void {
    const selectedIds = Array.from(
      (changeEvent.target as HTMLSelectElement).selectedOptions,
    ).map((option) => option.value);
    event.resources = this.resources.filter((resource) =>
      selectedIds.includes(String(resource.id)),
    );
    this.refresh.next();
  }

  addResource(): void {
    const nextId =
      this.resources.reduce(
        (maxId, resource) => Math.max(maxId, Number(resource.id) || 0),
        0,
      ) + 1;
    this.resources = [...this.resources, { id: nextId, name: 'New resource' }];
  }

  deleteResource(resourceToDelete: CalendarResource): void {
    this.resources = this.resources.filter(
      (resource) => resource !== resourceToDelete,
    );
    this.events = this.events.map((event) =>
      event.resources?.some((resource) => resource === resourceToDelete)
        ? {
            ...event,
            resources: event.resources.filter(
              (resource) => resource !== resourceToDelete,
            ),
          }
        : event,
    );
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private getResourceById(id: number): CalendarResource {
    return this.resources.find((resource) => resource.id === id);
  }
}
