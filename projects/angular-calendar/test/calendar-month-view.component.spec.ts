import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import moment from 'moment';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  CalendarEventTitleFormatter,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT,
  CalendarMonthViewDay,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewComponent,
  DateAdapter,
  CalendarMonthViewEventTimesChangedEvent,
} from '../src';
import { Subject } from 'rxjs';
import { triggerDomEvent } from './util';
import { take } from 'rxjs/operators';
import { adapterFactory } from '../src/date-adapters/date-fns';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe);

describe('calendarMonthView component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
      ],
      providers: [{ provide: MOMENT, useValue: moment }],
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(inject([CalendarEventTitleFormatter], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the month view', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.view.rowOffsets).to.deep.equal([
      0, 7, 14, 21, 28,
    ]);
    expect(fixture.componentInstance.view.days.length).to.equal(35);
    expect(fixture.componentInstance.view.totalDaysVisibleInWeek).to.equal(7);
    expect(fixture.componentInstance.view.days[0].date).to.deep.equal(
      moment('2016-05-29').toDate()
    );
    fixture.destroy();
  });

  it('should emit on the columnHeaderClicked output', (done) => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-29');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    fixture.componentInstance.columnHeaderClicked.subscribe((val) => {
      expect(val.isoDayNumber).to.equal(0);
      expect(val.sourceEvent instanceof MouseEvent).to.be.true;
      done();
    });
    fixture.nativeElement.querySelector('.cal-header .cal-cell').click();
    fixture.detectChanges();
  });

  it('should generate the week view with default colors for events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
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
      'rgb(30, 144, 255)'
    );
    expect(computedStyles.getPropertyValue('border-color')).to.equal(
      'rgb(209, 232, 255)'
    );
    expect(computedStyles.getPropertyValue('color')).to.equal(
      'rgb(255, 255, 255)'
    );
    fixture.destroy();
  });

  it('should generate the month view without from week excluded days', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-01-10');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.view.days.length).to.equal(25);
    expect(fixture.componentInstance.view.totalDaysVisibleInWeek).to.equal(5);
    expect(fixture.componentInstance.view.rowOffsets).to.deep.equal([
      0, 5, 10, 15, 20,
    ]);
    expect(fixture.componentInstance.view.days[0].date).to.deep.equal(
      moment('2015-12-28').toDate()
    );
    fixture.destroy();
  });

  it('should update the month view when excluded days changed', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-01-10');
    fixture.componentInstance.excludeDays = [0, 1, 2];
    fixture.componentInstance.ngOnChanges({ excludeDays: {} });
    expect(fixture.componentInstance.view.days.length).to.equal(20);
    expect(fixture.componentInstance.view.totalDaysVisibleInWeek).to.equal(4);
    fixture.destroy();
  });

  it('should open and close the active day events list', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    expect(fixture.componentInstance.openRowIndex).to.equal(undefined);
    expect(fixture.componentInstance.openDay).to.equal(undefined);
    fixture.componentInstance.viewDate = moment()
      .startOf('month')
      .startOf('week')
      .add(8, 'days')
      .toDate();
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      activeDayIsOpen: {},
    });
    expect(fixture.componentInstance.openRowIndex).to.equal(7);
    expect(fixture.componentInstance.openDay).to.equal(
      fixture.componentInstance.view.days[8]
    );
    fixture.componentInstance.activeDayIsOpen = false;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      activeDayIsOpen: {},
    });
    expect(!!fixture.componentInstance.openRowIndex).to.equal(false);
    expect(!!fixture.componentInstance.openDay).to.equal(false);
    fixture.destroy();
  });

  it('should use the activeDay input instead of the viewDate to determine the active day', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    expect(fixture.componentInstance.openRowIndex).to.equal(undefined);
    expect(fixture.componentInstance.openDay).to.equal(undefined);
    fixture.componentInstance.viewDate = moment()
      .startOf('month')
      .startOf('week')
      .add(14, 'days')
      .toDate();
    fixture.componentInstance.activeDay = moment()
      .startOf('month')
      .startOf('week')
      .add(8, 'days')
      .toDate();
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      activeDayIsOpen: {},
    });
    expect(fixture.componentInstance.openRowIndex).to.equal(7);
    expect(fixture.componentInstance.openDay).to.equal(
      fixture.componentInstance.view.days[8]
    );
    fixture.componentInstance.activeDayIsOpen = false;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      activeDayIsOpen: {},
    });
    expect(!!fixture.componentInstance.openRowIndex).to.equal(false);
    expect(!!fixture.componentInstance.openDay).to.equal(false);
    fixture.destroy();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
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
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    expect(event.classList.contains('foo')).to.equal(true);
    fixture.destroy();
  });

  it('should add a custom CSS class to days via the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(({ body }) => {
        body[0].cssClass = 'foo';
      });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-days .cal-cell')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should add a custom CSS class to headers via the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
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
        .querySelector('.cal-header .cal-cell')
        .classList.contains('foo')
    ).to.equal(true);
    fixture.destroy();
  });

  it('should not remove other classes when removing the cssClass', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    let firstDay: CalendarMonthViewDay;
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(({ body }) => {
        body[0].cssClass = 'foo';
        firstDay = body[0];
      });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const cell: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell'
    );
    expect(cell.classList.contains('foo')).to.equal(true);
    expect(cell.classList.contains('cal-out-month')).to.equal(true);
    delete firstDay.cssClass;
    fixture.detectChanges();
    expect(cell.classList.contains('foo')).to.equal(false);
    expect(cell.classList.contains('cal-out-month')).to.equal(true);
    fixture.destroy();
  });

  it('should add the highlight class to events on mouse over', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    const day: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4)'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    expect(day.style.backgroundColor).to.equal('rgb(238, 238, 238)');
    expect(day.classList.contains('cal-event-highlight')).to.be.true;
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(day.style.backgroundColor).to.be.equal('');
    expect(day.classList.contains('cal-event-highlight')).to.be.false;
  });

  it('should add event actions to the active day events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: spy(),
            cssClass: 'foo',
          },
        ],
      },
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-action'
    );
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.equal(true);
    action.click();
    const actionSpy = fixture.componentInstance.events[0].actions[0]
      .onClick as sinon.SinonSpy;
    expect(actionSpy.getCall(0).args[0].event).to.equal(
      fixture.componentInstance.events[0]
    );
    expect(actionSpy.getCall(0).args[0].sourceEvent instanceof MouseEvent).to.be
      .true;
  });

  it('should add event actions to the active day events on enter keypress', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: spy(),
            cssClass: 'foo',
          },
        ],
      },
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-action'
    );
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.equal(true);
    const sourceEvent = triggerDomEvent('keydown', action, { keyCode: 13 });
    expect(
      fixture.componentInstance.events[0].actions[0].onClick
    ).to.have.been.calledWith({
      event: fixture.componentInstance.events[0],
      sourceEvent,
    });
  });

  it('should call the event clicked callback', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: '<span>foo</span>',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
      },
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-title'
    );
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe((val) => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0],
        sourceEvent: window['event'],
      });
    });
    title.click();
  });

  it('should call the event clicked callback on enter keypress', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: '<span>foo</span>',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
      },
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-title'
    );
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe((val) => {
      expect(val).to.deep.equal({
        event: fixture.componentInstance.events[0],
        sourceEvent: window['event'],
      });
    });
    triggerDomEvent('keydown', title, { keyCode: 13 });
  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const event: CalendarEvent = {
      start: new Date('2016-06-01'),
      end: new Date('2016-06-02'),
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: 'lightblue',
      },
    };
    fixture.componentInstance.events.push(event);
    fixture.componentInstance.refresh.next(true);
    expect(fixture.componentInstance.view.days[3].events).to.deep.equal([
      event,
    ]);
    fixture.destroy();
  });

  it('should allow the event title to be customised by the calendarConfig provider', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.month = (event: CalendarEvent) => {
      return `foo ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: 'bar',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
      },
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-title'
    );
    expect(title.innerHTML).to.equal('foo bar');
  });

  it('should allow the locale to be changed', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.locale = 'de';
    fixture.componentInstance.viewDate = new Date();
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cal-header .cal-cell')
        .innerHTML.trim()
    ).to.equal('Sonntag');
  });

  it('should allow the badge total to be customised', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(({ body }) => {
        body[0].badgeTotal = 100;
      });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-day-badge').innerHTML
    ).to.equal('100');
    fixture.destroy();
  });

  it('should show a tooltip on mouseover of the event', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.monthTooltip = (e: CalendarEvent) => {
      return `title: ${e.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
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
  }));

  it('should show a tooltip on mouseover of the event after a delay', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.monthTooltip = (e: CalendarEvent) => {
      return `title: ${e.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
      },
    ];
    fixture.componentInstance.tooltipDelay = 2000;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    tick(fixture.componentInstance.tooltipDelay - 1);
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
    tick(1);
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(true);
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
  }));

  it('should disable the tooltip', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.monthTooltip = () => '';
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo <b>bar</b>',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    expect(!!document.body.querySelector('.cal-tooltip')).to.equal(false);
  }));

  it('should allow the start of the week to be changed', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.weekStartsOn = 1;
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-header .cal-cell').innerText
    ).to.deep.equal('Monday');
    fixture.destroy();
  });

  it('should allow events to be dragged and dropped', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-05');
    fixture.componentInstance.events = [
      {
        start: new Date(2016, 11, 5, 10, 39, 14),
        end: new Date(2016, 11, 5, 15, 11, 5),
        title: 'draggable event',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)',
        },
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    let dragEvent: CalendarMonthViewEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe((e) => {
      dragEvent = e;
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const cells: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.cal-day-cell');
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    event.style.width = '10px';
    event.style.height = '10px';
    const dragToCellPosition: ClientRect = cells[10].getBoundingClientRect();
    const eventStartPosition: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: eventStartPosition.left,
      clientY: eventStartPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top,
    });
    fixture.detectChanges();
    expect(cells[10].classList.contains('cal-drag-over')).to.equal(true);
    const ghostElement = event.nextSibling as HTMLElement;
    const eventAfterDragPosition: ClientRect =
      ghostElement.getBoundingClientRect();
    const movedLeft: number = dragToCellPosition.left - eventStartPosition.left;
    expect(eventAfterDragPosition.left).to.equal(
      eventStartPosition.left + movedLeft
    );
    const movedTop: number = dragToCellPosition.top - eventStartPosition.top;
    expect(Math.round(eventAfterDragPosition.top)).to.equal(
      Math.round(eventStartPosition.top + movedTop)
    );
    triggerDomEvent('mouseup', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    expect(cells[10].classList.contains('cal-drag-over')).to.equal(false);
    fixture.destroy();
    expect(dragEvent.type).to.equal('drop');
    expect(dragEvent.event).to.equal(fixture.componentInstance.events[0]);
    expect(dragEvent.newStart).to.deep.equal(new Date(2016, 11, 7, 10, 39, 14));
    expect(dragEvent.newEnd).to.deep.equal(new Date(2016, 11, 7, 15, 11, 5));
    expect(dragEvent.day.date).to.deep.equal(new Date('2016-12-07'));
  });

  it('should apply the year, month and date changes in the correct order when dragging and dropping events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-02-05');
    fixture.componentInstance.events = [
      {
        start: new Date('2017-02-01'),
        title: 'draggable event',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe((e) => {
      dragEvent = e;
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const cells: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.cal-day-cell');
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event');
    event.style.width = '10px';
    event.style.height = '10px';
    const dragToCellPosition: ClientRect = cells[2].getBoundingClientRect();
    const eventStartPosition: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: eventStartPosition.left,
      clientY: eventStartPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top,
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent.type).to.equal('drop');
    expect(dragEvent.event).to.equal(fixture.componentInstance.events[0]);
    expect(dragEvent.newStart).to.deep.equal(new Date('2017-01-31'));
    expect(dragEvent.newEnd).to.deep.equal(undefined);
  });

  it('should not fire drop events when dropping on the source date', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2018-10-13');
    fixture.componentInstance.events = [
      {
        start: new Date('2018-10-13'),
        end: new Date('2018-10-14'),
        title: 'draggable event',
        draggable: true,
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    const dragSpy = sinon.spy();
    fixture.componentInstance.eventTimesChanged.subscribe((e) => dragSpy(e));
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const cells: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.cal-day-cell');
    const events: HTMLElement =
      fixture.nativeElement.querySelectorAll('.cal-event');
    const dragToCellPosition: ClientRect = cells[14].getBoundingClientRect();
    const eventStartPosition: ClientRect = events[1].getBoundingClientRect();
    triggerDomEvent('mousedown', events[1], {
      clientX: eventStartPosition.left,
      clientY: eventStartPosition.top,
      button: 0,
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: dragToCellPosition.left + 5,
      clientY: dragToCellPosition.top + 5,
    });
    fixture.detectChanges();
    expect(cells[14].classList.contains('cal-drag-over')).to.equal(true);
    triggerDomEvent('mouseup', document.body, {
      clientX: dragToCellPosition.left + 5,
      clientY: dragToCellPosition.top + 5,
      button: 0,
    });
    fixture.detectChanges();
    expect(cells[14].classList.contains('cal-drag-over')).to.equal(false);
    expect(dragSpy).not.to.have.been.called;
  });

  it('should update the event title', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement =
      fixture.nativeElement.querySelector('.cal-event-title');
    expect(event.innerHTML).to.equal('foo');
    fixture.componentInstance.events[0].title = 'bar';
    fixture.detectChanges();
    expect(event.innerHTML).to.equal('bar');
    fixture.destroy();
  });

  it('should handle the click event on month cell events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: '',
        },
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    let eventClickedEvent: any;
    fixture.componentInstance.eventClicked.subscribe((e) => {
      eventClickedEvent = e;
    });
    let dayClickedFired: boolean = false;
    fixture.componentInstance.dayClicked.subscribe(() => {
      dayClickedFired = true;
    });
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    event.click();
    expect(eventClickedEvent.event).to.equal(
      fixture.componentInstance.events[0]
    );
    expect(eventClickedEvent.sourceEvent instanceof MouseEvent).to.be.true;
    expect(dayClickedFired).to.equal(false);
  });

  it('should add helper classes to the header cells', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    fixture.detectChanges();
    const headerCells: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.cal-header .cal-cell'
    );
    expect(headerCells[0].classList.contains('cal-past')).to.equal(true);
    expect(headerCells[0].classList.contains('cal-today')).to.equal(false);
    expect(headerCells[0].classList.contains('cal-future')).to.equal(false);
    expect(headerCells[0].classList.contains('cal-weekend')).to.equal(true);
    expect(headerCells[1].classList.contains('cal-weekend')).to.equal(false);
    expect(headerCells[6].classList.contains('cal-weekend')).to.equal(true);
    fixture.destroy();
  });

  it('should allow the weekend days to be customised', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-06-25');
    fixture.componentInstance.weekendDays = [
      DAYS_OF_WEEK.FRIDAY,
      DAYS_OF_WEEK.SATURDAY,
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, weekendDays: {} });
    fixture.detectChanges();
    expect(fixture.componentInstance.view.days[0].isWeekend).to.equal(false);
    expect(fixture.componentInstance.view.days[5].isWeekend).to.equal(true);
    expect(fixture.componentInstance.view.days[6].isWeekend).to.equal(true);
    const headerCells: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.cal-header .cal-cell'
    );
    expect(headerCells[0].classList.contains('cal-weekend')).to.equal(false);
    expect(headerCells[5].classList.contains('cal-weekend')).to.equal(true);
    expect(headerCells[6].classList.contains('cal-weekend')).to.equal(true);
    fixture.destroy();
  });

  it('should only call the beforeViewRender output once when refreshing the view', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
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
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
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

  it('should log on invalid events', () => {
    const stub = sinon.stub(console, 'warn');
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-01-01');
    fixture.componentInstance.events = [
      { start: 1234, title: '', color: { primary: '', secondary: '' } },
    ] as any;
    fixture.componentInstance.ngOnChanges({ events: {}, viewDate: {} });
    fixture.detectChanges();
    stub.restore();
    expect(stub).to.have.been.calledOnce; // eslint-disable-line
  });

  it('should expose the view period on the beforeViewRender output', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    const beforeViewRenderCalled = sinon.spy();
    fixture.componentInstance.beforeViewRender
      .pipe(take(1))
      .subscribe(beforeViewRenderCalled);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(
      beforeViewRenderCalled.getCall(0).args[0].period.start
    ).to.be.an.instanceOf(Date);
    expect(
      beforeViewRenderCalled.getCall(0).args[0].period.end
    ).to.be.an.instanceOf(Date);
    expect(
      Array.isArray(beforeViewRenderCalled.getCall(0).args[0].period.events)
    ).to.equal(true);
    fixture.destroy();
  });

  it('should allow CSS variables for colors', () => {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerText = `
    :root {
        --white: #fff;
        --black: #000;
      }
    `;
    document.head.appendChild(style);
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
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
      'rgb(255, 255, 255)'
    );
    document.head.removeChild(style);
  });

  it('should allow the tooltip text to be updated dynamically', fakeAsync(() => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> =
      TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
      },
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    flush();
    const tooltip = document.body.querySelector('.cal-tooltip');
    expect(tooltip.querySelector('.cal-tooltip-inner').innerHTML).to.equal(
      'foo'
    );
    fixture.componentInstance.events[0].title = 'bar';
    fixture.detectChanges();
    expect(tooltip.querySelector('.cal-tooltip-inner').innerHTML).to.equal(
      'bar'
    );
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    fixture.destroy();
  }));
});
