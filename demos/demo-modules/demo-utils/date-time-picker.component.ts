import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};

@Component({
  selector: 'mwl-demo-utils-date-time-picker',
  template: `
    <form class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <input
            readonly
            class="form-control"
            [placeholder]="placeholder"
            name="date"
            [(ngModel)]="dateStruct"
            (ngModelChange)="updateDate()"
            ngbDatepicker
            #datePicker="ngbDatepicker">
            <div class="input-group-append" (click)="datePicker.toggle()" >
              <span class="input-group-text"><i class="fa fa-calendar"></i></span>
            </div>
        </div>
      </div>
    </form>
    <ngb-timepicker
      [(ngModel)]="timeStruct"
      (ngModelChange)="updateTime()"
      [meridian]="true">
    </ngb-timepicker>
  `,
  styles: [
    `
    .form-group {
      width: 100%;
    }
  `
  ],
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() placeholder: string;

  date: Date;

  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;

  datePicker: any;

  private onChangeCallback: (date: Date) => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(date: Date): void {
    this.date = date;
    this.dateStruct = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date)
    };
    this.timeStruct = {
      second: getSeconds(date),
      minute: getMinutes(date),
      hour: getHours(date)
    };
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  updateDate(): void {
    const newDate: Date = setYear(
      setMonth(
        setDate(this.date, this.dateStruct.day),
        this.dateStruct.month - 1
      ),
      this.dateStruct.year
    );
    this.writeValue(newDate);
    this.onChangeCallback(newDate);
  }

  updateTime(): void {
    const newDate: Date = setHours(
      setMinutes(
        setSeconds(this.date, this.timeStruct.second),
        this.timeStruct.minute
      ),
      this.timeStruct.hour
    );
    this.writeValue(newDate);
    this.onChangeCallback(newDate);
  }
}
