import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CalendarEvent, MonthView, WeekDay } from 'calendar-utils';
import * as moment from 'moment-timezone';

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
  @Input() timezone: string;

  startDate: Date;
  endDate: Date;
  daysSliced: WeekDay[] = [];
  firstDayOfRow: WeekDay;
  currentRowNotes: CalendarEvent[];
  notesPerDay: { [key: number]: CalendarEvent[] };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.notes?.currentValue) {
      this.notesPerDay = {};
      this.daysSliced = this.view.days.slice(
        this.rowIndex,
        this.view.totalDaysVisibleInWeek + this.rowIndex
      );
      this.firstDayOfRow = this.daysSliced[0];
      this.startDate = this.daysSliced[0].date;
      this.endDate = this.daysSliced[this.view.totalDaysVisibleInWeek - 1].date;
      const notesCopy = this.deepCopyFunction(this.notes);
      this.currentRowNotes = notesCopy.filter((note: CalendarEvent) => {
        const noteEnd = moment.tz(note.end, this.timezone).add(1, 'd').toDate();
        const weekEnd = moment
          .tz(this.endDate, this.timezone)
          .add(1, 'd')
          .toDate();
        return (
          (note.start >= this.startDate && note.start < weekEnd) ||
          (noteEnd >= this.startDate && noteEnd < weekEnd) ||
          (note.start < this.startDate && noteEnd > weekEnd)
        );
      });

      this.notesPerDay = this.daysSliced.reduce(
        (notesPerDay, weekDay, currentIndex) => {
          notesPerDay[currentIndex] = this.currentRowNotes.filter((note) => {
            const noteEnd = moment
              .tz(note.end, this.timezone)
              .add(1, 'd')
              .toDate();
            return note.start <= weekDay.date && weekDay.date < noteEnd;
          });
          return notesPerDay;
        },
        {}
      );

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
    const noteStartIndex = this.daysSliced.findIndex(
      (weekDay) => weekDay.date.getTime() === note.start.getTime()
    );
    let left: number;
    if (noteStartIndex > 0) {
      left = noteStartIndex * (100 / this.view.totalDaysVisibleInWeek);
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
          this.noteLengthInDaysOnWeek(current) -
          this.noteLengthInDaysOnWeek(prev)
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
    const width =
      this.noteLengthInDaysOnWeek(note) *
      (100 / this.view.totalDaysVisibleInWeek);
    return 'calc(' + width + '% - 5px)';
  }

  noteLengthInDaysOnWeek(note: CalendarEvent) {
    const noteEnd = moment.tz(note.end, this.timezone).add(1, 'd').toDate();
    const noteStartIndex = this.daysSliced.findIndex(
      (weekDay) => weekDay.date.getTime() === note.start.getTime()
    );
    const noteEndIndex = this.daysSliced.findIndex(
      (weekDay) => weekDay.date.getTime() === noteEnd.getTime()
    );

    const noteStartOnWeek = noteStartIndex > -1;
    const noteEndOnWeek = noteEndIndex > -1;

    const fromNoteStartToWeekEndInDays =
      this.view.totalDaysVisibleInWeek - noteStartIndex;
    const fromWeekStartToNoteEndInDays = noteEndIndex;
    const noteLengthInDays = noteEndIndex - noteStartIndex;

    if (noteStartOnWeek && noteEndOnWeek) {
      return noteLengthInDays;
    }
    if (!noteStartOnWeek && noteEndOnWeek) {
      return fromWeekStartToNoteEndInDays;
    }
    if (noteStartOnWeek && !noteEndOnWeek) {
      return fromNoteStartToWeekEndInDays;
    }
    if (!noteStartOnWeek && !noteEndOnWeek) {
      return this.view.totalDaysVisibleInWeek;
    }
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
