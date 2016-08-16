import {Component} from '@angular/core';
import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {spy} from 'sinon';
import {
  CalendarModule,
  CalendarMomentDateFormatter,
  CalendarDateFormatter
} from './../angular2-calendar';
import {DEFAULT_LOCALE} from './../src/constants';

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
        {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter}
      ]
    });
  });

  let dateFormatter: CalendarDateFormatter;
  beforeEach(inject([CalendarDateFormatter], (_dateFormatter_) => {
    dateFormatter = _dateFormatter_;
  }));

  it('should use the date formatter to format the date', () => {
    const fixture: ComponentFixture<TestCmp> = TestBed.createComponent(TestCmp);
    spy(dateFormatter, 'monthViewColumnHeader');
    fixture.componentInstance.date = new Date('2016-01-01');
    fixture.componentInstance.method = 'monthViewColumnHeader';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).to.equal('Friday');
    expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({date: fixture.componentInstance.date, locale: DEFAULT_LOCALE});
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
