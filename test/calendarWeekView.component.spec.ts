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

  it('should emit on the dayClicked output', async(() => {
    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
      fixture.componentInstance.date = moment('2016-06-29').toDate();
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      fixture.detectChanges();
      fixture.componentInstance.onDayClicked.subscribe(val => {
        expect(val).to.deep.equal({
          date: fixture.componentInstance.days[0].date.toDate()
        });
      });
      fixture.nativeElement.querySelector('.header').click();
    });
  }));

  it('should add a custom CSS class to events', async(() => {
    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
      fixture.componentInstance.date = moment('2016-06-01').toDate();
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
      expect(fixture.nativeElement.querySelector('.event-container .event').classList.contains('foo')).to.be.true;
      fixture.destroy();
    });
  }));

});
