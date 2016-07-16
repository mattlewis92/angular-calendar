import {Component} from '@angular/core';
import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture,
  addProviders
} from '@angular/core/testing';
import {expect} from 'chai';
import {DatePipe} from '@angular/common';
import {CalendarConfig, CalendarDate} from './../angular2-calendar';

@Component({
  template: '{{ date | calendarDate:view:format }}',
  pipes: [CalendarDate]
})
class TestCmp {
  public date: Date;
  public view: string;
  public format: string;
}

describe('calendarDate pipe', () => {

  let config: CalendarConfig;
  beforeEach(() => {
    config = new CalendarConfig();
    addProviders([{provide: CalendarConfig, useValue: config}, CalendarDate, DatePipe]);
  });

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should format the date using angular', async(() => {
    builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
      fixture.componentInstance.date = new Date('2016-01-01');
      fixture.componentInstance.view = 'month';
      config.dateFormatter = 'angular';
      config.dateFormats.month.foo = {
        angular: 'MMMM',
        moment: 'MMMM'
      };
      fixture.componentInstance.format = 'foo';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).to.equal('Jan');
    });
  }));

  it('should format the date using moment', async(() => {
    builder.createAsync(TestCmp).then((fixture: ComponentFixture<TestCmp>) => {
      fixture.componentInstance.date = new Date('2016-01-01');
      fixture.componentInstance.view = 'month';
      config.dateFormatter = 'moment';
      config.dateFormats.month.foo = {
        angular: 'MMMM',
        moment: 'MMMM'
      };
      fixture.componentInstance.format = 'foo';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).to.equal('January');
    });
  }));

});
