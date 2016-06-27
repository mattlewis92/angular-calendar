import {
  describe,
  it,
  expect,
  beforeEach,
  inject,
  async
} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import * as moment from 'moment';
import {CalendarMonthView} from './../angular2-calendar';

describe('hello-world component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should be a test', async(() => {
    builder.createAsync(CalendarMonthView).then((fixture: ComponentFixture<CalendarMonthView>) => {
      fixture.componentInstance.date = moment('2016-06-27').toDate();
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      expect(fixture.componentInstance.monthOffsets).toEqual([0, 7, 14, 21, 28]);
      expect(fixture.componentInstance.days.length).toEqual(35);
      expect(fixture.componentInstance.days[0].date.toDate()).toEqual(moment('2016-05-29').toDate());
    });
  }));

});
