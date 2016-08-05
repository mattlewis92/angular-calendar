import {
  inject,
  async,
  TestComponentBuilder,
  ComponentFixture,
  addProviders
} from '@angular/core/testing';
import * as moment from 'moment';
import {expect} from 'chai';
import {
  CalendarWeekView,
  CalendarEventTitle,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter
} from './../angular2-calendar';
import {Subject} from 'rxjs/Rx';

describe('calendarWeekView component', () => {

  beforeEach(() => {
    addProviders([CalendarEventTitle, {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter}]);
  });

  let builder: TestComponentBuilder, eventTitle: CalendarEventTitle;
  beforeEach(inject([TestComponentBuilder, CalendarEventTitle], (tcb, _eventTitle_) => {
    builder = tcb;
    eventTitle = _eventTitle_;
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
      fixture.componentInstance.dayClicked.subscribe(val => {
        expect(val).to.deep.equal({
          date: fixture.componentInstance.days[0].date.toDate()
        });
      });
      fixture.nativeElement.querySelector('.cal-header').click();
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
      expect(fixture.nativeElement.querySelector('.cal-event-container .cal-event').classList.contains('foo')).to.be.true;
      fixture.destroy();
    });
  }));

  it('should call the event clicked callback', async(() => {

    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
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
      const title: HTMLElement = fixture.nativeElement.querySelector('.cal-event-title');
      expect(title.innerHTML).to.equal('<span>foo</span>');
      fixture.componentInstance.eventClicked.subscribe(val => {
        expect(val).to.deep.equal({event: fixture.componentInstance.events[0]});
      });
      title.click();
    });

  }));

  it('should refresh the view when the refresh observable is emitted on', async(() => {
    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
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

  it('should allow the event title to be customised by the calendarConfig provider', async(() => {

    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
      eventTitle.week = (event: CalendarEvent) => {
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
      const title: HTMLElement = fixture.nativeElement.querySelector('.cal-event-title');
      expect(title.innerHTML).to.equal('foo bar');
    });

  }));

  it('should allow the locale to be changed', async(() => {

    builder.createAsync(CalendarWeekView).then((fixture: ComponentFixture<CalendarWeekView>) => {
      fixture.componentInstance.locale = 'de';
      fixture.componentInstance.date = new Date();
      fixture.componentInstance.ngOnChanges({date: {}, events: {}});
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.cal-header b').innerHTML.trim()).to.equal('Sonntag');
    });

  }));

});
