import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  async
} from '@angular/core/testing';
import * as moment from 'moment';
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
  CalendarEventTimesChangedEvent
} from './../src';
import { CalendarDayViewComponent } from './../src/components/day/calendarDayView.component';
import { Subject } from 'rxjs/Rx';
import { spy } from 'sinon';
import { triggerDomEvent, ExternalEventComponent } from './util';

describe('CalendarDayViewComponent component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          dateFormatter: {
            provide: CalendarDateFormatter,
            useClass: CalendarMomentDateFormatter
          }
        }),
        DragAndDropModule
      ],
      declarations: [ExternalEventComponent],
      providers: [{ provide: MOMENT, useValue: moment }]
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(
    inject([CalendarEventTitleFormatter], _eventTitle_ => {
      eventTitle = _eventTitle_;
    })
  );

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

  it(
    'should call the event clicked callback',
    async(() => {
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
      fixture.nativeElement.querySelector('.cal-event a').click();
    })
  );

  it(
    'should call the event clicked callback on all day events',
    async(() => {
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
      fixture.nativeElement.querySelector('mwl-calendar-event-title a').click();
    })
  );

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
            onClick: spy(),
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
    action.click();
    expect(
      fixture.componentInstance.events[0].actions[0].onClick
    ).to.have.been.calledWith({ event: fixture.componentInstance.events[0] });
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
    fixture.componentInstance.beforeViewRender.take(1).subscribe(({ body }) => {
      body.forEach(hour => {
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
    triggerDomEvent('mousedown', document.body, {
      clientY: rect.top,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: rect.top - 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 30);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 30);
    triggerDomEvent('mouseup', document.body, {
      clientY: rect.top - 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
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
    triggerDomEvent('mousedown', document.body, {
      clientY: rect.bottom,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: rect.bottom + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().bottom).to.equal(rect.bottom + 30);
    expect(event.getBoundingClientRect().height).to.equal(150);
    triggerDomEvent('mouseup', document.body, {
      clientY: rect.top + 30,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
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
    triggerDomEvent('mousedown', document.body, {
      clientY: rect.top,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: rect.top - 10,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 10);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 10);
    triggerDomEvent('mouseup', document.body, {
      clientY: rect.top - 10,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvent).to.deep.equal({
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

  it(
    'should show a tooltip on mouseover of the event',
    fakeAsync(() => {
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
      expect(tooltip.classList.contains('cal-tooltip-top')).to.equal(true);
      expect(!!tooltip.style.top).to.equal(true);
      expect(!!tooltip.style.left).to.equal(true);
      triggerDomEvent('mouseleave', event);
      fixture.detectChanges();
      expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    })
  );

  it(
    'should disable the tooltip',
    fakeAsync(() => {
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
    })
  );

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
      '.cal-event'
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
    expect(dragEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .add(30, 'minutes')
        .toDate()
    });
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
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event'
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
    fixture.destroy();
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
    triggerDomEvent('mousedown', document.body, {
      clientY: rect.top,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: rect.top - 60,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 60);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 60);
    triggerDomEvent('mousemove', document.body, {
      clientY: rect.top - 120,
      clientX: rect.left + 10
    });
    fixture.detectChanges();
    expect(event.getBoundingClientRect().top).to.equal(rect.top - 60);
    expect(event.getBoundingClientRect().height).to.equal(rect.height + 60);
    triggerDomEvent('mouseup', document.body, {
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
      event: externalEventFixture.componentInstance.event,
      newStart: moment('2016-06-27')
        .startOf('day')
        .add(1, 'hours')
        .toDate()
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
      '.cal-event'
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
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .add(10, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .add(10, 'minutes')
        .toDate()
    });
  });

  it('should allow 2 events next to each other to be resized at the same time', () => {
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
      },
      {
        title: 'foo',
        color: { primary: '', secondary: '' },
        start: moment('2016-06-27')
          .add(6, 'hours')
          .toDate(),
        end: moment('2016-06-27')
          .add(8, 'hours')
          .toDate(),
        resizable: {
          beforeStart: true
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const event1: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[0];
    const rect1: ClientRect = event1.getBoundingClientRect();
    const event2: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.cal-event-container'
    )[1];
    const rect2: ClientRect = event2.getBoundingClientRect();
    const resizeEvents: CalendarEventTimesChangedEvent[] = [];
    fixture.componentInstance.eventTimesChanged.subscribe(event => {
      resizeEvents.push(event);
    });
    triggerDomEvent('mousedown', document.body, {
      clientY: rect1.bottom,
      clientX: rect1.left + 10
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientY: rect1.bottom + 30,
      clientX: rect1.left + 10
    });
    fixture.detectChanges();
    expect(event1.getBoundingClientRect().bottom).to.equal(rect1.bottom + 30);
    expect(event1.getBoundingClientRect().height).to.equal(150);
    expect(event2.getBoundingClientRect().top).to.equal(rect2.top + 30);
    expect(event2.getBoundingClientRect().height).to.equal(90);
    triggerDomEvent('mouseup', document.body, {
      clientY: rect1.top + 30,
      clientX: rect1.left + 10
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(resizeEvents[0]).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: moment('2016-06-27')
        .add(4, 'hours')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(6, 'hours')
        .add(30, 'minutes')
        .toDate()
    });
    expect(resizeEvents[1]).to.deep.equal({
      event: fixture.componentInstance.events[1],
      newStart: moment('2016-06-27')
        .add(6, 'hours')
        .add(30, 'minutes')
        .toDate(),
      newEnd: moment('2016-06-27')
        .add(8, 'hours')
        .toDate()
    });
  });

  it('should log on invalid events', () => {
    const stub = sinon.stub(console, 'warn');
    const fixture: ComponentFixture<
      CalendarDayViewComponent
    > = TestBed.createComponent(CalendarDayViewComponent);
    fixture.componentInstance.events = [
      { start: '2017-01-01', title: '', color: { primary: '', secondary: '' } }
    ] as any;
    fixture.componentInstance.ngOnChanges({ events: {} });
    fixture.detectChanges();
    stub.restore();
    expect(stub).to.have.been.calledOnce; // tslint:disable-line
  });
});
