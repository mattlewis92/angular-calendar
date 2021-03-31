import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-row',
  template: `
    <!--<div class="row-day" *ngFor="let note of concernedNotes">
      <div
        class="note-day"
        *ngFor="let day of daysSliced; let indexOfelement = index"
        [class.hidden]="day.date < note.start || day.date > note.end"
        [class.cal-past]="day.date < note.start || (day.date > note.end && day.isPast)"
        [class.last]="day.date.valueOf() === note.end.valueOf() && indexOfelement !== 6"
        style="background-color: yellowgreen"
      >
        <span
          *ngIf="day.date.valueOf() == note.start.valueOf() ||
            (startDate.valueOf() == day.date.valueOf() && note.start < day.date)"
          >{{ note.title }} </span
        >
      </div>
    </div>-->

    <div class="cell-day" *ngFor="let day of daysSliced">
      <div *ngFor="let note of notePerDay.get(day)">
        <div
          class="note"
          *ngIf="
            note.meta &&
            (note.start.valueOf() === day.date.valueOf() ||
              day.date.valueOf() === daysSliced[0].date.valueOf())
          "
          [style.width]="note.meta.width"
          [style.left]="note.meta.left"
          [style.top]="note.meta.top"
          style="background-color: yellowgreen"
        >
          {{ note.title }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./calendar-month-row.scss'],
})
export class CalendarMonthRowComponent implements OnChanges {
  @Input() notes: CalendarEvent[];
  @Input() view: any;
  @Input() rowIndex: number;

  startDate: Date;
  endDate: Date;

  daysSliced: WeekDay[] = [];

  concernedNotes: CalendarEvent[];

  notePerDay: Map<WeekDay, CalendarEvent[]> = new Map();

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.notes?.currentValue) {
      this.daysSliced = this.view.days.slice(
        this.rowIndex,
        this.view.totalDaysVisibleInWeek + this.rowIndex
      );
      this.startDate = this.daysSliced[0].date;
      this.endDate = this.daysSliced[6].date;
      const notesCopy = this.deepCopyFunction(this.notes);
      this.concernedNotes = notesCopy.filter(
        (note) =>
          (note.start >= this.startDate && note.start <= this.endDate) ||
          (note.end >= this.startDate && note.end <= this.endDate) ||
          (note.start < this.startDate && note.end > this.endDate)
      );
      this.daysSliced.forEach((currentDay) => {
        const notesOfTheDay = this.concernedNotes.filter(
          (note) => note.start <= currentDay.date && note.end >= currentDay.date
        );
        this.notePerDay.set(currentDay, notesOfTheDay);
      });

      this.notePerDay.forEach((values, key) => {
        this.manageTop(values);
        values.forEach((value) => {
          value.meta.left = this.manageLeft(value);
          value.meta.width = this.manageWidth(value);
        });
        values.sort((a, b) => a.meta.order - b.meta.order);
      });
    }
  }

  manageLeft(note: CalendarEvent): string {
    const d = this.daysSliced
      .map((daySliced) => daySliced.date)
      .findIndex((date) => date.valueOf() === note.start.valueOf());
    let left: number;
    if (d !== -1) {
      left = d * (100 / 7);
    } else {
      left = 0;
    }
    return 'calc(' + left + '% + 2px)';
  }

  manageTop(notes: CalendarEvent[]) {
    let tabWithoutOrder = [];
    let ordersReserved: number[] = [];

    tabWithoutOrder = notes
      .filter((value) => !value.meta.order)
      .sort(
        (a, b) =>
          this.dateDiffIndays(a.end, a.start) -
          this.dateDiffIndays(b.end, b.start)
      );
    ordersReserved = notes
      .filter((value) => value.meta.order)
      .map((value) => +value.meta.order);

    tabWithoutOrder.forEach((v) => {
      let i = 1;
      while (ordersReserved.includes(i)) {
        i++;
      }
      ordersReserved.push(i);
      v.meta.order = i;
      v.meta.top = 'calc(' + (i - 1) + 'em + ' + (i - 1) * 3 + 'px)';
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
      const a = this.dateDiffIndays(note.start, this.daysSliced[6].date);
      width = (a + 1) * (100 / 7);
    }
    // end dans le row en cours et pas le start
    else if (indexStartDate === -1 && indexEndDate !== -1) {
      const a = this.dateDiffIndays(this.daysSliced[0].date, note.end);
      width = (a + 1) * (100 / 7);
    }
    // start et end sont en dehors du row en cours
    else if (indexStartDate === -1 && indexEndDate === -1) {
      width = 100;
    }
    return 'calc(' + width + '% - 4px)';
  }

  dateDiffIndays(date1: Date, date2: Date): number {
    return Math.floor(
      (Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
        Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }

  hideSpan(note, day): boolean {
    return day.date < note.start || day.date > note.end;
  }

  deepCopyFunction(obj) {
    var rv;

    switch (typeof obj) {
      case 'object':
        if (obj === null) {
          // null => null
          rv = null;
        } else {
          switch (toString.call(obj)) {
            case '[object Array]':
              // It's an array, create a new array with
              // deep copies of the entries
              rv = obj.map((o) => this.deepCopyFunction(o));
              break;
            case '[object Date]':
              // Clone the date
              rv = new Date(obj);
              break;
            case '[object RegExp]':
              // Clone the RegExp
              rv = new RegExp(obj);
              break;
            // ...probably a few others
            default:
              // Some other kind of object, deep-copy its
              // properties into a new object
              rv = Object.keys(obj).reduce((prev, key) => {
                prev[key] = this.deepCopyFunction(obj[key]);
                return prev;
              }, {});
              break;
          }
        }
        break;
      default:
        // It's a primitive, copy via assignment
        rv = obj;
        break;
    }
    return rv;
  }
}
