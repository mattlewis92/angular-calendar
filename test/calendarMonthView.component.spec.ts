import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import * as moment from 'moment';
import { expect } from 'chai';
import { spy } from 'sinon';
import { DraggableHelper } from 'angular-draggable-droppable';
import {
  CalendarEventTitleFormatter,
  CalendarEvent,
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  CalendarModule,
  MOMENT
} from './../src';
import { CalendarMonthViewComponent } from './../src/components/month/calendarMonthView.component';
import { Subject } from 'rxjs/Subject';
import { triggerDomEvent } from './util';
import { CalendarEventTimesChangedEvent } from '../src/interfaces/calendarEventTimesChangedEvent.interface';

describe('calendarMonthView component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule]});
    TestBed.configureCompiler({
      providers: [
        DraggableHelper,
        CalendarEventTitleFormatter,
        {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter},
        {provide: MOMENT, useValue: moment}
      ]
    });
  });

  let eventTitle: CalendarEventTitleFormatter;
  beforeEach(inject([CalendarEventTitleFormatter], (_eventTitle_) => {
    eventTitle = _eventTitle_;
  }));

  it('should generate the month view', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    expect(fixture.componentInstance.view.rowOffsets).to.deep.equal([0, 7, 14, 21, 28]);
    expect(fixture.componentInstance.view.days.length).to.equal(35);
    expect(fixture.componentInstance.view.days[0].date).to.deep.equal(moment('2016-05-29').toDate());
    fixture.destroy();
  });

  it('should open and close the active day events list', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    expect(fixture.componentInstance.openRowIndex).to.be.undefined;
    expect(fixture.componentInstance.openDay).to.be.undefined;
    fixture.componentInstance.viewDate = moment().startOf('month').startOf('week').add(8, 'days').toDate();
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({viewDate: {}, activeDayIsOpen: {}});
    expect(fixture.componentInstance.openRowIndex).to.equal(7);
    expect(fixture.componentInstance.openDay).to.equal(fixture.componentInstance.view.days[8]);
    fixture.componentInstance.activeDayIsOpen = false;
    fixture.componentInstance.ngOnChanges({viewDate: {}, activeDayIsOpen: {}});
    expect(fixture.componentInstance.openRowIndex).not.to.be.ok;
    expect(fixture.componentInstance.openDay).not.to.be.ok;
    fixture.destroy();
  });

  it('should add a custom CSS class to events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
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
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    expect(event.classList.contains('foo')).to.be.true;
    fixture.destroy();
  });

  it('should add a custom CSS class to days via the day modifier', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.dayModifier = day => {
      day.cssClass = 'foo';
    };
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-days .cal-cell').classList.contains('foo')).to.be.true;
    fixture.destroy();
  });

  it('should add the highlight class to events on mouse over', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    const day: HTMLElement = fixture.nativeElement.querySelector('.cal-days .cal-cell-row .cal-cell:nth-child(4)');
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    expect(day.style.backgroundColor).to.equal('rgb(238, 238, 238)');
    triggerDomEvent('mouseleave', event);
    fixture.detectChanges();
    expect(day.style.backgroundColor).to.be.equal('');
  });

  it('should add event actions to the active day events', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
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
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const action: HTMLElement = fixture.nativeElement.querySelector('.cal-open-day-events .cal-event-action');
    expect(action.innerHTML).to.equal('<i class="fa fa-fw fa-times"></i>');
    expect(action.classList.contains('foo')).to.be.true;
    action.click();
    expect(fixture.componentInstance.events[0].actions[0].onClick).to.have.been.calledWith({event: fixture.componentInstance.events[0]});
  });

  it('should call the event clicked callback', () => {

    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      start: new Date('2016-06-26'),
      end: new Date('2016-06-28'),
      title: '<span>foo</span>',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      }
    }];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('.cal-open-day-events .cal-event-title');
    expect(title.innerHTML).to.equal('<span>foo</span>');
    fixture.componentInstance.eventClicked.subscribe(val => {
      expect(val).to.deep.equal({event: fixture.componentInstance.events[0]});
    });
    title.click();

  });

  it('should refresh the view when the refresh observable is emitted on', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.refresh = new Subject();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.viewDate = new Date('2016-06-27');
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
    expect(fixture.componentInstance.view.days[3].events).to.deep.equal([event]);
    fixture.destroy();
  });

  it('should allow the event title to be customised by the calendarConfig provider', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.month = (event: CalendarEvent) => {
      return `foo ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      start: new Date('2016-06-26'),
      end: new Date('2016-06-28'),
      title: 'bar',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      }
    }];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('.cal-open-day-events .cal-event-title');
    expect(title.innerHTML).to.equal('foo bar');
  });

  it('should allow the locale to be changed', () => {

    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.locale = 'de';
    fixture.componentInstance.viewDate = new Date();
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-header .cal-cell').innerHTML.trim()).to.equal('Sonntag');

  });

  it('should allow the badge total to be customised', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.dayModifier = day => {
      day.badgeTotal = 100;
      return day;
    };
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-day-badge').innerHTML).to.equal('100');
    fixture.destroy();
  });

  it('should show a tooltip on mouseover of the event', () => {

    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.monthTooltip = (event: CalendarEvent) => {
      return `title: ${event.title}`;
    };
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'foo <b>bar</b>',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
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

    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    eventTitle.monthTooltip = () => '';
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'foo <b>bar</b>',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      }
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector(
      '.cal-days .cal-cell-row .cal-cell:nth-child(4) .cal-events .cal-event'
    );
    triggerDomEvent('mouseenter', event);
    fixture.detectChanges();
    expect(document.body.querySelector('.cal-tooltip')).not.to.be.ok;

  });

  it('should allow the start of the week to be changed', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-27');
    fixture.componentInstance.weekStartsOn = 1;
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cal-header .cal-cell').innerText).to.deep.equal('Monday');
    fixture.destroy();
  });

  it('should allow events to be dragged and dropped', () => {

    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-12-05');
    fixture.componentInstance.events = [{
      start: new Date(2016, 11, 5, 10, 39, 14),
      end: new Date(2016, 11, 5, 15, 11, 5),
      title: 'draggable event',
      color: {
        primary: 'blue',
        secondary: 'rgb(238, 238, 238)'
      },
      draggable: true
    }];
    fixture.componentInstance.ngOnChanges({viewDate: {}});
    let dragEvent: CalendarEventTimesChangedEvent;
    fixture.componentInstance.eventTimesChanged.subscribe(event => {
      dragEvent = event;
    });
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
    const cells: HTMLElement[] = fixture.nativeElement.querySelectorAll('.cal-day-cell');
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event');
    event.style.width = '10px';
    event.style.height = '10px';
    const dragToCellPosition: ClientRect = cells[10].getBoundingClientRect();
    const eventStartPosition: ClientRect = event.getBoundingClientRect();
    triggerDomEvent('mousedown', event, {clientX: eventStartPosition.left, clientY: eventStartPosition.top});
    fixture.detectChanges();
    triggerDomEvent('mousemove', document.body, {clientX: dragToCellPosition.left, clientY: dragToCellPosition.top});
    fixture.detectChanges();
    expect(cells[10].classList.contains('cal-drag-over')).to.be.true;
    const eventAfterDragPosition: ClientRect = event.getBoundingClientRect();
    const movedLeft: number = dragToCellPosition.left - eventStartPosition.left;
    expect(Math.round(eventAfterDragPosition.left)).to.equal(eventStartPosition.left + movedLeft);
    const movedTop: number = dragToCellPosition.top - eventStartPosition.top;
    expect(Math.round(eventAfterDragPosition.top)).to.equal(eventStartPosition.top + movedTop);
    triggerDomEvent('mouseup', document.body, {clientX: dragToCellPosition.left, clientY: dragToCellPosition.top});
    fixture.detectChanges();
    expect(cells[10].classList.contains('cal-drag-over')).to.be.false;
    fixture.destroy();
    expect(dragEvent).to.deep.equal({
      event: fixture.componentInstance.events[0],
      newStart: new Date(2016, 11, 7, 10, 39, 14),
      newEnd: new Date(2016, 11, 7, 15, 11, 5)
    });

  });

  it('should update the event title', () => {
    const fixture: ComponentFixture<CalendarMonthViewComponent> = TestBed.createComponent(CalendarMonthViewComponent);
    fixture.componentInstance.viewDate = new Date('2016-06-01');
    fixture.componentInstance.events = [{
      start: new Date('2016-05-30'),
      end: new Date('2016-06-02'),
      title: 'foo',
      color: {
        primary: 'blue',
        secondary: ''
      }
    }];
    fixture.componentInstance.activeDayIsOpen = true;
    fixture.componentInstance.ngOnChanges({viewDate: {}, events: {}});
    fixture.detectChanges();
    const event: HTMLElement = fixture.nativeElement.querySelector('.cal-event-title');
    expect(event.innerHTML).to.equal('foo');
    fixture.componentInstance.events[0].title = 'bar';
    fixture.detectChanges();
    expect(event.innerHTML).to.equal('bar');
    fixture.destroy();
  });

});
