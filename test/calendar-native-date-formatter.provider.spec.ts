import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { startOfDay } from 'date-fns';
import { CalendarNativeDateFormatter, DateAdapter } from '../src';
import { adapterFactory } from '../src/date-adapters/date-fns';

describe('calendarNativeDateFormatter provider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarNativeDateFormatter,
        {
          provide: DateAdapter,
          useFactory: adapterFactory
        }
      ]
    });
  });

  let dateFormatter: CalendarNativeDateFormatter;
  beforeEach(inject([CalendarNativeDateFormatter], _dateFormatter_ => {
    dateFormatter = _dateFormatter_;
  }));

  it('monthViewColumnHeader', () => {
    expect(
      dateFormatter.monthViewColumnHeader({
        date: new Date('2016-01-01'),
        locale: 'en'
      })
    ).to.equal('Friday');
  });

  it('monthViewDayNumber', () => {
    expect(
      dateFormatter.monthViewDayNumber({
        date: new Date('2016-01-01'),
        locale: 'en'
      })
    ).to.equal('1');
  });

  it('monthViewTitle', () => {
    expect(
      dateFormatter.monthViewTitle({
        date: new Date('2016-01-01'),
        locale: 'en'
      })
    ).to.equal('January 2016');
  });

  it('weekViewColumnHeader', () => {
    expect(
      dateFormatter.weekViewColumnHeader({
        date: new Date('2016-01-01'),
        locale: 'en'
      })
    ).to.equal('Friday');
  });

  it('weekViewColumnSubHeader', () => {
    expect(
      dateFormatter.weekViewColumnSubHeader({
        date: new Date('2016-01-01'),
        locale: 'en'
      })
    ).to.equal('Jan 1');
  });

  it('weekViewTitle', () => {
    expect(
      dateFormatter.weekViewTitle({
        date: new Date('2016-01-04'),
        locale: 'en'
      })
    ).to.equal('Week 1 of 2016');
  });

  it('weekViewHour', () => {
    expect(
      dateFormatter.weekViewHour({
        date: startOfDay(new Date('2016-01-01')),
        locale: 'en'
      })
    ).to.equal('12 AM');
  });

  it('dayViewHour', () => {
    expect(
      dateFormatter.dayViewHour({
        date: startOfDay(new Date('2016-01-01')),
        locale: 'en'
      })
    ).to.equal('12 AM');
  });

  it('dayViewTitle', () => {
    expect(
      dateFormatter.dayViewTitle({ date: new Date('2016-01-01'), locale: 'en' })
    ).to.equal('Friday, January 1, 2016');
  });
});
