import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import * as moment from 'moment';
import {expect} from 'chai';
import {CalendarWeekView} from './../angular2-calendar';

describe('calendarWeekView component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should generate the week view', async(() => {
    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
      fixture.componentInstance.date = moment('2016-06-29').toDate();
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      expect(fixture.componentInstance.days.length).to.equal(7);
      expect(fixture.componentInstance.days[0].date.toDate()).to.deep.equal(moment('2016-06-26').toDate());
    });
  }));

});
