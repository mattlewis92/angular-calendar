import {
  inject,
  ComponentFixture,
  TestBed,
  async
} from '@angular/core/testing';
import * as moment from 'moment';
import { expect } from 'chai';
import {
  CalendarEventTitle,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT,
  CalendarEventTimesChangedEvent
} from './../src';
import { CalendarDayViewComponent } from './../src/components/day/calendarDayView.component';
import { Subject } from 'rxjs/Rx';
import { spy } from 'sinon';
import { triggerDomEvent } from './util';

describe('CalendarDayViewComponent component', () => {

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

  it('should generate the day view', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
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

  it('should call the event clicked callback', async(() => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
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
  }));

  it('should call the event clicked callback on all day events', async(() => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [{
      start: new Date('2016-06-29'),
      title: 'foo',
      allDay: true,
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
    fixture.nativeElement.querySelector('mwl-calendar-event-title a').click();
  }));

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
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

    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    fixture.detectChanges();
    fixture.componentInstance.hourSegmentClicked.subscribe(val => {
      expect(val).to.deep.equal({date: moment('2016-06-01').startOf('day').add(1, 'hour').add(30, 'minutes').toDate()});
    });
    fixture.nativeElement.querySelectorAll('.cal-hour-segment')[3].click();

  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
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
    expect(fixture.componentInstance.view.events[0].event).to.deep.equal(event);
    fixture.destroy();
  });

  it('should allow the event title to be customised by the calendarConfig provider', () => {

    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    eventTitle.day = (event: CalendarEvent) => {
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

  it('should update the hour grid and event list when the day start changes', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
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
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
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
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
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
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.hourSegmentModifier = segment => {
      segment.cssClass = 'foo';
    };
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-hour-segment').classList.contains('foo')).to.be.true;
    fixture.destroy();
  });

  it('should resize the event by dragging from the top edge', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      title: 'foo',
      color: {primary: '', secondary: ''},
      start: moment('2016-06-27').add(4, 'hours').toDate(),
      end: moment('2016-06-27').add(6, 'hours').toDate(),
      resizable: {
        beforeStart: true
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(event => {
      resizeEvent = event;
    });
    triggerDomEvent('mousedown', document.body, {clientY: rect.top, clientX: rect.left + 10});
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {clientY: rect.top - 30, clientX: rect.left + 10});
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 30);
    triggerDomEvent('mouseup', document.body, {clientY: rect.top - 30, clientX: rect.left + 10});
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').subtract(30, 'minutes').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').toDate()
    });
  });

  it('should resize the event by dragging from the bottom edge', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      title: 'foo',
      color: {primary: '', secondary: ''},
      start: moment('2016-06-27').add(4, 'hours').toDate(),
      end: moment('2016-06-27').add(6, 'hours').toDate(),
      resizable: {
        afterEnd: true
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(event => {
      resizeEvent = event;
    });
    triggerDomEvent('mousedown', document.body, {clientY: rect.bottom, clientX: rect.left + 10});
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {clientY: rect.bottom + 30, clientX: rect.left + 10});
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom + 30);
    expect(event.getBoundingClientRect().height).to.equal(150);
    triggerDomEvent('mouseup', document.body, {clientY: rect.top + 30, clientX: rect.left + 10});
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').add(30, 'minutes').toDate()
    });
  });

  it('should show a tooltip on mouseover of the event', () => {

    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    eventTitle.dayTooltip = (event: CalendarEvent) => {
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
    expect(tooltip.classList.contains('cal-tooltip-top')).to.be.true;
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(document.body.querySelector('.cal-tooltip')).not.to.be.ok;

  });

  it('should disable the tooltip', () => {

    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    eventTitle.dayTooltip = () => '';
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

  it('should allow events to be dragged and dropped', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      title: 'foo',
      color: {primary: '', secondary: ''},
      start: moment('2016-06-27').startOf('day').add(4, 'hours').toDate(),
      end: moment('2016-06-27').startOf('day').add(6, 'hours').toDate(),
      draggable: true
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    const eventPosition: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(event => {
      dragEvent = event;
    });
    triggerDomEvent('mousedown', event, {clientY: eventPosition.top + 5, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {clientY: eventPosition.top + 35, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(eventPosition.top + 30);
    expect(event.getBoundingClientRect().bottom).to.equal(eventPosition.bottom + 30);
    triggerDomEvent('mouseup', document.body, {clientY: eventPosition.top + 30, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').add(30, 'minutes').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').add(30, 'minutes').toDate()
    });
  });

  it('should not allow events to be dragged outside of the calendar', () => {
    const fixture: ComponentFixture<CalendarDayViewComponent> = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      title: 'foo',
      color: {primary: '', secondary: ''},
      start: moment('2016-06-27').startOf('day').add(4, 'hours').toDate(),
      end: moment('2016-06-27').startOf('day').add(6, 'hours').toDate(),
      draggable: true
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const calendarPosition: ClientRect = fixture.nativeElement.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {clientY: eventPosition.top + 5, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {clientY: calendarPosition.top, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(calendarPosition.top);
    expect(event.getBoundingClientRect().bottom).to.equal(calendarPosition.top + eventPosition.height);
    triggerDomEvent('mousemove', document.body, {clientY: calendarPosition.top - 60, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(calendarPosition.top);
    expect(event.getBoundingClientRect().bottom).to.equal(calendarPosition.top + eventPosition.height);
    triggerDomEvent('mouseup', document.body, {clientY: calendarPosition.top - 60, clientX: eventPosition.left + 10});
    fixture.detectChanges();
    fixture.destroy();
  });

});
