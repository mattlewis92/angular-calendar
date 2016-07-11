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
      fixture.componentInstance.ngOnChanges({date: {}});
      expect(fixture.componentInstance.view.rowOffsets).to.deep.equal([0, 7, 14, 21, 28]);
      expect(fixture.componentInstance.view.days.length).to.equal(35);
      expect(fixture.componentInstance.view.days[0].date.toDate()).to.deep.equal(moment('2016-05-29').toDate());
      fixture.destroy();
    });
  }));

  it('should open and close the slide box', async(() => {
    builder.createAsync(CalendarMonthView).then((fixture: ComponentFixture<CalendarMonthView>) => {
      expect(fixture.componentInstance.openRowIndex).to.be.undefined;
      expect(fixture.componentInstance.openDay).to.be.undefined;
      fixture.componentInstance.date = moment().startOf('month').startOf('week').add(8, 'days').toDate();
      fixture.componentInstance.slideBoxIsOpen = true;
      fixture.componentInstance.ngOnChanges({date: {}, slideBoxIsOpen: {}});
      expect(fixture.componentInstance.openRowIndex).to.equal(7);
      expect(fixture.componentInstance.openDay).to.equal(fixture.componentInstance.view.days[8]);
      fixture.componentInstance.slideBoxIsOpen = false;
      fixture.componentInstance.ngOnChanges({date: {}, slideBoxIsOpen: {}});
      expect(fixture.componentInstance.openRowIndex).not.to.be.ok;
      expect(fixture.componentInstance.openDay).not.to.be.ok;
      fixture.destroy();
    });
  }));

  it('should add a custom CSS class to events', () => {
    builder.createAsync(CalendarMonthView).then((fixture: ComponentFixture<CalendarMonthView>) => {
      fixture.componentInstance.date = moment('2016-06-27').toDate();
      fixture.componentInstance.events = [{
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue'
        }
      }];
      fixture.componentInstance.ngOnChanges({date: {}, events: {}});
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.days .cell-row .cell:nth-child(4) .events .event').classList.contains('foo')).to.be.true;
      fixture.destroy();
    });
  });

});
