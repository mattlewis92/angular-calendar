import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
import {NgFor, NgClass, DatePipe} from '@angular/common';
import {
  WeekDay,
  CalendarEvent,
  WeekViewEventRow,
  getWeekViewHeader,
  getWeekView
} from 'calendar-utils';
import {CalendarDate} from './calendarDate.pipe';
import {CalendarEventTitle} from './calendarEventTitle.pipe';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'mwl-calendar-week-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="calendar-week-view">
      <div class="day-headers">
        <div
          class="header"
          *ngFor="let day of days"
          [class.past]="day.isPast"
          [class.today]="day.isToday"
          [class.future]="day.isFuture"
          [class.weekend]="day.isWeekend"
          (click)="dayClicked.emit({date: day.date.toDate()})">
          <b>{{ day.date | calendarDate:'week':'columnHeader' }}</b><br>
          <span>{{ day.date | calendarDate:'week':'columnSubHeader' }}</span>
        </div>
      </div>
      <div *ngFor="let eventRow of eventRows">
        <div
          class="event-container"
          *ngFor="let event of eventRow.row"
          [style.width]="((100 / 7) * event.span) + '%'"
          [style.marginLeft]="((100 / 7) * event.offset) + '%'">
          <div
            class="event"
            [class.border-left-rounded]="!event.extendsLeft"
            [class.border-right-rounded]="!event.extendsRight"
            [style.backgroundColor]="event.event.color.secondary"
            [ngClass]="event.event?.cssClass">
            <a
              class="event-title"
              href="javascript:;"
              [innerHtml]="event.event | calendarEventTitle:'week'"
              (click)="eventClicked.emit({event: event.event})">
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [NgFor, NgClass],
  pipes: [CalendarDate, CalendarEventTitle],
  providers: [DatePipe]
})
export class CalendarWeekView implements OnChanges, OnInit, OnDestroy {

  @Input() date: Date;
  @Input() events: CalendarEvent[] = [];
  @Input() refresh: Subject<any>;
  @Output() dayClicked: EventEmitter<any> = new EventEmitter();
  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

  private days: WeekDay[];
  private eventRows: WeekViewEventRow[] = [];
  private refreshSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  ngOnChanges(changes: any): void {

    if (changes.date) {
      this.refreshHeader();
    }

    if (changes.events || changes.date) {
      this.refreshBody();
    }

  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private refreshHeader(): void {
    this.days = getWeekViewHeader({
      viewDate: this.date
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.date
    });
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

}
