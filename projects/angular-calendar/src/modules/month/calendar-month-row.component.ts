import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CalendarEvent, MonthView, WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-row',
  template: `
    <div class="cell-day" *ngFor="let day of daysSliced">
      <div
        *ngFor="
          let note of notesPerDay[day.day] | slice: 0:maxEventDisplayedCount;
          trackBy: trackByNotePerDay
        "
      >
        <ng-template
          [ngTemplateOutlet]="cellMonthNoteTemplate"
          [ngTemplateOutletContext]="{
            day: day,
            firstDayOfRow: firstDayOfRow,
            note: note,
            rowIndex: rowIndex,
            notesPerDay: notesPerDay
          }"
        >
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./calendar-month-row.scss'],
})
export class CalendarMonthRowComponent implements OnChanges {
  @Input() notes: CalendarEvent[];
  @Input() view: MonthView;
  @Input() rowIndex: number;
  @Input() maxEventDisplayedCount: number;
  @Input() cellMonthNoteTemplate: TemplateRef<any>;

  startDate: Date;
  endDate: Date;
  daysSliced: WeekDay[] = [];
  firstDayOfRow: WeekDay;
  currentRowNotes: CalendarEvent[];
  notesPerDay: { [key: number]: CalendarEvent[] };

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.notes?.currentValue) {
      this.notesPerDay = {};
      this.daysSliced = this.view.days.slice(
        this.rowIndex,
        this.view.totalDaysVisibleInWeek + this.rowIndex
      );
      this.firstDayOfRow = this.daysSliced[0];
      this.startDate = this.daysSliced[0].date;
      this.endDate = this.daysSliced[6].date;
      const notesCopy = this.deepCopyFunction(this.notes);
      this.currentRowNotes = notesCopy.filter(
        (note) =>
          (note.start >= this.startDate && note.start <= this.endDate) ||
          (note.end >= this.startDate && note.end <= this.endDate) ||
          (note.start < this.startDate && note.end > this.endDate)
      );
      this.daysSliced.forEach((currentDay) => {
        const notesOfTheDay = this.currentRowNotes.filter(
          (note) => note.start <= currentDay.date && note.end >= currentDay.date
        );
        this.notesPerDay[currentDay.day] = notesOfTheDay;
      });

      // tslint:disable-next-line:forin
      for (const notePerDay in this.notesPerDay) {
        this.manageTop(this.notesPerDay[notePerDay]);
        this.notesPerDay[notePerDay].forEach((value) => {
          value.meta.left = this.manageLeft(value);
          value.meta.width = this.manageWidth(value);
        });
        this.notesPerDay[notePerDay].sort(
          (a, b) => a.meta.order - b.meta.order
        );
      }
    }
  }

  manageLeft(note: CalendarEvent): string {
    const dayIndex = this.daysSliced
      .map((daySliced) => daySliced.date)
      .findIndex((date) => date.valueOf() === note.start.valueOf());
    let left: number;
    if (dayIndex !== -1) {
      left = dayIndex * (100 / 7);
    } else {
      left = 0;
    }
    return 'calc(' + left + '% + 3px)';
  }

  manageTop(notes: CalendarEvent[]) {
    let tabWithoutOrder: CalendarEvent[] = [];
    let ordersReserved: number[] = [];

    tabWithoutOrder = notes
      .filter((value) => !value.meta.order)
      .sort(
        (prev, current) =>
          this.dateDiffIndays(prev.end, prev.start) -
          this.dateDiffIndays(current.end, current.start)
      );
    ordersReserved = notes
      .filter((value) => value.meta.order)
      .map((value) => +value.meta.order);

    tabWithoutOrder.forEach((calendarEvent) => {
      let index = 1;
      while (ordersReserved.includes(index)) {
        index++;
      }
      ordersReserved.push(index);
      calendarEvent.meta.order = index;
      calendarEvent.meta.top =
        'calc(' + (index - 1) + 'em + ' + (index - 1) * 4 + 'px)';
    });
  }

  manageWidth(note: CalendarEvent): string {
    let width: number;
    const indexStartDate = this.daysSliced
      .map((daySliced) => daySliced.date)
      .findIndex((date) => date.valueOf() === note.start.valueOf());
    const indexEndDate = this.daysSliced
      .map((daySliced) => daySliced.date)
      .findIndex((date) => date.valueOf() === note.end.valueOf());
    // start et end dans le row en cours
    if (indexEndDate !== -1 && indexStartDate !== -1) {
      width = (indexEndDate - indexStartDate + 1) * (100 / 7);
    }
    // start dans le row en cours et pas le end
    else if (indexStartDate !== -1 && indexEndDate === -1) {
      const daysNumberFromNoteStart = this.dateDiffIndays(
        note.start,
        this.daysSliced[6].date
      );
      width = (daysNumberFromNoteStart + 1) * (100 / 7);
    }
    // end dans le row en cours et pas le start
    else if (indexStartDate === -1 && indexEndDate !== -1) {
      const daysNumberToNoteEnd = this.dateDiffIndays(
        this.daysSliced[0].date,
        note.end
      );
      width = (daysNumberToNoteEnd + 1) * (100 / 7);
    }
    // start et end sont en dehors du row en cours
    else if (indexStartDate === -1 && indexEndDate === -1) {
      width = 100;
    }
    return 'calc(' + width + '% - 5px)';
  }

  dateDiffIndays(date1: Date, date2: Date): number {
    return Math.floor(
      (Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
        Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }

  deepCopyFunction(obj) {
    let result;

    switch (typeof obj) {
      case 'object':
        if (obj === null) {
          // null => null
          result = null;
        } else {
          switch (toString.call(obj)) {
            case '[object Array]':
              // It's an array, create a new array with
              // deep copies of the entries
              result = obj.map((o) => this.deepCopyFunction(o));
              break;
            case '[object Date]':
              // Clone the date
              result = new Date(obj);
              break;
            case '[object RegExp]':
              // Clone the RegExp
              result = new RegExp(obj);
              break;
            // ...probably a few others
            default:
              // Some other kind of object, deep-copy its
              // properties into a new object
              result = Object.keys(obj).reduce((prev, key) => {
                prev[key] = this.deepCopyFunction(obj[key]);
                return prev;
              }, {});
              break;
          }
        }
        break;
      default:
        // It's a primitive, copy via assignment
        result = obj;
        break;
    }
    return result;
  }

  trackByNotePerDay(index: number, el: any) {
    return el.id;
  }
}
