import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  async
} from '@angular/core/testing';
import moment from 'moment';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { DragAndDropModule } from 'angular-draggable-droppable';
import {
  CalendarEventTitleFormatter,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT,
  CalendarEventTimesChangedEvent,
  CalendarDayViewComponent,
  DateAdapter
} from '../src';
import { Subject } from 'rxjs';
import { triggerDomEvent, ExternalEventComponent } from './util';
import { take } from 'rxjs/operators';
import { adapterFactory } from '../src/date-adapters/date-fns';

describe('CalendarDayViewComponent component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot(
          {
            provide: DateAdapter,
            useFactory: adapterFactory
          },
          {
            dateFormatter: {
              provide: CalendarDateFormatter,
              useClass: CalendarMomentDateFormatter
            }
          }
        ),
        DragAndDropModule
      ],
      declarations: [ExternalEventComponent],
      providers: [{ provide: MOMENT, useValue: moment }]
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(inject([CalendarEventTitleFormatter], _eventTitle_ => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the day view', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        color: {
          primary: '',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    expect(fixture.componentInstance.view.events.length).to.equal(1);
    expect(fixture.componentInstance.view.events[0].event).to.equal(
      fixture.componentInstance.events[0]
    );
    expect(fixture.componentInstance.hours.length).to.equal(24);
  });

  it('should generate the week view with default colors for events', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo'
      }
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

  it('should call the event clicked callback', async(() => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        color: {
          primary: '',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    fixture.componentInstance.eventClicked.subscribe(val => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0]
      });
    });
    fixture.nativeElement.querySelector('.cal-event-title').click();
  }));

  it('should call the event clicked callback on all day events', async(() => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        allDay: true,
        color: {
          primary: '',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    fixture.componentInstance.eventClicked.subscribe(val => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0]
      });
    });
    fixture.nativeElement.querySelector('.cal-event-title').click();
  }));

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-01'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: ''
        }
      }
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

  it('should add a custom CSS class to all day events', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-01'),
        cssClass: 'foo',
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: ''
        },
        allDay: true
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-all-day-events mwl-calendar-day-view-event')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should call the hour segment clicked callback', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    fixture.componentInstance.hourSegmentClicked.subscribe(val => {
      expect(val).to.deep.equal({
        date: moment('2016-06-01')
          .startOf('day')
          .add(1, 'hour')
          .add(30, 'minutes')
          .toDate()
      });
    });
    fixture.nativeElement.querySelectorAll('.cal-hour-segment')[3].click();
  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
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
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    eventTitle.day = (event: CalendarEvent) => {
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
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-title'
    );
    expect(title.innerHTML).to.equal('foo bar');
  });

  it('should update the hour grid and event list when the day start changes', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-29'),
        title: 'foo',
        color: {
          primary: '',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(fixture.componentInstance.hours.length).to.equal(24);
    expect(fixture.componentInstance.view.events.length).to.equal(1);
    fixture.componentInstance.dayStartHour = 6;
    fixture.componentInstance.ngOnChanges({ dayStartHour: {} });
    expect(fixture.componentInstance.hours.length).to.equal(18);
    expect(fixture.componentInstance.view.events.length).to.equal(0);
  });

  it('should add event actions to each event', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    const eventClicked = sinon.spy();
    fixture.componentInstance.eventClicked.subscribe(eventClicked);
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)'
        },
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: sinon.spy(),
            cssClass: 'foo'
          }
        ]
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event .cal-event-action'
    );
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.equal(true);
    action.querySelector('i').click();
    expect(
      fixture.componentInstance.events[0].actions[0].onClick
    ).to.have.been.calledWith({ event: fixture.componentInstance.events[0] });
    expect(eventClicked).not.to.have.been.called;
  });

  it('should allow the event width to be customised', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-01'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.eventWidth = 300;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      events: {},
      eventWidth: {}
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-event-container').style.width
    ).to.equal('299px');
    fixture.destroy();
  });

  it('should add a custom CSS class to days via the beforeViewRender output', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(({ body }) => {
        body.hourGrid.forEach(hour => {
          hour.segments.forEach(segment => {
            segment.cssClass = 'foo';
          });
        });
      });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-hour-segment')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should resize the event by dragging from the top edge', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .add(6, 'hours')
          .toDate(),
        resizable: {
          beforeStart: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-before-start'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.top,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.top - 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 30);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 30);
    triggerDomEvent('mouseup', handle, {
      clientY: rect.top - 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .subtract(30, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .toDate()
    });
  });

  it('should resize the event by dragging from the bottom edge', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .add(6, 'hours')
          .toDate(),
        resizable: {
          afterEnd: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.bottom,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.bottom + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom + 30);
    expect(event.getBoundingClientRect().height).to.equal(150);
    triggerDomEvent('mouseup', handle, {
      clientY: rect.top + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .add(30, 'minutes')
        .toDate()
    });
  });

  it('should resize back to the original edge', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .add(6, 'hours')
          .toDate(),
        resizable: {
          afterEnd: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.bottom,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.bottom + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom + 30);
    expect(event.getBoundingClientRect().height).to.equal(150);
    triggerDomEvent('mousemove', handle, {
      clientY: rect.bottom,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom);
    expect(event.getBoundingClientRect().height).to.equal(120);
  });

  it('should resize events with no end date', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(4, 'hours')
          .toDate(),
        resizable: {
          afterEnd: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.bottom,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.bottom + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom + 30);
    expect(event.getBoundingClientRect().height).to.equal(60);
    triggerDomEvent('mouseup', handle, {
      clientY: rect.top + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(5, 'hours')
        .toDate()
    });
  });

  it('should resize events with no end date with a custom amount of segments', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.hourSegments = 4;
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(4, 'hours')
          .toDate(),
        resizable: {
          afterEnd: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-after-end'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.bottom,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.bottom + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom + 30);
    expect(event.getBoundingClientRect().height).to.equal(60);
    triggerDomEvent('mouseup', handle, {
      clientY: rect.top + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(4, 'hours')
        .add(30, 'minutes')
        .toDate()
    });
  });

  it('should resize the event and respect the event snap size', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .add(6, 'hours')
          .toDate(),
        resizable: {
          beforeStart: true
        }
      }
    ];
    fixture.componentInstance.eventSnapSize = 1;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let resizeEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      resizeEvent = e;
    });
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-before-start'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.top,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.top - 10,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 10);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 10);
    triggerDomEvent('mouseup', handle, {
      clientY: rect.top - 10,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
      type: 'resize',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .subtract(10, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .toDate()
    });
  });

  it('should show a tooltip on mouseover of the event', fakeAsync(() => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    eventTitle.dayTooltip = (e: CalendarEvent) => {
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
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    const tooltip: HTMLElement = document.body.querySelector(
      '.cal-tooltip'
    ) as HTMLElement;
    expect(tooltip.querySelector('.cal-tooltip-inner').innerHTML).to.equal(
      'title: foo <b>bar</b>'
    );
    expect(tooltip.classList.contains('cal-tooltip-left-top')).to.equal(true);
    expect(!!tooltip.style.top).to.equal(true);
    expect(!!tooltip.style.left).to.equal(true);
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
  }));

  it('should disable the tooltip', fakeAsync(() => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    eventTitle.dayTooltip = () => '';
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
  }));

  it('should allow events to be dragged and dropped', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .startOf('day')
          .add(6, 'hours')
          .toDate(),
        draggable: true
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged.subscribe(eventDropped);
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top + 5,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: eventPosition.top + 35,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(eventPosition.top + 30);
    expect(event.getBoundingClientRect().bottom).to.equal(
      eventPosition.bottom + 30
    );
    triggerDomEvent('mouseup', document.body, {
      clientY: eventPosition.top + 30,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(eventDropped.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .add(30, 'minutes')
        .toDate(),
      allDay: false
    });
    expect(eventDropped).to.have.been.calledOnce;
  });

  it('should not allow events to be dragged outside of the calendar', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .startOf('day')
          .add(6, 'hours')
          .toDate(),
        draggable: true
      }
    ];
    fixture.componentInstance.eventSnapSize = 1;
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged.subscribe(eventDropped);
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const calendarPosition: ClientRect = fixture.nativeElement.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: calendarPosition.top,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(calendarPosition.top);
    expect(event.getBoundingClientRect().bottom).to.equal(
      calendarPosition.top + eventPosition.height
    );
    triggerDomEvent('mousemove', document.body, {
      clientY: calendarPosition.top - 60,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(calendarPosition.top);
    expect(event.getBoundingClientRect().bottom).to.equal(
      calendarPosition.top + eventPosition.height
    );
    triggerDomEvent('mouseup', document.body, {
      clientY: calendarPosition.top - 60,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    const { newStart, newEnd } = eventDropped.getCall(0).args[0];
    expect(newStart).to.deep.equal(
      moment('2016-06-27')
        .startOf('day')
        .toDate()
    );
    expect(newEnd).to.deep.equal(
      moment('2016-06-27')
        .startOf('day')
        .add(2, 'hours')
        .toDate()
    );
    fixture.destroy();
  });

  it('should allow events to be dragged outside of the calendar', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-06-27')
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .startOf('day')
          .add(6, 'hours')
          .toDate(),
        draggable: true
      }
    ];
    fixture.componentInstance.eventSnapSize = 1;
    fixture.componentInstance.snapDraggedEvents = false;
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged.subscribe(eventDropped);
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    const calendarPosition: ClientRect = fixture.nativeElement.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top,
      clientX: eventPosition.left
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: calendarPosition.top,
      clientX: eventPosition.left - 10
    });
    fixture.detectChanges();
    const ghostElement = event.nextSibling as HTMLElement;
    expect(ghostElement.getBoundingClientRect().top).to.equal(
      calendarPosition.top
    );
    expect(ghostElement.getBoundingClientRect().bottom).to.equal(
      calendarPosition.top + eventPosition.height
    );
    expect(ghostElement.getBoundingClientRect().left).to.equal(
      eventPosition.left - 10
    );
    triggerDomEvent('mousemove', document.body, {
      clientY: calendarPosition.top - 60,
      clientX: eventPosition.left - 10
    });
    fixture.detectChanges();
    expect(ghostElement.getBoundingClientRect().top).to.equal(
      calendarPosition.top - 60
    );
    expect(ghostElement.getBoundingClientRect().bottom).to.equal(
      calendarPosition.top - 60 + eventPosition.height
    );
    expect(ghostElement.getBoundingClientRect().left).to.equal(
      eventPosition.left - 10
    );
    triggerDomEvent('mouseup', document.body, {
      clientY: calendarPosition.top - 60,
      clientX: eventPosition.left - 10
    });
    fixture.detectChanges();
    expect(eventDropped).not.to.have.been.called;
    fixture.destroy();
  });

  it('should round event drag sizes to the event snap size when dragging and dropping non snapped events', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        start: moment('2016-06-27')
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .startOf('day')
          .add(6, 'hours')
          .toDate(),
        draggable: true
      }
    ];
    fixture.componentInstance.eventSnapSize = 30;
    fixture.componentInstance.snapDraggedEvents = false;
    const eventDropped = sinon.spy();
    fixture.componentInstance.eventTimesChanged.subscribe(eventDropped);
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top,
      clientX: eventPosition.left
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: eventPosition.top - 20,
      clientX: eventPosition.left
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientY: eventPosition.top - 20,
      clientX: eventPosition.left
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(eventDropped.getCall(0).args[0]).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .subtract(30, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .subtract(30, 'minutes')
        .toDate(),
      allDay: false
    });
  });

  it('should not allow events to be resized outside of the container', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(1, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .add(6, 'hours')
          .toDate(),
        resizable: {
          beforeStart: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    const handle = fixture.nativeElement.querySelector(
      '.cal-resize-handle-before-start'
    );
    triggerDomEvent('mousedown', handle, {
      clientY: rect.top,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', handle, {
      clientY: rect.top - 60,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 60);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 60);
    triggerDomEvent('mousemove', handle, {
      clientY: rect.top - 120,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 60);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 60);
    triggerDomEvent('mouseup', handle, {
      clientY: rect.top - 60,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should allow external events to be dropped on the day view', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);

    const externalEventFixture: ComponentFixture<
      ExternalEventComponent
    > = TestBed.createComponent(ExternalEventComponent);
    externalEventFixture.detectChanges();
    document.body.appendChild(externalEventFixture.nativeElement);

    const event: HTMLElement = externalEventFixture.nativeElement.querySelector(
      '.external-event'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();

    const segments: any[] = Array.from(
      fixture.nativeElement.querySelectorAll('.cal-hour-segment')
    );
    const segment: HTMLElement = segments[2].parentNode;
    const segmentPosition: ClientRect = segment.getBoundingClientRect();

    const eventDropped: sinon.SinonSpy = sinon.spy();
    fixture.componentInstance.eventTimesChanged.subscribe(eventDropped);
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top,
      clientX: eventPosition.left
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: segmentPosition.top,
      clientX: segmentPosition.left
    });
    fixture.detectChanges();
    expect(segment.classList.contains('cal-drag-over')).to.equal(true);
    triggerDomEvent('mouseup', document.body, {
      clientY: segmentPosition.top,
      clientX: segmentPosition.left
    });
    fixture.detectChanges();
    fixture.destroy();
    externalEventFixture.destroy();
    expect(eventDropped).to.have.been.calledWith({
      type: 'drop',
      event: externalEventFixture.componentInstance.event,
      newStart: moment('2016-06-27')
        .startOf('day')
        .add(1, 'hours')
        .toDate(),
      allDay: false
    });
  });

  it('should respect the event snap size when dragging and dropping', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .startOf('day')
          .add(4, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .startOf('day')
          .add(6, 'hours')
          .toDate(),
        draggable: true
      }
    ];
    fixture.componentInstance.eventSnapSize = 1;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-container'
    );
    const eventPosition: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientY: eventPosition.top + 5,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: eventPosition.top + 15,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(eventPosition.top + 10);
    expect(event.getBoundingClientRect().bottom).to.equal(
      eventPosition.bottom + 10
    );
    triggerDomEvent('mouseup', document.body, {
      clientY: eventPosition.top + 10,
      clientX: eventPosition.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drag',
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .add(10, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .add(10, 'minutes')
        .toDate(),
      allDay: false
    });
  });

  it('should log on invalid events', () => {
    const stub = sinon.stub(console, 'warn');
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.events = [
      { start: 1234, title: '', color: { primary: '', secondary: '' } }
    ] as any;
    fixture.componentInstance.ngOnChanges({ events: {} });
    fixture.detectChanges();
    stub.restore();
    expect(stub).to.have.been.calledOnce; // tslint:disable-line
  });

  it('should allow the hour segment height to be customised', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.hourSegmentHeight = 45;
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('mwl-calendar-day-view-hour-segment')
        .style.height
    ).to.equal('45px');
    expect(
      fixture.nativeElement.querySelector('.cal-hour-segment').style.height
    ).to.equal('45px');
  });

  it('should only call the beforeViewRender output once when refreshing the view', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
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
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
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
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const { period } = beforeViewRenderCalled.getCall(0).args[0];
    expect(period.start).to.be.an.instanceOf(Date);
    expect(period.end).to.be.an.instanceOf(Date);
    expect(Array.isArray(period.events)).to.equal(true);
    fixture.destroy();
  });

  it('should expose the events on the beforeViewRender output', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo'
      },
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'bar',
        allDay: true
      }
    ];
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const {
      period: { events },
      body: { allDayEvents }
    } = beforeViewRenderCalled.getCall(0).args[0];
    expect(events).to.deep.equal([fixture.componentInstance.events[0]]);
    expect(allDayEvents).to.deep.equal([fixture.componentInstance.events[1]]);
  });

  it('should drag an all day event onto the time grid', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
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
        draggable: true,
        allDay: true
      }
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector(
      '.cal-all-day-events mwl-calendar-day-view-event'
    );
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.left,
      clientY: rect.top
    });
    fixture.detectChanges();
    const hourSegment = fixture.nativeElement.querySelectorAll(
      'mwl-calendar-day-view-hour-segment'
    )[3];
    const hourSegmentPosition = hourSegment.getBoundingClientRect();
    triggerDomEvent('mousemove', hourSegment, {
      clientX: hourSegmentPosition.left,
      clientY: hourSegmentPosition.top
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', hourSegment, {
      clientX: hourSegmentPosition.left,
      clientY: hourSegmentPosition.top
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
        .toDate()
    });
  });

  it('should drag a time event onto the all day events', () => {
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
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
        draggable: true,
        allDay: false
      },
      {
        start: new Date('2018-07-29'),
        allDay: true,
        title: 'bar'
      }
    ];
    fixture.componentInstance.snapDraggedEvents = false;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event = fixture.nativeElement.querySelector('.cal-event-container');
    const rect: ClientRect = event.getBoundingClientRect();
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      dragEvent = e;
    });
    triggerDomEvent('mousedown', event, {
      clientX: rect.left,
      clientY: rect.top
    });
    fixture.detectChanges();
    const allDayEvents = fixture.nativeElement.querySelector(
      '.cal-all-day-events'
    );
    const allDayEventsPosition = allDayEvents.getBoundingClientRect();
    triggerDomEvent('mousemove', allDayEvents, {
      clientX: allDayEventsPosition.left,
      clientY: allDayEventsPosition.top
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', allDayEvents, {
      clientX: allDayEventsPosition.left,
      clientY: allDayEventsPosition.top
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      type: 'drop',
      allDay: true,
      event: fixture.componentInstance.events[0],
      newStart: moment(new Date('2018-07-29'))
        .startOf('day')
        .toDate()
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
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'var(--white)',
          secondary: 'var(--black)'
        }
      }
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
});
