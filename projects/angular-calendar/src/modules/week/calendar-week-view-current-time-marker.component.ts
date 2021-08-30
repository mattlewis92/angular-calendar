import {
  Component,
  Input,
  NgZone,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
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
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `,
})
export class CalendarWeekViewCurrentTimeMarkerComponent implements OnChanges {
  @Input() columnDate: Date;

  @Input() dayStartHour: number;

  @Input() dayStartMinute: number;

  @Input() dayEndHour: number;

  @Input() dayEndMinute: number;

  @Input() hourSegments: number;

  @Input() hourDuration: number;

  @Input() hourSegmentHeight: number;

  @Input() customTemplate: TemplateRef<any>;

  columnDate$ = new BehaviorSubject<Date>(undefined);

  marker$: Observable<{
    isVisible: boolean;
    top: number;
  }> = this.zone.onStable.pipe(
    switchMap(() => interval(60 * 1000)),
    startWith(0),
    switchMapTo(this.columnDate$),
    map((columnDate) => {
      const startOfDay = this.dateAdapter.setMinutes(
        this.dateAdapter.setHours(columnDate, this.dayStartHour),
        this.dayStartMinute
      );
      const endOfDay = this.dateAdapter.setMinutes(
        this.dateAdapter.setHours(columnDate, this.dayEndHour),
        this.dayEndMinute
      );
      const hourHeightModifier =
        (this.hourSegments * this.hourSegmentHeight) /
        (this.hourDuration || 60);
      const now = new Date();
      return {
        isVisible:
          this.dateAdapter.isSameDay(columnDate, now) &&
          now >= startOfDay &&
          now <= endOfDay,
        top:
          this.dateAdapter.differenceInMinutes(now, startOfDay) *
          hourHeightModifier,
      };
    })
  );

  constructor(private dateAdapter: DateAdapter, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columnDate) {
      this.columnDate$.next(changes.columnDate.currentValue);
    }
  }
}
