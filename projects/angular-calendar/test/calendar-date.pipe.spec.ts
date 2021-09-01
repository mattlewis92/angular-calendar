import { Component, LOCALE_ID } from '@angular/core';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { spy } from 'sinon';
import moment from 'moment';
import {
  CalendarModule,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  MOMENT,
} from '../src';
import { adapterFactory } from '../src/date-adapters/date-fns';
import { DateAdapter } from 'angular-calendar';

@Component({
  template:
    '{{ date | calendarDate:method:locale:weekStartsOn:excludeDays:daysInWeek }}',
})
class TestComponent {
  date: Date;
  view: string;
  format: string;
  locale: string;
  method: string;
  daysInWeek: number;
  excludeDays: number[];
  weekStartsOn: number;
}

describe('calendarDate pipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot(
          {
            provide: DateAdapter,
            useFactory: adapterFactory,
          },
          {
            dateFormatter: {
              provide: CalendarDateFormatter,
              useClass: CalendarMomentDateFormatter,
            },
          }
        ),
      ],
      declarations: [TestComponent],
      providers: [{ provide: MOMENT, useValue: moment }],
    });
  });

  let dateFormatter: CalendarDateFormatter;
  let defaultLocale: string;
  beforeEach(inject(
    [CalendarDateFormatter, LOCALE_ID],
    (_dateFormatter_, locale) => {
      dateFormatter = _dateFormatter_;
      defaultLocale = locale;
    }
  ));

  it('should use the date formatter to format the date', () => {
    const fixture: ComponentFixture<TestComponent> =
      TestBed.createComponent(TestComponent);
    spy(dateFormatter, 'monthViewColumnHeader');
    fixture.componentInstance.date = new Date('2016-01-01');
    fixture.componentInstance.method = 'monthViewColumnHeader';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).to.equal('Friday');
    expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({
      date: fixture.componentInstance.date,
      locale: defaultLocale,
      daysInWeek: undefined,
      excludeDays: [],
      weekStartsOn: 0,
    });
  });

  it('should allow the locale to be customised', () => {
    const fixture: ComponentFixture<TestComponent> =
      TestBed.createComponent(TestComponent);
    fixture.componentInstance.locale = 'de';
    spy(dateFormatter, 'monthViewColumnHeader');
    fixture.componentInstance.date = new Date('2016-01-01');
    fixture.componentInstance.method = 'monthViewColumnHeader';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).to.equal('Freitag');
    expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({
      date: fixture.componentInstance.date,
      locale: 'de',
      daysInWeek: undefined,
      excludeDays: [],
      weekStartsOn: 0,
    });
  });

  it('should throw when an invalid method is passed', () => {
    const fixture: ComponentFixture<TestComponent> =
      TestBed.createComponent(TestComponent);
    fixture.componentInstance.date = new Date('2016-01-01');
    fixture.componentInstance.method = 'invalid';
    expect(() => fixture.detectChanges()).to.throw(
      /^invalid is not a valid date formatter. Can only be one of/
    );
  });
});
