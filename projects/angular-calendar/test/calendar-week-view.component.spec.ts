import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import moment from 'moment';
import { expect } from 'chai';
import {
  CalendarEventTitleFormatter,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK,
  CalendarWeekViewComponent,
  DateAdapter,
  CalendarWeekViewBeforeRenderEvent,
} from '../src';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { Subject } from 'rxjs';
import * as sinon from 'sinon';
import { triggerDomEvent, ExternalEventComponent } from './util';
import { take } from 'rxjs/operators';
import { adapterFactory } from '../src/date-adapters/date-fns';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as fakeTimers from '@sinonjs/fake-timers';
import { formatDate } from '@angular/common';

@Component({
  template: `
    <mwl-calendar-week-view
      [viewDate]="viewDate"
      [events]="events"
      (eventTimesChanged)="eventTimesChanged($event)"
    ></mwl-calendar-week-view>
    <mwl-external-event></mwl-external-event>
  `,
})
class TestComponent {
  viewDate: Date;
  events: CalendarEvent[];
  eventTimesChanged = sinon.spy();
}

describe('calendarWeekView component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot(
          {
            provide: DateAdapter,
            useFactory: adapterFactory,
          },
          {
            dateFormatter: {
              provide: CalendarDateFormatter,
              useClass: CalendarMomentDateFormatter,
            },
          }
        ),
        DragAndDropModule,
      ],
      declarations: [ExternalEventComponent, TestComponent],
      providers: [{ provide: MOMENT, useValue: moment }],
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(inject([CalendarEventTitleFormatter], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the week view', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(7);
    expect(fixture.componentInstance.days[0].date).to.deep.equal(
      moment('2016-06-26').toDate()
    );
  });

  it('should generate the week view without excluded days', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(5);
    fixture.destroy();
  });

  it('should update the week view when excluded days changed', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.ngOnChanges({ excludeDays: {} });
    expect(fixture.componentInstance.days.length).to.equal(5);
    expect(fixture.nativeElement.querySelector('.cal-weekend')).to.equal(null);

    fixture.componentInstance.excludeDays = [1];
    fixture.componentInstance.ngOnChanges({ excludeDays: [] });
    fixture.detectChanges();
    expect(fixture.componentInstance.days.length).to.equal(6);
    expect(fixture.nativeElement.querySelector('.cal-weekend')).not.to.equal(
      null
    );

    fixture.destroy();
  });

  it('should support excluding non consecutive days', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [4, 6];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(5);
    fixture.destroy();
  });

  it('should support excluding all but 1 day', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.excludeDays = [0, 1, 2, 3, 4, 5];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.days.length).to.equal(1);
    fixture.destroy();
  });

  it('should generate the week view with default colors for events', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();

    const computedStyles: CSSStyleDeclaration = window.getComputedStyle(
      fixture.nativeElement.querySelector('.cal-event')
    );
    expect(computedStyles.getPropertyValue('background-color')).to.equal(
      'rgb(209, 232, 255)'
    );
    expect(computedStyles.getPropertyValue('border-color')).to.equal(
      'rgb(30, 144, 255)'
    );
    expect(computedStyles.getPropertyValue('color')).to.equal(
      'rgb(30, 144, 255)'
    );
    fixture.destroy();
  });

  it('should emit on the dayHeaderClicked output', (done) => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    fixture.componentInstance.dayHeaderClicked.subscribe((val) => {
      expect(val).to.deep.equal({
        day: fixture.componentInstance.days[0],
        sourceEvent: window['event'],
      });
      done();
    });
    fixture.nativeElement.querySelector('.cal-header').click();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-event-container')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should call the event clicked callback', (done) => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: '<span>foo</span>',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe((val) => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0],
        sourceEvent: window['event'],
      });
      done();
    });
    title.click();
  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const event: CalendarEvent = {
      start: new Date('2016-06-01'),
      end: new Date('2016-06-02'),
      title: 'foo',
      allDay: true,
    };
    fixture.componentInstance.events.push(event);
    fixture.componentInstance.refresh.next(true);
    expect(
      fixture.componentInstance.view.allDayEventRows[0].row[0].event
    ).to.deep.equal(event);
    fixture.destroy();
  });

  it('should allow the event title to be customised', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    eventTitle.week = (event: CalendarEvent) => {
      return `foo ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'bar',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event-title');
    expect(title.innerHTML).to.equal('foo bar');
  });

  it('should allow the locale to be changed', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.locale = 'de';
    fixture.componentInstance.viewDate = new Date();
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-header b').innerHTML.trim()
    ).to.equal('Sonntag');
  });

  it('should show a tooltip on mouseover of the event', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    eventTitle.weekTooltip = (e: CalendarEvent) => {
      return `title: ${e.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    const tooltip: HTMLElement = document.body.querySelector(
      '.cal-tooltip'
    ) as HTMLElement;
    expect(tooltip.querySelector('.cal-tooltip-inner').innerHTML).to.equal(
      'title: foo <b>bar</b>'
    );
    expect(tooltip.classList.contains('cal-tooltip-top')).to.equal(true);
    expect(!!tooltip.style.top).to.equal(true);
    expect(!!tooltip.style.left).to.equal(true);
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    fixture.destroy();
  }));

  it('should disable the tooltip', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    eventTitle.weekTooltip = () => '';
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    fixture.destroy();
  }));

  it('should hide the tooltip when dragging', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    eventTitle.weekTooltip = (e: CalendarEvent) => {
      return `title: ${e.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: '',
        },
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    expect(document.body.querySelector('.cal-tooltip')).to.be.ok;
    const eventPosition = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top + 100,
    });
    fixture.detectChanges();
    expect(document.body.querySelector('.cal-tooltip')).not.to.be.ok;
    fixture.destroy();
  }));

  it('should allow the start of the week to be changed', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.weekStartsOn = 1;
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-day-headers b').innerText
    ).to.deep.equal('Monday');
    fixture.destroy();
  });

  it('should resize the all day event by dragging from the left edge', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27').add(4, 'hours').toDate(),
        end: moment('2016-06-27').add(6, 'hours').toDate(),
        resizable: {
          beforeStart: true,
        },
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    const resizeHandle = event.querySelector('.cal-resize-handle-before-start');
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', resizeHandle, {
      clientX: rect.left - dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left - dayWidth)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mouseup', resizeHandle, {
      clientX: rect.left - dayWidth,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .subtract(1, 'day')
        .toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').toDate(),
    });
  });

  it('should resize the all day event by dragging from the right edge', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27').add(4, 'hours').toDate(),
        end: moment('2016-06-27').add(6, 'hours').toDate(),
        resizable: {
          afterEnd: true,
        },
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientX: rect.right,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientX: rect.right + dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mouseup', handle, {
      clientX: rect.right + dayWidth,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').add(1, 'day').toDate(),
    });
  });

  it('should validate resizing all day events from the right end', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-06-27').add(4, 'hours').toDate(),
        end: moment('2016-06-27').add(6, 'hours').toDate(),
        resizable: {
          afterEnd: true,
        },
        allDay: true,
      },
    ];
    const validateEventTimesChanged = sinon
      .stub()
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false);
    fixture.componentInstance.validateEventTimesChanged =
      validateEventTimesChanged;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientX: rect.right,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientX: rect.right + dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mousemove', handle, {
      clientX: rect.right + dayWidth * 2,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mouseup', handle, {
      clientX: rect.right + dayWidth * 2,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').add(1, 'day').toDate(),
    });
    expect(validateEventTimesChanged).to.have.been.calledTwice;
    expect(validateEventTimesChanged.getCall(0).args[0]).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').add(1, 'day').toDate(),
    });
    expect(validateEventTimesChanged.getCall(1).args[0]).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').toDate(),
      newEnd: moment('2016-06-27').add(6, 'hours').add(2, 'day').toDate(),
    });
  });

  it('should validate resizing all day events from the left end', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2020-05-20');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment(fixture.componentInstance.viewDate)
          .add(4, 'hours')
          .toDate(),
        end: moment(fixture.componentInstance.viewDate)
          .add(6, 'hours')
          .toDate(),
        resizable: {
          beforeStart: true,
        },
        allDay: true,
      },
    ];
    const validateEventTimesChanged = sinon
      .stub()
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false);
    fixture.componentInstance.validateEventTimesChanged =
      validateEventTimesChanged;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-before-start'
    );
    triggerDomEvent('mousedown', handle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientX: rect.left - dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left - dayWidth)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mousemove', handle, {
      clientX: rect.left - dayWidth * 2,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left - dayWidth)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mouseup', handle, {
      clientX: rect.left - dayWidth * 2,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .subtract(1, 'day')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end).toDate(),
    });
    expect(validateEventTimesChanged).to.have.been.calledTwice;
    expect(validateEventTimesChanged.getCall(0).args[0]).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .subtract(1, 'day')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end).toDate(),
    });
    expect(validateEventTimesChanged.getCall(1).args[0]).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .subtract(2, 'day')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end).toDate(),
    });
  });

  it('should resize all day events with no end date', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27').add(4, 'hours').toDate(),
        resizable: {
          afterEnd: true,
        },
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientX: rect.right,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientX: rect.right + dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mouseup', handle, {
      clientX: rect.right + dayWidth,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27').add(4, 'hours').toDate(),
      newEnd: moment('2016-06-27').add(4, 'hours').add(1, 'day').toDate(),
    });
  });

  it('should allow the all day event to be dragged and dropped', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-08');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-12-08').add(4, 'hours').toDate(),
        end: moment('2016-12-08').add(6, 'hours').toDate(),
        draggable: true,
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    // remove the header as it was causing the test to fail
    const header: HTMLElement =
      fixture.nativeElement.querySelector('.cal-day-headers');
    header.parentNode.removeChild(header);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged
      .pipe(take(1))
      .subscribe(eventDropped);
    triggerDomEvent('mousedown', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: eventPosition.left - 100,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    const ghostElement = event.nextSibling as HTMLElement;
    expect(Math.round(ghostElement.getBoundingClientRect().left)).to.equal(
      Math.round(eventPosition.left - dayWidth) + 1
    );
    triggerDomEvent('mouseup', document.body, {
      clientX: eventPosition.left - dayWidth,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(eventDropped.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-12-07').add(4, 'hours').toDate(),
      newEnd: moment('2016-12-07').add(6, 'hours').toDate(),
      allDay: true,
    });
    expect(eventDropped).to.have.been.calledOnce;
  });

  it('should allow the all day event to be dragged and dropped and control where it can be dragged', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-08');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-12-08').add(4, 'hours').toDate(),
        end: moment('2016-12-08').add(6, 'hours').toDate(),
        draggable: true,
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    // remove the header as it was causing the test to fail
    const header: HTMLElement =
      fixture.nativeElement.querySelector('.cal-day-headers');
    header.parentNode.removeChild(header);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const eventDropped = sinon.spy();
    const validateEventTimesChanged = sinon
      .stub()
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false);
    fixture.componentInstance.validateEventTimesChanged =
      validateEventTimesChanged;
    fixture.componentInstance.eventTimesChanged
      .pipe(take(1))
      .subscribe(eventDropped);
    triggerDomEvent('mousedown', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: eventPosition.left - dayWidth,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    const ghostElement = event.nextSibling as HTMLElement;
    expect(Math.round(ghostElement.getBoundingClientRect().left)).to.equal(
      Math.round(eventPosition.left - dayWidth) + 1
    );
    triggerDomEvent('mousemove', document.body, {
      clientX: eventPosition.left - dayWidth * 2,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    expect(Math.round(ghostElement.getBoundingClientRect().left)).to.equal(
      Math.round(eventPosition.left - dayWidth) + 1
    );
    triggerDomEvent('mouseup', document.body, {
      clientX: eventPosition.left - dayWidth * 2,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(eventDropped.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-12-07').add(4, 'hours').toDate(),
      newEnd: moment('2016-12-07').add(6, 'hours').toDate(),
      allDay: true,
    });
    expect(eventDropped).to.have.been.calledOnce;
    expect(validateEventTimesChanged).to.have.been.calledTwice;
    expect(validateEventTimesChanged.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-12-07').add(4, 'hours').toDate(),
      newEnd: moment('2016-12-07').add(6, 'hours').toDate(),
    });
    expect(validateEventTimesChanged.getCall(1).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-12-06').add(4, 'hours').toDate(),
      newEnd: moment('2016-12-06').add(6, 'hours').toDate(),
    });
  });

  it('should allow all day events to be dragged outside of the calendar', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-08');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-12-08').add(4, 'hours').toDate(),
        end: moment('2016-12-08').add(6, 'hours').toDate(),
        draggable: true,
        allDay: true,
      },
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    // remove the header as it was causing the test to fail
    const header: HTMLElement =
      fixture.nativeElement.querySelector('.cal-day-headers');
    header.parentNode.removeChild(header);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const calendarPosition: ClientRect =
      fixture.nativeElement.getBoundingClientRect();
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged
      .pipe(take(1))
      .subscribe(eventDropped);
    triggerDomEvent('mousedown', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: eventPosition.left - 50,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    const ghostElement = event.nextSibling as HTMLElement;
    expect(Math.round(ghostElement.getBoundingClientRect().left)).to.equal(
      Math.round(eventPosition.left - 50)
    );
    triggerDomEvent('mousemove', document.body, {
      clientX: calendarPosition.left - 50,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: calendarPosition.left - 50,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(eventDropped).not.to.have.been.called;
  });

  it('should round all day event drag sizes to the event snap size when dragging and dropping non snapped events', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-08');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-12-08').add(4, 'hours').toDate(),
        end: moment('2016-12-08').add(6, 'hours').toDate(),
        draggable: true,
        allDay: true,
      },
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    // remove the header as it was causing the test to fail
    const header: HTMLElement =
      fixture.nativeElement.querySelector('.cal-day-headers');
    header.parentNode.removeChild(header);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged
      .pipe(take(1))
      .subscribe(eventDropped);
    triggerDomEvent('mousedown', event, {
      clientX: eventPosition.left,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    const dragLeft = event.parentElement.offsetWidth / 7;
    triggerDomEvent('mousemove', document.body, {
      clientX: eventPosition.left - dragLeft,
      clientY: eventPosition.top,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: eventPosition.left - dragLeft,
      clientY: eventPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(eventDropped.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-12-07').add(4, 'hours').toDate(),
      newEnd: moment('2016-12-07').add(6, 'hours').toDate(),
      allDay: true,
    });
    expect(eventDropped).to.have.been.calledOnce;
  });

  it('should not allow all day events to be resized smaller than 1 day', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-06-27').add(4, 'hours').toDate(),
        end: moment('2016-06-27').add(6, 'hours').toDate(),
        resizable: {
          beforeStart: true,
        },
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-before-start'
    );
    triggerDomEvent('mousedown', handle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientX: rect.left + dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width)
    );
    triggerDomEvent('mouseup', handle, {
      clientX: rect.left - dayWidth,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should not allow all day events to be resized outside of the current view', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-06-27').add(4, 'hours').toDate(),
        end: moment('2016-06-27').add(6, 'hours').toDate(),
        resizable: {
          beforeStart: true,
        },
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth / 7;
    const rect: ClientRect = event.getBoundingClientRect();
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-before-start'
    );
    triggerDomEvent('mousedown', handle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientX: rect.left - dayWidth,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left - dayWidth)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mousemove', handle, {
      clientX: rect.left - dayWidth * 2,
      clientY: rect.top,
    });
    fixture.detectChanges();
    expect(Math.round(event.getBoundingClientRect().left)).to.equal(
      Math.round(rect.left - dayWidth)
    );
    expect(Math.round(event.getBoundingClientRect().width)).to.equal(
      Math.round(rect.width + dayWidth)
    );
    triggerDomEvent('mouseup', handle, {
      clientX: rect.left - dayWidth * 2,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should allow external events to be dropped on the week view headers', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [];
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const externalEventFixture = fixture.debugElement.query(
      By.directive(ExternalEventComponent)
    );

    const event: HTMLElement =
      externalEventFixture.nativeElement.querySelector('.external-event');
    const eventPosition: ClientRect = event.getBoundingClientRect();

    const headers: any[] = Array.from(
      fixture.nativeElement.querySelectorAll('.cal-header')
    );
    const header: HTMLElement = headers[2];
    const headerPosition: ClientRect = header.getBoundingClientRect();

    const eventDropped = fixture.componentInstance.eventTimesChanged;
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top,
      clientX: eventPosition.left,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: headerPosition.top,
      clientX: headerPosition.left,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientY: headerPosition.top,
      clientX: headerPosition.left,
      button: 0,
    });
    fixture.detectChanges();
    expect(eventDropped).to.have.been.calledWith({
      type: 'drop',
      event: externalEventFixture.componentInstance.event,
      newStart: moment('2016-06-27').startOf('week').add(2, 'days').toDate(),
      allDay: true,
    });
    expect(eventDropped).to.have.been.calledOnce;
  });

  it('should allow the weekend days to be customised', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-06-25');
    fixture.componentInstance.weekendDays = [
      DAYS_OF_WEEK.FRIDAY,
      DAYS_OF_WEEK.SATURDAY,
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, weekendDays: {} });
    fixture.detectChanges();
    const headerCells: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.cal-header');
    expect(headerCells[0].classList.contains('cal-weekend')).to.equal(false);
    expect(headerCells[5].classList.contains('cal-weekend')).to.equal(true);
    expect(headerCells[6].classList.contains('cal-weekend')).to.equal(true);
    fixture.destroy();
  });

  it('should add a custom CSS class to headers via the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(({ header }) => {
        header[0].cssClass = 'foo';
      });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-header')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should log on invalid events', () => {
    const stub = sinon.stub(console, 'warn');
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.events = [
      { start: 1234, title: '', color: { primary: '', secondary: '' } },
    ] as any;
    fixture.componentInstance.viewDate = new Date('2017-01-01');
    fixture.componentInstance.ngOnChanges({ events: {}, viewDate: {} });
    fixture.detectChanges();
    stub.restore();
    expect(stub).to.have.been.calledOnce; // eslint-disable-line
  });

  it('should only call the beforeViewRender output once when refreshing the view', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    const beforeViewRenderCalled = sinon.spy();
    // use subscription to test that it was only called a max of one times
    const subscription = fixture.componentInstance.beforeViewRender.subscribe(
      beforeViewRenderCalled
    );
    fixture.componentInstance.refresh.next(true);
    expect(beforeViewRenderCalled).to.have.been.calledOnce;
    subscription.unsubscribe();
    fixture.destroy();
  });

  it('should only call the beforeViewRender output once when changing the view date', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const beforeViewRenderCalled = sinon.spy();
    // use subscription to test that it was only called a max of one times
    const subscription = fixture.componentInstance.beforeViewRender.subscribe(
      beforeViewRenderCalled
    );
    fixture.componentInstance.viewDate = new Date('2016-06-28');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(beforeViewRenderCalled).to.have.been.calledOnce;
    subscription.unsubscribe();
    fixture.destroy();
  });

  it('should expose the view period on the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const data = beforeViewRenderCalled.getCall(0).args[0];
    expect(data.period.start).to.be.an.instanceOf(Date);
    expect(data.period.end).to.be.an.instanceOf(Date);
    expect(Array.isArray(data.period.events)).to.equal(true);
    expect(Array.isArray(data.allDayEventRows)).to.be.true;
    expect(Array.isArray(data.hourColumns)).to.be.true;
  });

  it('should add event actions to each event', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    const eventClicked = sinon.spy();
    fixture.componentInstance.eventClicked.subscribe(eventClicked);
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'foo',
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: sinon.spy(),
            cssClass: 'foo',
          },
        ],
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event .cal-event-action'
    );
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.equal(true);
    action.querySelector('i').click();
    const actionSpy = fixture.componentInstance.events[0].actions[0]
      .onClick as sinon.SinonSpy;
    expect(actionSpy.getCall(0).args[0].event).to.equal(
      fixture.componentInstance.events[0]
    );
    expect(actionSpy.getCall(0).args[0].sourceEvent instanceof MouseEvent).to.be
      .true;
    expect(eventClicked).not.to.have.been.called;
  });

  it('should make a 4 day week', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.daysInWeek = 4;
    fixture.componentInstance.events = [
      {
        start: new Date('2018-07-29'),
        title: 'foo',
        allDay: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({
      daysInWeek: {},
      events: {},
      viewDate: {},
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('.cal-header').length
    ).to.equal(4);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.cal-all-day-events .cal-day-column'
      ).length
    ).to.equal(4);
    expect(
      fixture.nativeElement.querySelectorAll('.cal-time-events .cal-day-column')
        .length
    ).to.equal(4);
  });

  it('should resize a time event from the end to another day on the right', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom + 90,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top);
    expect(event.getBoundingClientRect().height).to.equal(1259);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(events[0]).to.equal(event);
    expect(events[1].getBoundingClientRect().top).to.equal(rect.top - 180);
    expect(events[1].getBoundingClientRect().height).to.equal(1170);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom + 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(1, 'day')
        .add(19, 'hours')
        .add(30, 'minutes')
        .toDate(),
    });
  });

  it('should control resizing time events', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    const validateEventTimesChanged = sinon
      .stub()
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false);
    fixture.componentInstance.validateEventTimesChanged =
      validateEventTimesChanged;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right,
      clientY: rect.bottom + 90,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 90);
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right,
      clientY: rect.bottom + 180,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 90);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom + 180,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(90, 'minutes')
        .toDate(),
    });
    expect(validateEventTimesChanged).to.have.been.calledTwice;
    expect(validateEventTimesChanged.getCall(0).args[0]).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(90, 'minutes')
        .toDate(),
    });
    expect(validateEventTimesChanged.getCall(1).args[0]).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(180, 'minutes')
        .toDate(),
    });
  });

  it('should resize a time event from the end to another day on the left when using rtl', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.nativeElement.setAttribute('dir', 'rtl');
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right - dayWidth,
      clientY: rect.bottom,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom + 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(1, 'day')
        .toDate(),
    });
  });

  it('should resize a time event from the end to another day on the left', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'day')
          .add(19, 'hours')
          .add(30, 'minutes')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[1];
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right - dayWidth,
      clientY: rect.bottom - 90,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().width).to.equal(0);
    expect(event.getBoundingClientRect().height).to.equal(0);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(events[1]).to.equal(event);
    expect(events[0].getBoundingClientRect().top).to.equal(rect.top + 180);
    expect(events[0].getBoundingClientRect().height).to.equal(900);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right - dayWidth,
      clientY: rect.bottom - 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(18, 'hours')
        .toDate(),
    });
  });

  it('should resize a time event from the end to another day on the right when using rtl', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.nativeElement.setAttribute('dir', 'rtl');
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'day')
          .add(19, 'hours')
          .add(30, 'minutes')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[1];
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].end)
        .subtract(1, 'day')
        .toDate(),
    });
  });

  it('should resize a time event from the end and not allow it to end before it starts', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'day')
          .add(19, 'hours')
          .add(30, 'minutes')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[1];
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right - dayWidth * 2,
      clientY: rect.bottom - 1000,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().width).to.equal(0);
    expect(event.getBoundingClientRect().height).to.equal(0);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(events[1]).to.equal(event);
    expect(events[0].getBoundingClientRect().top).to.equal(rect.top + 180);
    expect(events[0].getBoundingClientRect().height).to.equal(30);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right - dayWidth * 2,
      clientY: rect.bottom - 1000,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].start)
        .add(30, 'minutes')
        .toDate(),
    });
  });

  it('should resize a time event from the start to another day on the left', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-30');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-30'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-30'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          beforeStart: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-before-start');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.left - dayWidth,
      clientY: rect.top - 90,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 180);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 180);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(events[1]).to.equal(event);
    expect(events[0].getBoundingClientRect().top).to.equal(rect.top - 90);
    expect(events[0].getBoundingClientRect().height).to.equal(1349);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.left - dayWidth,
      clientY: rect.top - 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .subtract(1, 'days')
        .subtract(90, 'minutes')
        .toDate(),
      newEnd: fixture.componentInstance.events[0].end,
    });
  });

  it('should resize a time event from the start to another day on the right', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-30');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-30'))
          .startOf('day')
          .add(3, 'hours')
          .subtract(1, 'days')
          .subtract(90, 'minutes')
          .toDate(),
        end: moment(new Date('2018-07-30'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          beforeStart: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-before-start');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.left + dayWidth,
      clientY: rect.top + 90,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().width).to.equal(0);
    expect(event.getBoundingClientRect().height).to.equal(0);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(events[0]).to.equal(event);
    expect(events[1].getBoundingClientRect().top).to.equal(rect.top + 90);
    expect(events[1].getBoundingClientRect().height).to.equal(900);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.left + dayWidth,
      clientY: rect.top + 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment(new Date('2018-07-30'))
        .startOf('day')
        .add(3, 'hours')
        .toDate(),
      newEnd: fixture.componentInstance.events[0].end,
    });
  });

  it('should resize a time event and not allow it to start after it ends', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-30');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-30'))
          .startOf('day')
          .add(3, 'hours')
          .subtract(1, 'days')
          .subtract(90, 'minutes')
          .toDate(),
        end: moment(new Date('2018-07-30'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          beforeStart: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-before-start');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.left + dayWidth * 2,
      clientY: rect.top + 90,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().width).to.equal(0);
    expect(event.getBoundingClientRect().height).to.equal(0);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(events[0]).to.equal(event);
    // locally the top comes out as 1107 but on the CI it's 1106
    expect(events[1].getBoundingClientRect().top).to.closeTo(1106, 1);
    expect(events[1].getBoundingClientRect().height).to.equal(30);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.left + dayWidth * 2,
      clientY: rect.top + 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].end)
        .subtract(30, 'minutes')
        .toDate(),
      newEnd: fixture.componentInstance.events[0].end,
    });
  });

  it('should drag time events to different days and columns while snapping to a grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'days')
          .toDate(),
        title: 'bar',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const dayWidth: number = events[0].parentElement.offsetWidth;
    const rect1: ClientRect = events[0].getBoundingClientRect();
    const rect2: ClientRect = events[1].getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', events[1], {
      clientX: rect2.right,
      clientY: rect2.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', events[1], {
      clientX: rect2.right + dayWidth - 5,
      clientY: rect2.bottom + 95,
    });
    fixture.detectChanges();
    expect(events[0].getBoundingClientRect().height).to.equal(0);
    expect(events[0].getBoundingClientRect().width).to.equal(0);
    const updatedEvents = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(updatedEvents[0]).to.equal(events[0]);
    expect(updatedEvents[1].getBoundingClientRect().top).to.equal(
      rect1.top + 90
    );
    expect(updatedEvents[1].getBoundingClientRect().height).to.equal(
      rect1.height - 90
    );
    expect(updatedEvents[2].getBoundingClientRect().top).to.equal(rect2.top);
    expect(updatedEvents[2].getBoundingClientRect().height).to.equal(
      rect2.height + 90
    );
    triggerDomEvent('mouseup', events[1], {
      clientX: rect2.right + dayWidth - 5,
      clientY: rect2.bottom + 95,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(1, 'day')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(1, 'day')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
    });
  });

  it('should control dragging time events', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    const validateEventTimesChanged = sinon
      .stub()
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false);
    fixture.componentInstance.validateEventTimesChanged =
      validateEventTimesChanged;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom + 95,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top + 90);
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom + 180,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top + 90);
    triggerDomEvent('mouseup', event, {
      clientX: rect.right,
      clientY: rect.bottom + 180,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(90, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(90, 'minutes')
        .toDate(),
    });
    expect(validateEventTimesChanged).to.have.been.calledTwice;
    expect(validateEventTimesChanged.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(90, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(90, 'minutes')
        .toDate(),
    });
    expect(validateEventTimesChanged.getCall(1).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(180, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(180, 'minutes')
        .toDate(),
    });
  });

  it('should drag time events back to their original position while snapping to a grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    const originalEvent = {
      start: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(3, 'hours')
        .toDate(),
      end: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(5, 'hours')
        .toDate(),
      title: 'foo',
      draggable: true,
    };
    fixture.componentInstance.events = [originalEvent];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom + 95,
    });
    fixture.detectChanges();
    const updatedEvent1 = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    expect(updatedEvent1.getBoundingClientRect().top).to.equal(rect.top + 90);
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom,
    });
    fixture.detectChanges();
    const updatedEvent2 = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    expect(updatedEvent2.getBoundingClientRect().top).to.equal(rect.top);
    triggerDomEvent('mouseup', event, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent.newStart).to.deep.equal(originalEvent.start);
    expect(dragEvent.newEnd).to.deep.equal(originalEvent.end);
  });

  it('should drag time events without end dates', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: rect.right + dayWidth - 5,
      clientY: rect.bottom + 95,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().height).to.equal(0);
    expect(event.getBoundingClientRect().width).to.equal(0);
    const updatedEvents = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    expect(updatedEvents[0]).to.equal(event);
    expect(updatedEvents[1].getBoundingClientRect().top).to.equal(
      rect.top + 90
    );
    expect(updatedEvents[1].getBoundingClientRect().height).to.equal(
      rect.height
    );
    triggerDomEvent('mouseup', event, {
      clientX: rect.right + dayWidth - 5,
      clientY: rect.bottom + 95,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(1, 'day')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
      newEnd: undefined,
    });
  });

  it('should drag time events to different days and columns while not snapping to a grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const dayWidth: number = events[0].parentElement.offsetWidth;
    const rect: ClientRect = events[0].getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', events[0], {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    const timeEvents = fixture.nativeElement.querySelector('.cal-time-events');
    triggerDomEvent('mousemove', timeEvents, {
      clientX: rect.left + dayWidth - 5,
      clientY: rect.top + 95,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', timeEvents, {
      clientX: rect.left + dayWidth - 5,
      clientY: rect.top + 95,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(1, 'day')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(1, 'day')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
    });
  });

  it('should drag time events back to their original position while not snapping to a grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    const originalEvent = {
      start: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(3, 'hours')
        .toDate(),
      end: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(5, 'hours')
        .toDate(),
      title: 'foo',
      draggable: true,
    };
    fixture.componentInstance.events = [originalEvent];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    const timeEvents = fixture.nativeElement.querySelector('.cal-time-events');
    fixture.detectChanges();
    triggerDomEvent('mousemove', timeEvents, {
      clientX: rect.left,
      clientY: rect.top + 95,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', timeEvents, {
      clientX: rect.left,
      clientY: rect.top,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', timeEvents, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent.newStart).to.deep.equal(originalEvent.start);
    expect(dragEvent.newEnd).to.deep.equal(originalEvent.end);
  });

  it('should drag an all day event onto the time grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'days')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(2, 'days')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
        allDay: true,
      },
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    const hourSegment = fixture.nativeElement.querySelectorAll(
      '.cal-day-columns mwl-calendar-week-view-hour-segment'
    )[3];
    const hourSegmentPosition = hourSegment.getBoundingClientRect();
    triggerDomEvent('mousemove', hourSegment, {
      clientX: hourSegmentPosition.left + 1,
      clientY: hourSegmentPosition.top + 1,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', hourSegment, {
      clientX: hourSegmentPosition.left + 1,
      clientY: hourSegmentPosition.top + 1,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drop',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(90, 'minutes')
        .toDate(),
    });
  });

  it('should drag a time event onto the all day grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(1, 'days')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(2, 'days')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
        allDay: false,
      },
      {
        start: moment(new Date('2018-07-29')).startOf('day').toDate(),
        allDay: true,
        title: 'bar',
      },
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector(
      '.cal-time-events .cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.left,
      clientY: rect.top,
      button: 0,
    });
    fixture.detectChanges();
    const dayColumn = fixture.nativeElement.querySelectorAll(
      '.cal-all-day-events .cal-day-column'
    )[2];
    const dayColumnPosition = dayColumn.getBoundingClientRect();
    triggerDomEvent('mousemove', dayColumn, {
      clientX: dayColumnPosition.left + 1,
      clientY: dayColumnPosition.top + 1,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', dayColumn, {
      clientX: dayColumnPosition.left + 1,
      clientY: dayColumnPosition.top + 1,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drop',
      allDay: true,
      event: fixture.componentInstance.events[0],
      newStart: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(2, 'days')
        .toDate(),
    });
  });

  it('should handle time event objects changing when resizing', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        id: '1',
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const dayWidth: number = event.parentElement.offsetWidth;
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom + 90,
    });
    fixture.detectChanges();
    fixture.componentInstance.events = [
      {
        ...fixture.componentInstance.events[0],
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right + dayWidth,
      clientY: rect.bottom + 90,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should drag time events to different days and columns while snapping to a grid and excluding weekends', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2019-03-01');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.daysInWeek = 4;
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2019-03-01'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2019-03-01'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
      excludeDays: {},
      daysInWeek: {},
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const dayWidth: number = events[0].parentElement.offsetWidth;
    const rect1: ClientRect = events[0].getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', events[0], {
      clientX: rect1.right,
      clientY: rect1.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', events[0], {
      clientX: rect1.right + dayWidth - 5,
      clientY: rect1.bottom + 95,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', events[0], {
      clientX: rect1.right + dayWidth - 5,
      clientY: rect1.bottom + 95,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(3, 'days')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(3, 'days')
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
    });
  });

  it('should drag time events to different days and columns when rtl is enabled', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.nativeElement.setAttribute('dir', 'rtl');
    fixture.componentInstance.viewDate = new Date('2019-03-01');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2019-03-01'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2019-03-01'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
      excludeDays: {},
      daysInWeek: {},
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const dayWidth: number = events[0].parentElement.offsetWidth;
    const rect1: ClientRect = events[0].getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', events[0], {
      clientX: rect1.right,
      clientY: rect1.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', events[0], {
      clientX: rect1.right + dayWidth,
      clientY: rect1.bottom,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', events[0], {
      clientX: rect1.right + dayWidth,
      clientY: rect1.bottom,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .subtract(1, 'days')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .subtract(1, 'days')
        .toDate(),
    });
  });

  it('should drag time events to different days and columns while snapping to a grid and excluding weekends with custom hour duration', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2019-03-01');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.daysInWeek = 4;
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2019-03-01'))
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment(new Date('2019-03-01'))
          .startOf('day')
          .add(18, 'hours')
          .toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    fixture.componentInstance.hourDuration = 40;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
      excludeDays: {},
      daysInWeek: {},
      hourColumns: {},
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const dayWidth: number = events[0].parentElement.offsetWidth;
    const rect1: ClientRect = events[0].getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', events[0], {
      clientX: rect1.right,
      clientY: rect1.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', events[0], {
      clientX: rect1.right + dayWidth - 5,
      clientY: rect1.bottom + 95,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', events[0], {
      clientX: rect1.right + dayWidth - 5,
      clientY: rect1.bottom + 95,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(3, 'days')
        .add(1, 'hour')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(3, 'days')
        .add(1, 'hour')
        .toDate(),
    });
  });

  it('should preserve css classes on hour segments when dragging an event', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'days')
          .toDate(),
        title: 'bar',
        draggable: true,
      },
    ];
    fixture.componentInstance.beforeViewRender.subscribe(
      (view: CalendarWeekViewBeforeRenderEvent) => {
        view.hourColumns.forEach((column) => {
          column.hours.forEach((hour) => {
            hour.segments.forEach((segment) => {
              segment.cssClass = 'disabled-cell';
            });
          });
        });
      }
    );
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-hour-segment')
        .classList.contains('disabled-cell')
    ).to.be.true;
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const dayWidth: number = events[0].parentElement.offsetWidth;
    const rect: ClientRect = events[0].getBoundingClientRect();
    triggerDomEvent('mousedown', events[0], {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', events[0], {
      clientX: rect.right + dayWidth - 5,
      clientY: rect.bottom + 95,
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-hour-segment')
        .classList.contains('disabled-cell')
    ).to.be.true;
  });

  it('should resize a time event to the minimum height', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(3, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(5, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.minimumEventHeight = 1;
    fixture.componentInstance.hourSegmentHeight = 20;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
      hourSegmentHeight: {},
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[0];
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right,
      clientY: rect.bottom - 200,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().height).to.equal(1);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right,
      clientY: rect.bottom - 200,
      button: 0,
    });
    fixture.detectChanges();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].start)
        .add(1, 'minutes')
        .toDate(),
    });
  });

  it('should resize a time event to the minimum height with custom hour duration', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment(new Date('2018-07-29'))
          .startOf('day')
          .add(6, 'hours')
          .toDate(),
        title: 'foo',
        resizable: {
          afterEnd: true,
        },
      },
    ];
    fixture.componentInstance.hourDuration = 40;
    fixture.componentInstance.minimumEventHeight = 1;
    fixture.componentInstance.hourSegmentHeight = 20;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
      hourDuration: {},
      hourSegmentHeight: {},
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[0];
    const rect: ClientRect = event.getBoundingClientRect();
    const resizeHandle = event.querySelector('.cal-resize-handle-after-end');
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      resizeEvent = e;
    });
    triggerDomEvent('mousedown', resizeHandle, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: rect.right,
      clientY: rect.bottom - 120,
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().height).to.equal(1);
    triggerDomEvent('mouseup', document.body, {
      clientX: rect.right,
      clientY: rect.bottom - 120,
      button: 0,
    });
    fixture.detectChanges();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: fixture.componentInstance.events[0].start,
      newEnd: moment(fixture.componentInstance.events[0].start)
        .add(1, 'minutes')
        .toDate(),
    });
  });

  it('should allow css variables for colors', () => {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerText = `
    :root {
        --white: #fff;
        --black: #000;
      }
    `;
    document.head.appendChild(style);
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'var(--white)',
          secondary: 'var(--black)',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();

    const computedStyles: CSSStyleDeclaration = window.getComputedStyle(
      fixture.nativeElement.querySelector('.cal-event')
    );
    expect(computedStyles.getPropertyValue('background-color')).to.equal(
      'rgb(0, 0, 0)'
    );
    expect(computedStyles.getPropertyValue('border-color')).to.equal(
      'rgb(255, 255, 255)'
    );
    document.head.appendChild(style);
  });

  it('should allow external events to be dropped on the hour segments', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [];
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const externalEventFixture = fixture.debugElement.query(
      By.directive(ExternalEventComponent)
    );

    const event: HTMLElement =
      externalEventFixture.nativeElement.querySelector('.external-event');
    const eventPosition: ClientRect = event.getBoundingClientRect();

    const segments: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll(
        '.cal-day-columns .cal-hour-segment'
      )
    );
    const segment = segments[1];
    const segmentPosition: ClientRect = segment.getBoundingClientRect();

    const eventDropped = fixture.componentInstance.eventTimesChanged;

    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top,
      clientX: eventPosition.left,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: segmentPosition.top,
      clientX: segmentPosition.left,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientY: segmentPosition.top,
      clientX: segmentPosition.left,
      button: 0,
    });
    fixture.detectChanges();
    expect(eventDropped).to.have.been.calledWith({
      type: 'drop',
      event: externalEventFixture.componentInstance.event,
      newStart: moment('2016-06-27')
        .startOf('week')
        .add(30, 'minutes')
        .toDate(),
      allDay: false,
    });
    expect(eventDropped).to.have.been.calledOnce;
  });

  it('should update event times when dragging', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    eventTitle.week = ({ start, end }: CalendarEvent) => {
      return (
        formatDate(start, 'H:mm', 'en') + ' - ' + formatDate(end, 'H:mm', 'en')
      );
    };
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    const originalEvent = {
      start: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(3, 'hours')
        .toDate(),
      end: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(5, 'hours')
        .toDate(),
      title: 'foo',
      draggable: true,
    };
    fixture.componentInstance.events = [originalEvent];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom + 95,
    });
    fixture.detectChanges();
    const updatedEvent1 = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    expect(updatedEvent1.innerText.trim()).to.equal('4:30 - 6:30');
  });

  it('should update event times when dragging and not snapping to a grid', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    eventTitle.week = ({ start, end }: CalendarEvent) => {
      return (
        formatDate(start, 'H:mm', 'en') + ' - ' + formatDate(end, 'H:mm', 'en')
      );
    };
    fixture.componentInstance.viewDate = new Date('2018-07-29');
    fixture.componentInstance.snapDraggedEvents = false;
    const originalEvent = {
      start: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(3, 'hours')
        .toDate(),
      end: moment(new Date('2018-07-29'))
        .startOf('day')
        .add(5, 'hours')
        .toDate(),
      title: 'foo',
      draggable: true,
    };
    fixture.componentInstance.events = [originalEvent];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: rect.right,
      clientY: rect.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', event, {
      clientX: rect.right,
      clientY: rect.bottom + 95,
    });
    fixture.detectChanges();
    const updatedEvent1 = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    expect(updatedEvent1.innerText.trim()).to.equal('4:30 - 6:30');
  });

  it('should set a minimum event height', () => {
    const fixture = TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = moment().startOf('week').toDate();
    fixture.componentInstance.events = [
      {
        start: moment().startOf('week').toDate(),
        end: moment().startOf('week').add(5, 'minutes').toDate(),
        title: 'foo',
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-event-container').offsetHeight
    ).to.equal(30);
    fixture.destroy();
  });

  it('should drag a time event down and into another day', () => {
    const fixture: ComponentFixture<CalendarWeekViewComponent> =
      TestBed.createComponent(CalendarWeekViewComponent);
    fixture.componentInstance.viewDate = new Date('2020-05-03');
    fixture.componentInstance.daysInWeek = 2;
    fixture.componentInstance.events = [
      {
        start: moment(new Date('2020-05-03')).startOf('day').hours(20).toDate(),
        end: moment(new Date('2020-05-03')).startOf('day').hours(23).toDate(),
        title: 'foo',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const events = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    );
    const rect1: ClientRect = events[0].getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.pipe(take(1)).subscribe((e) => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', events[0], {
      clientX: 0,
      clientY: rect1.bottom,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', events[0], {
      clientX: 0,
      clientY: rect1.bottom + 95,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', events[0], {
      clientX: 0,
      clientY: rect1.bottom + 95,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      allDay: false,
      event: fixture.componentInstance.events[0],
      newStart: moment(fixture.componentInstance.events[0].start)
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment(fixture.componentInstance.events[0].end)
        .add(1, 'hour')
        .add(30, 'minutes')
        .toDate(),
    });
  });

  describe('current time marker', () => {
    let clock: any;
    beforeEach(() => {
      clock = fakeTimers.install({
        now: new Date('2019-09-30T11:30:25.288Z').getTime(),
        toFake: ['Date'],
      });
    });

    afterEach(() => {
      clock.uninstall();
    });

    it('should show a current time marker', () => {
      const fixture: ComponentFixture<CalendarWeekViewComponent> =
        TestBed.createComponent(CalendarWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker.style.top).to.equal('690px');
    });

    it('should respect the start time', () => {
      const fixture: ComponentFixture<CalendarWeekViewComponent> =
        TestBed.createComponent(CalendarWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.dayStartHour = 3;
      fixture.componentInstance.dayStartMinute = 30;
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker.style.top).to.equal('480px');
    });

    it('should respect the end time', () => {
      const fixture: ComponentFixture<CalendarWeekViewComponent> =
        TestBed.createComponent(CalendarWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.dayEndHour = 3;
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker).to.equal(null);
    });

    it('should respect the hour segment count and height', () => {
      const fixture: ComponentFixture<CalendarWeekViewComponent> =
        TestBed.createComponent(CalendarWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.hourSegments = 4;
      fixture.componentInstance.hourSegmentHeight = 60;
      fixture.componentInstance.ngOnChanges({
        viewDate: {},
        hourSegmentHeight: {},
      });
      fixture.detectChanges();
      const marker = fixture.nativeElement.querySelector(
        '.cal-day-columns .cal-day-column:nth-child(2) .cal-current-time-marker'
      );
      expect(marker.style.top).to.equal('2760px');
    });

    it('should not change the all day event end date when ending the drop inside the hour grid', () => {
      const fixture: ComponentFixture<CalendarWeekViewComponent> =
        TestBed.createComponent(CalendarWeekViewComponent);
      fixture.componentInstance.viewDate = new Date();
      fixture.componentInstance.events = [
        {
          title: 'foo',
          start: moment().startOf('week').toDate(),
          end: moment().startOf('week').add(2, 'days').toDate(),
          draggable: true,
          allDay: true,
        },
      ];
      fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
      fixture.detectChanges();
      document.body.appendChild(fixture.nativeElement);
      // remove the header as it was causing the test to fail
      const header: HTMLElement =
        fixture.nativeElement.querySelector('.cal-day-headers');
      header.parentNode.removeChild(header);

      const eventDropped = sinon.spy();
      fixture.componentInstance.eventTimesChanged.subscribe(eventDropped);

      const event: HTMLElement = fixture.nativeElement.querySelector(
        '.cal-event-container'
      );
      const dayWidth: number = event.parentElement.offsetWidth / 7;
      const eventPosition: ClientRect = event.getBoundingClientRect();
      triggerDomEvent('mousedown', event, {
        clientX: eventPosition.right,
        clientY: eventPosition.top,
        button: 0,
      });
      fixture.detectChanges();
      triggerDomEvent('mousemove', document.body, {
        clientX: eventPosition.right + dayWidth,
        clientY: eventPosition.top + 100,
      });
      fixture.detectChanges();
      triggerDomEvent('mouseup', document.body, {
        clientX: eventPosition.right + dayWidth,
        clientY: eventPosition.top + 100,
        button: 0,
      });
      fixture.detectChanges();

      expect(eventDropped).to.have.been.calledOnce;
    });
  });
});
