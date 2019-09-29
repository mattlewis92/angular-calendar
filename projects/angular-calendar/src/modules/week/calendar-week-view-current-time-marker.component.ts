import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { switchMapTo, startWith, map } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';

@Component({
  selector: 'mwl-calendar-week-view-current-time-marker',
  template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="(marker$ | async)?.isVisible"
        [style.top.px]="(marker$ | async)?.top"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute
      }"
    >
    </ng-template>
  `
})
export class CalendarWeekViewCurrentTimeMarkerComponent implements OnChanges {
  @Input() columnDate: Date;

  @Input() dayStartHour: number;

  @Input() dayStartMinute: number;

  @Input() dayEndHour: number;

  @Input() dayEndMinute: number;

  @Input() hourSegments: number;

  @Input() hourSegmentHeight: number;

  @Input() customTemplate: TemplateRef<any>;

  private columnDate$ = new BehaviorSubject<Date>(this.columnDate);

  marker$: Observable<{ isVisible: boolean; top: number }> = interval(
    60 * 1000
  ).pipe(
    startWith(0),
    switchMapTo(this.columnDate$),
    map(columnDate => {
      const startOfDay = this.dateAdapter.setMinutes(
        this.dateAdapter.setHours(columnDate, this.dayStartHour),
        this.dayStartMinute
      );
      const endOfDay = this.dateAdapter.setMinutes(
        this.dateAdapter.setHours(columnDate, this.dayEndHour),
        this.dayEndMinute
      );
      const hourHeightModifier =
        (this.hourSegments * this.hourSegmentHeight) / 60;
      const now = new Date();
      return {
        isVisible:
          this.dateAdapter.isSameDay(columnDate, now) &&
          now >= startOfDay &&
          now <= endOfDay,
        top:
          this.dateAdapter.differenceInMinutes(now, startOfDay) *
          hourHeightModifier
      };
    })
  );

  constructor(private dateAdapter: DateAdapter) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columnDate) {
      this.columnDate$.next(changes.columnDate.currentValue);
    }
  }
}
