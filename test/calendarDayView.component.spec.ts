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
  CalendarModule
} from './../angular2-calendar';
import {CalendarDayView} from './../src/components/day/calendarDayView.component';
import {Subject} from 'rxjs/Rx';
import {spy} from 'sinon';

describe('CalendarDayView component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule]});
    TestBed.configureCompiler({
      providers: [CalendarEventTitle, {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter}]
    });
  });

  let eventTitle: CalendarEventTitle;
  beforeEach(inject([CalendarEventTitle], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the day view', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-29').toDate();
    fixture.componentInstance.events = [{
      start: new Date('2016-06-29'),
      title: 'foo',
      color: {
        primary: '',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    expect(fixture.componentInstance.view.events.length).to.equal(1);
    expect(fixture.componentInstance.view.events[0].event).to.equal(fixture.componentInstance.events[0]);
    expect(fixture.componentInstance.hours.length).to.equal(24);
  });

  it('should call the event clicked callback', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-29').toDate();
    fixture.componentInstance.events = [{
      start: new Date('2016-06-29'),
      title: 'foo',
      color: {
        primary: '',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    fixture.componentInstance.eventClicked.subscribe(val => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0]
      });
    });
    fixture.nativeElement.querySelector('.cal-event a').click();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-01').toDate();
    fixture.componentInstance.events = [{
      start: new Date('2016-06-01'),
      cssClass: 'foo',
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-event').classList.contains('foo')).to.be.true;
    fixture.destroy();
  });

  it('should call the hour segment clicked callback', () => {

    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-01').toDate();
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    fixture.detectChanges();
    fixture.componentInstance.hourSegmentClicked.subscribe(val => {
      expect(val).to.deep.equal({date: moment('2016-06-01').startOf('day').add(1, 'hour').add(30, 'minutes').toDate()});
    });
    fixture.nativeElement.querySelectorAll('.cal-hour-segment')[3].click();

  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = moment('2016-06-01').toDate();
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
    expect(fixture.componentInstance.view.events[0].event).to.deep.equal(event);
    fixture.destroy();
  });

  it('should allow the event title to be customised by the calendarConfig provider', () => {

    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    eventTitle.day = (event: CalendarEvent) => {
      return `foo ${event.title}`;
    };
    fixture.componentInstance.viewDate = moment('2016-06-01').toDate();
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

  it('should update the hour grid and event list when the day start changes', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-29').toDate();
    fixture.componentInstance.events = [{
      start: new Date('2016-06-29'),
      title: 'foo',
      color: {
        primary: '',
        secondary: ''
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.componentInstance.hours.length).to.equal(24);
    expect(fixture.componentInstance.view.events.length).to.equal(1);
    fixture.componentInstance.dayStartHour = 6;
    fixture.componentInstance.ngOnChanges({dayStartHour: {}});
    expect(fixture.componentInstance.hours.length).to.equal(18);
    expect(fixture.componentInstance.view.events.length).to.equal(0);
  });

  it('should add event actions to each event', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-27').toDate();
    fixture.componentInstance.events = [{
      start: new Date('2016-06-26'),
      end: new Date('2016-06-28'),
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      },
      actions: [{
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: spy(),
        cssClass: 'foo'
      }]
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector('.cal-event .cal-event-action');
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.be.true;
    action.click();
    expect(fixture.componentInstance.events[0].actions[0].onClick).to.have.been.calledWith({event: fixture.componentInstance.events[0]});
  });

  it('should allow the event width to be customised', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-01').toDate();
    fixture.componentInstance.events = [{
      start: new Date('2016-06-01'),
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.eventWidth = 300;
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}, eventWidth: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-event').style.width).to.equal('299px');
    fixture.destroy();
  });

  it('should add a custom CSS class to days via the hour segment modifier', () => {
    const fixture: ComponentFixture<CalendarDayView> = TestBed.createComponent(CalendarDayView);
    fixture.componentInstance.viewDate = moment('2016-06-27').toDate();
    fixture.componentInstance.hourSegmentModifier = segment => {
      segment.cssClass = 'foo';
    };
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-hour-segment').classList.contains('foo')).to.be.true;
    fixture.destroy();
  });

});
