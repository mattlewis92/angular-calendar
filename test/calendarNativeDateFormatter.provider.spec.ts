import {
  inject,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {
  CalendarNativeDateFormatter
} from './../angular2-calendar';

describe('calendarNativeDateFormatter provider', () => {

  beforeEach(() => {
    TestBed.configureCompiler({
      providers: [CalendarNativeDateFormatter]
    });
  });

  let dateFormatter: CalendarNativeDateFormatter;
  beforeEach(inject([CalendarNativeDateFormatter], (_dateFormatter_) => {
    dateFormatter = _dateFormatter_;
  }));

  it('monthViewColumnHeader', () => {
    expect(dateFormatter.monthViewColumnHeader({date: new Date('2016-01-01'), locale: 'en'})).to.equal('Fri');
  });

  it('monthViewDayNumber', () => {
    expect(dateFormatter.monthViewDayNumber({date: new Date('2016-01-01'), locale: 'en'})).to.equal('1');
  });

  it('monthViewTitle', () => {
    expect(dateFormatter.monthViewTitle({date: new Date('2016-01-01'), locale: 'en'})).to.equal('Jan 2016');
  });

  it('weekViewColumnHeader', () => {
    expect(dateFormatter.weekViewColumnHeader({date: new Date('2016-01-01'), locale: 'en'})).to.equal('Fri');
  });

  it('weekViewColumnSubHeader', () => {
    expect(dateFormatter.weekViewColumnSubHeader({date: new Date('2016-01-01'), locale: 'en'})).to.equal('Jan 1');
  });

  it('weekViewTitle', () => {
    expect(dateFormatter.weekViewTitle({date: new Date('2016-01-04'), locale: 'en'})).to.equal('Week 1 of 2016');
  });

  it('dayViewHour', () => {
    expect(dateFormatter.dayViewHour({date: new Date('2016-01-01'), locale: 'en'})).to.equal('12 AM');
  });

  it('dayViewTitle', () => {
    expect(dateFormatter.dayViewTitle({date: new Date('2016-01-01'), locale: 'en'})).to.equal('Fri, Jan 1, 2016');
  });

});
