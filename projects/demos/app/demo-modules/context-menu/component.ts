import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarTooltipDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarDatePipe,
  CalendarEventTitlePipe,
  provideCalendar,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Subject } from 'rxjs';
import { colors } from '../demo-utils/colors';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { NgClass } from '@angular/common';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['./styles.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CalendarHeaderComponent,
    ContextMenuModule,
    NgClass,
    CalendarTooltipDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarDatePipe,
    CalendarEventTitlePipe,
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  addEvent(date: Date): void {
    this.events.push({
      start: date,
      title: 'New event',
      color: colors.red,
    });
    this.refresh.next();
  }
}
