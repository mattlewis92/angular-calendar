import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import * as moment from 'moment';
import {expect} from 'chai';
import {
  CalendarEventTitle,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT
} from './../angular2-calendar';
import {CalendarWeekView} from './../src/components/week/calendarWeekView.component';
import {Subject} from 'rxjs/Rx';
import {triggerDomEvent} from './util';

describe('calendarWeekView component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule]});
    TestBed.configureCompiler({
      providers: [
        CalendarEventTitle,
        {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter},
        {provide: MOMENT, useValue: moment}
      ]
    });
  });

  let eventTitle: CalendarEventTitle;
  beforeEach(inject([CalendarEventTitle], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the week view', () => {
    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    expect(fixture.componentInstance.days.length).to.equal(7);
    expect(fixture.componentInstance.days[0].date).to.deep.equal(moment('2016-06-26').toDate());
  });

  it('should emit on the dayClicked output', () => {
    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    fixture.detectChanges();
    fixture.componentInstance.dayClicked.subscribe(val => {
      expect(val).to.deep.equal({
        date: fixture.componentInstance.days[0].date
      });
    });
    fixture.nativeElement.querySelector('.cal-header').click();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      cssClass: 'foo',
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-event-container .cal-event').classList.contains('foo')).to.be.true;
    fixture.destroy();
  });

  it('should call the event clicked callback', () => {

    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: '<span>foo</span>',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe(val => {
      expect(val).to.deep.equal({event: fixture.componentInstance.events[0]});
    });
    title.click();

  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({viewDate: {}});
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

  it('should allow the event title to be customised by the calendarConfig provider', () => {

    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    eventTitle.week = (event: CalendarEvent) => {
      return `foo ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'bar',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('foo bar');

  });

  it('should allow the locale to be changed', () => {

    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.locale = 'de';
    fixture.componentInstance.viewDate = new Date();
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-header b').innerHTML.trim()).to.equal('Sonntag');

  });

  it('should show a tooltip on mouseover of the event', () => {

    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    eventTitle.weekTooltip = (event: CalendarEvent) => {
      return `title: ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'foo <b>bar</b>',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    const tooltip: Element = document.body.querySelector('.cal-tooltip');
    expect(tooltip.querySelector('.cal-tooltip-inner').innerHTML).to.equal('title: foo <b>bar</b>');
    expect(tooltip.classList.contains('cal-tooltip-bottom')).to.be.true;
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(document.body.querySelector('.cal-tooltip')).not.to.be.ok;

  });

  it('should disable the tooltip', () => {

    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    eventTitle.weekTooltip = () => '';
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'foo <b>bar</b>',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    expect(document.body.querySelector('.cal-tooltip')).not.to.be.ok;

  });

  it('should allow the start of the week to be changed', () => {
    const fixture: ComponentFixture<CalendarWeekView> = TestBed.createComponent(CalendarWeekView);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.weekStartsOn = 1;
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-day-headers b').innerText).to.deep.equal('Monday');
    fixture.destroy();
  });

});
