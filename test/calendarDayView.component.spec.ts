import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture,
  addProviders
} from '@angular/core/testing';
import * as moment from 'moment';
import {expect} from 'chai';
import {CalendarDayView, CalendarConfig, CalendarEvent} from './../angular2-calendar';
import {Subject} from 'rxjs/Rx';

describe('CalendarDayView component', () => {

  let config: CalendarConfig;
  beforeEach(() => {
    config = new CalendarConfig();
    addProviders([{provide: CalendarConfig, useValue: config}]);
  });

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should generate the day view', async(() => {
    builder.createAsync(CalendarDayView).then((fixture: ComponentFixture<CalendarDayView>) => {
      fixture.componentInstance.date = moment('2016-06-29').toDate();
      fixture.componentInstance.events = [{
        start: new Date('2016-06-29'),
        title: 'foo'
      }];
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      expect(fixture.componentInstance.view.events.length).to.equal(1);
      expect(fixture.componentInstance.view.events[0].event).to.equal(fixture.componentInstance.events[0]);
      expect(fixture.componentInstance.hours.length).to.equal(24);
    });
  }));

  xit('should emit on the eventClicked output', async(() => {
    builder.createAsync(CalendarDayView).then((fixture: ComponentFixture<CalendarDayView>) => {
      fixture.componentInstance.date = moment('2016-06-29').toDate();
      fixture.componentInstance.events = [{
        start: new Date('2016-06-29'),
        title: 'foo'
      }];
      fixture.componentInstance.ngOnChanges({date: fixture.componentInstance.date});
      fixture.detectChanges();
      fixture.componentInstance.eventClicked.subscribe(val => {
        expect(val).to.deep.equal({
          event: fixture.componentInstance.events[0].event
        });
      });
      fixture.nativeElement.querySelector('.header').click();
    });
  }));

  xit('should add a custom CSS class to events', async(() => {
    builder.createAsync(CalendarDayView).then((fixture: ComponentFixture<CalendarDayView>) => {
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

  xit('should call the event clicked callback', async(() => {

    builder.createAsync(CalendarDayView).then((fixture: ComponentFixture<CalendarDayView>) => {
      fixture.componentInstance.date = moment('2016-06-01').toDate();
      fixture.componentInstance.events = [{
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: '<span>foo</span>',
        color: {
          primary: 'blue'
        }
      }];
      fixture.componentInstance.ngOnChanges({date: {}, events: {}});
      fixture.detectChanges();
      const title: HTMLElement = fixture.nativeElement.querySelector('.event-title');
      expect(title.innerHTML).to.equal('<span>foo</span>');
      fixture.componentInstance.eventClicked.subscribe(val => {
        expect(val).to.deep.equal({event: fixture.componentInstance.events[0]});
      });
      title.click();
    });

  }));

  xit('should refresh the view when the refresh observable is emitted on', async(() => {
    builder.createAsync(CalendarDayView).then((fixture: ComponentFixture<CalendarDayView>) => {
      fixture.componentInstance.refresh = new Subject();
      fixture.componentInstance.ngOnInit();
      fixture.componentInstance.date = moment('2016-06-01').toDate();
      fixture.componentInstance.ngOnChanges({date: {}});
      const event: CalendarEvent = {
        start: new Date('2016-06-01'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'lightblue'
        }
      };
      fixture.componentInstance.events.push(event);
      fixture.componentInstance.refresh.next(true);
      expect(fixture.componentInstance.eventRows[0].row[0].event).to.deep.equal(event);
      fixture.destroy();
    });
  }));

  xit('should allow the event title to be customised by the calendarConfig provider', async(() => {

    builder.createAsync(CalendarDayView).then((fixture: ComponentFixture<CalendarDayView>) => {
      config.eventTitles.week = (event: CalendarEvent) => {
        return `foo ${event.title}`;
      };
      fixture.componentInstance.date = moment('2016-06-01').toDate();
      fixture.componentInstance.events = [{
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'bar',
        color: {
          primary: 'blue'
        }
      }];
      fixture.componentInstance.ngOnChanges({date: {}, events: {}});
      fixture.detectChanges();
      const title: HTMLElement = fixture.nativeElement.querySelector('.event-title');
      expect(title.innerHTML).to.equal('foo bar');
    });

  }));

});
