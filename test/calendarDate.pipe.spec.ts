import {Component} from '@angular/core';
import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture,
  addProviders
} from '@angular/core/testing';
import {expect} from 'chai';
import {spy} from 'sinon';
import {
  CalendarDate,
  CalendarMomentDateFormatter,
  CalendarDateFormatter
} from './../angular2-calendar';
import {DEFAULT_LOCALE} from './../src/constants';

@Component({
  template: '{{ date | calendarDate:method:locale }}',
  pipes: [CalendarDate]
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
    addProviders([{
      provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
    }, CalendarDate]);
  });

  let builder: TestComponentBuilder, dateFormatter: CalendarDateFormatter;
  beforeEach(inject([TestComponentBuilder, CalendarDateFormatter], (tcb, _dateFormatter_) => {
    builder = tcb;
    dateFormatter = _dateFormatter_;
  }));

  it('should use the date formatter to format the date', async(() => {
    builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
      spy(dateFormatter, 'monthViewColumnHeader');
      fixture.componentInstance.date = new Date('2016-01-01');
      fixture.componentInstance.method = 'monthViewColumnHeader';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).to.equal('Friday');
      expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({date: fixture.componentInstance.date, locale: DEFAULT_LOCALE});
    });
  }));

  it('should allow the locale to be customised', async(() => {
    builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
      fixture.componentInstance.locale = 'de';
      spy(dateFormatter, 'monthViewColumnHeader');
      fixture.componentInstance.date = new Date('2016-01-01');
      fixture.componentInstance.method = 'monthViewColumnHeader';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).to.equal('Freitag');
      expect(dateFormatter.monthViewColumnHeader).to.have.been.calledWith({date: fixture.componentInstance.date, locale: 'de'});
    });
  }));

});
