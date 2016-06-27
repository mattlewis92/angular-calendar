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
import {CalendarWeekView} from './../angular2-calendar';

describe('calendarWeekView component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should be a test', async(() => {
    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
      fixture.componentInstance.date = moment('2016-06-29').toDate();
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      expect(fixture.componentInstance.days.length).toEqual(7);
      expect(fixture.componentInstance.days[0].date.toDate()).toEqual(moment('2016-06-26').toDate());
    });
  }));

});
