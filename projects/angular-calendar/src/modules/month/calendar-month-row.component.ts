import { Component, computed, Input, signal, TemplateRef } from '@angular/core';
import { CalendarEvent, MonthView } from 'calendar-utils';
import { EventManagerService } from './event-manager.service';

@Component({
  selector: 'mwl-calendar-month-row',
  template: `
    <div class="cell-day" *ngFor="let day of weekDaysOnWeekSignal()">
      <div
        *ngFor="
          let note of notesPerDaySignal()[day.day]
            | slice: 0:maxEventDisplayedCountSignal();
          trackBy: trackByNotePerDay
        "
      >
        <ng-template
          [ngTemplateOutlet]="cellMonthNoteTemplateSignal()"
          [ngTemplateOutletContext]="{
            day: day,
            firstDayOfRow: firstDayOfRowSignal(),
            note: note,
            rowIndex: rowIndexSignal(),
            notesPerDay: notesPerDaySignal()
          }"
        >
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./calendar-month-row.scss'],
})
export class CalendarMonthRowComponent {
  notesSignal = signal<CalendarEvent[]>([]);
  viewSignal = signal<MonthView | null>(null);
  rowIndexSignal = signal<number | null>(null);
  maxEventDisplayedCountSignal = signal<number | null>(null);
  cellMonthNoteTemplateSignal = signal<TemplateRef<any> | null>(null);
  timezoneSignal = signal<string | null>(null);

  weekDaysOnWeekSignal = computed(() =>
    this.viewSignal().days.slice(
      this.rowIndexSignal(),
      this.viewSignal().totalDaysVisibleInWeek + this.rowIndexSignal()
    )
  );
  firstDayOfRowSignal = computed(() => this.weekDaysOnWeekSignal()[0]);

  weekSignal = computed(() =>
    this.weekDaysOnWeekSignal().map((sliced) => sliced.date)
  );
  notesPerDaySignal = computed(() =>
    this.eventManagerService.eventsPerDayOnWeekWithPosition(
      this.notesSignal(),
      this.weekSignal(),
      this.timezoneSignal()
    )
  );
  constructor(private eventManagerService: EventManagerService) {}

  @Input()
  set notes(notes: CalendarEvent[]) {
    this.notesSignal.set(notes);
  }

  @Input() set view(view: MonthView) {
    this.viewSignal.set(view);
  }

  @Input() set rowIndex(rowIndex: number) {
    this.rowIndexSignal.set(rowIndex);
  }

  @Input() set maxEventDisplayedCount(maxEventDisplayedCount: number) {
    this.maxEventDisplayedCountSignal.set(maxEventDisplayedCount);
  }

  @Input() set cellMonthNoteTemplate(cellMonthNoteTemplate: TemplateRef<any>) {
    this.cellMonthNoteTemplateSignal.set(cellMonthNoteTemplate);
  }

  @Input() set timezone(timezone: string) {
    this.timezoneSignal.set(timezone);
  }

  trackByNotePerDay(index: number, el: any) {
    return el.id;
  }
}
