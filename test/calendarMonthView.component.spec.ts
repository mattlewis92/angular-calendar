import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import * as moment from 'moment';
import {expect} from 'chai';
import {CalendarMonthView} from './../angular2-calendar';

describe('calendarMonthView component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should generate the month view', async(() => {
    builder.createAsync(CalendarMonthView).then((fixture: ComponentFixture<CalendarMonthView>) => {
      fixture.componentInstance.date = moment('2016-06-27').toDate();
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      expect(fixture.componentInstance.monthOffsets).to.deep.equal([0, 7, 14, 21, 28]);
      expect(fixture.componentInstance.days.length).to.equal(35);
      expect(fixture.componentInstance.days[0].date.toDate()).to.deep.equal(moment('2016-05-29').toDate());
    });
  }));

});
