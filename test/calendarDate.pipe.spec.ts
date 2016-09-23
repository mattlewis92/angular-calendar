import {Component, LOCALE_ID} from '@angular/core';
import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {spy} from 'sinon';
import * as moment from 'moment';
import {
  CalendarModule,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  MOMENT
} from './../angular2-calendar';

@Component({
  template: '{{ date | calendarDate:method:locale }}'
})
class TestCmp {
  public date: Date;
  public view: string;
  public format: string;
  public locale: string;
  public method: string;
}

describe('calendarDate pipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule], declarations: [TestCmp]});
    TestBed.configureCompiler({
      providers: [
        {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter},
        {provide: MOMENT, useValue: moment}
      ]
    });
  });

  let dateFormatter: CalendarDateFormatter, defaultLocale: string;
  beforeEach(inject([CalendarDateFormatter, LOCALE_ID], (_dateFormatter_, locale) => {
    dateFormatter = _dateFormatter_;
    defaultLocale = locale;
  }));

  it('should use the date formatter to format the date', () => {
    const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
    spy(dateFormatter, 'monthViewColumnHeader');
    fixture.componentInstance.date = new Date('2016-01-01');
    fixture.componentInstance.method = 'monthViewColumnHeader';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).to.equal('Friday');
    expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({date: fixture.componentInstance.date, locale: defaultLocale});
  });

  it('should allow the locale to be customised', () => {
    const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
    fixture.componentInstance.locale = 'de';
    spy(dateFormatter, 'monthViewColumnHeader');
    fixture.componentInstance.date = new Date('2016-01-01');
    fixture.componentInstance.method = 'monthViewColumnHeader';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).to.equal('Freitag');
    expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({date: fixture.componentInstance.date, locale: 'de'});
  });

});
