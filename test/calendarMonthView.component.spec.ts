import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
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
  DAYS_OF_WEEK
} from './../src';
import { CalendarMonthViewComponent } from './../src/components/month/calendarMonthView.component';
import { Subject } from 'rxjs/Subject';
import { triggerDomEvent } from './util';
import { CalendarEventTimesChangedEvent } from '../src/interfaces/calendarEventTimesChangedEvent.interface';

describe('calendarMonthView component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CalendarModule.forRoot({
          dateFormatter: {
            provide: CalendarDateFormatter,
            useClass: CalendarMomentDateFormatter
          }
        })
      ],
      providers: [{ provide: MOMENT, useValue: moment }]
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(
    inject([CalendarEventTitleFormatter], _eventTitle_ => {
      eventTitle = _eventTitle_;
    })
  );

  it('should generate the month view', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.view.rowOffsets).to.deep.equal([
      0,
      7,
      14,
      21,
      28
    ]);
    expect(fixture.componentInstance.view.days.length).to.equal(35);
    expect(fixture.componentInstance.view.totalDaysVisibleInWeek).to.equal(7);
    expect(fixture.componentInstance.view.days[0].date).to.deep.equal(
      moment('2016-05-29').toDate()
    );
    fixture.destroy();
  });

  it('should generate the month view without from week excluded days', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-01-10');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    expect(fixture.componentInstance.view.days.length).to.equal(25);
    expect(fixture.componentInstance.view.totalDaysVisibleInWeek).to.equal(5);
    expect(fixture.componentInstance.view.rowOffsets).to.deep.equal([
      0,
      5,
      10,
      15,
      20
    ]);
    expect(fixture.componentInstance.view.days[0].date).to.deep.equal(
      moment('2015-12-28').toDate()
    );
    fixture.destroy();
  });

  it('should update the month view when excluded days changed', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-01-10');
    fixture.componentInstance.excludeDays = [0, 1, 2];
    fixture.componentInstance.ngOnChanges({ excludeDays: {} });
    expect(fixture.componentInstance.view.days.length).to.equal(20);
    expect(fixture.componentInstance.view.totalDaysVisibleInWeek).to.equal(4);
    fixture.destroy();
  });

  it('should open and close the active day events list', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
      activeDayIsOpen: {}
    });
    expect(fixture.componentInstance.openRowIndex).to.equal(7);
    expect(fixture.componentInstance.openDay).to.equal(
      fixture.componentInstance.view.days[8]
    );
    fixture.componentInstance.activeDayIsOpen = false;
    fixture.componentInstance.ngOnChanges({
      viewDate: {},
      activeDayIsOpen: {}
    });
    expect(!!fixture.componentInstance.openRowIndex).to.equal(false);
    expect(!!fixture.componentInstance.openDay).to.equal(false);
    fixture.destroy();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
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
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    expect(event.classList.contains('foo')).to.equal(true);
    fixture.destroy();
  });

  it('should add a custom CSS class to days via the beforeViewRender output', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender.take(1).subscribe(({ body }) => {
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender
      .take(1)
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    let firstDay: CalendarMonthViewDay;
    fixture.componentInstance.beforeViewRender.take(1).subscribe(({ body }) => {
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)'
        }
      }
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
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(day.style.backgroundColor).to.be.equal('');
  });

  it('should add event actions to the active day events', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-action'
    );
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.equal(true);
    action.click();
    expect(
      fixture.componentInstance.events[0].actions[0].onClick
    ).to.have.been.calledWith({ event: fixture.componentInstance.events[0] });
  });

  it('should call the event clicked callback', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-06-26'),
        end: new Date('2016-06-28'),
        title: '<span>foo</span>',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)'
        }
      }
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-open-day-events .cal-event-title'
    );
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe(val => {
      expect(val).to.deep.equal({ event: fixture.componentInstance.events[0] });
    });
    title.click();
  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
        secondary: 'lightblue'
      }
    };
    fixture.componentInstance.events.push(event);
    fixture.componentInstance.refresh.next(true);
    expect(fixture.componentInstance.view.days[3].events).to.deep.equal([
      event
    ]);
    fixture.destroy();
  });

  it('should allow the event title to be customised by the calendarConfig provider', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
          secondary: 'rgb(238, 238, 238)'
        }
      }
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.beforeViewRender.take(1).subscribe(({ body }) => {
      body[0].badgeTotal = 100;
    });
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.cal-day-badge').innerHTML
    ).to.equal('100');
    fixture.destroy();
  });

  it(
    'should show a tooltip on mouseover of the event',
    fakeAsync(() => {
      const fixture: ComponentFixture<
        CalendarMonthViewComponent
      > = TestBed.createComponent(CalendarMonthViewComponent);
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
            secondary: 'rgb(238, 238, 238)'
          }
        }
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
    })
  );

  it(
    'should disable the tooltip',
    fakeAsync(() => {
      const fixture: ComponentFixture<
        CalendarMonthViewComponent
      > = TestBed.createComponent(CalendarMonthViewComponent);
      eventTitle.monthTooltip = () => '';
      fixture.componentInstance.viewDate = new Date('2016-06-27');
      fixture.componentInstance.events = [
        {
          start: new Date('2016-05-30'),
          end: new Date('2016-06-02'),
          title: 'foo <b>bar</b>',
          color: {
            primary: 'blue',
            secondary: 'rgb(238, 238, 238)'
          }
        }
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
    })
  );

  it('should allow the start of the week to be changed', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-05');
    fixture.componentInstance.events = [
      {
        start: new Date(2016, 11, 5, 10, 39, 14),
        end: new Date(2016, 11, 5, 15, 11, 5),
        title: 'draggable event',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)'
        },
        draggable: true
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      dragEvent = e;
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const cells: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.cal-day-cell'
    );
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event'
    );
    event.style.width = '10px';
    event.style.height = '10px';
    const dragToCellPosition: ClientRect = cells[10].getBoundingClientRect();
    const eventStartPosition: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: eventStartPosition.left,
      clientY: eventStartPosition.top
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top
    });
    fixture.detectChanges();
    expect(cells[10].classList.contains('cal-drag-over')).to.equal(true);
    const eventAfterDragPosition: ClientRect = event.getBoundingClientRect();
    const movedLeft: number = dragToCellPosition.left - eventStartPosition.left;
    expect(eventAfterDragPosition.left).to.equal(
      eventStartPosition.left + movedLeft
    );
    const movedTop: number = dragToCellPosition.top - eventStartPosition.top;
    expect(Math.round(eventAfterDragPosition.top)).to.equal(
      eventStartPosition.top + movedTop
    );
    triggerDomEvent('mouseup', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top
    });
    fixture.detectChanges();
    expect(cells[10].classList.contains('cal-drag-over')).to.equal(false);
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: new Date(2016, 11, 7, 10, 39, 14),
      newEnd: new Date(2016, 11, 7, 15, 11, 5)
    });
  });

  it('should apply the year, month and date changes in the correct order when dragging and dropping events', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-02-05');
    fixture.componentInstance.events = [
      {
        start: new Date('2017-02-01'),
        title: 'draggable event',
        color: {
          primary: 'blue',
          secondary: 'rgb(238, 238, 238)'
        },
        draggable: true
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {} });
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(e => {
      dragEvent = e;
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const cells: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.cal-day-cell'
    );
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event'
    );
    event.style.width = '10px';
    event.style.height = '10px';
    const dragToCellPosition: ClientRect = cells[2].getBoundingClientRect();
    const eventStartPosition: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {
      clientX: eventStartPosition.left,
      clientY: eventStartPosition.top
    });
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top
    });
    fixture.detectChanges();
    triggerDomEvent('mouseup', document.body, {
      clientX: dragToCellPosition.left,
      clientY: dragToCellPosition.top
    });
    fixture.detectChanges();
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: new Date('2017-01-31'),
      newEnd: undefined
    });
  });

  it('should update the event title', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-event-title'
    );
    expect(event.innerHTML).to.equal('foo');
    fixture.componentInstance.events[0].title = 'bar';
    fixture.detectChanges();
    expect(event.innerHTML).to.equal('bar');
    fixture.destroy();
  });

  it('should handle the click event on month cell events', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [
      {
        start: new Date('2016-05-30'),
        end: new Date('2016-06-02'),
        title: 'foo',
        color: {
          primary: 'blue',
          secondary: ''
        }
      }
    ];
    fixture.componentInstance.ngOnChanges({ viewDate: {}, events: {} });
    fixture.detectChanges();
    let eventClickedEvent: any;
    fixture.componentInstance.eventClicked.subscribe(e => {
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
    fixture.destroy();
    expect(eventClickedEvent).to.deep.equal({
      event: fixture.componentInstance.events[0]
    });
    expect(dayClickedFired).to.equal(false);
  });

  it('should add helper classes to the header cells', () => {
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
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
    const fixture: ComponentFixture<
      CalendarMonthViewComponent
    > = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2017-06-25');
    fixture.componentInstance.weekendDays = [
      DAYS_OF_WEEK.FRIDAY,
      DAYS_OF_WEEK.SATURDAY
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
});
