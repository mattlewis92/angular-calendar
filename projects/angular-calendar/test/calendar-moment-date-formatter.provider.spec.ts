import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import moment from 'moment';
import { startOfDay } from 'date-fns';
import {
  CalendarMomentDateFormatter,
  MOMENT,
  CalendarNativeDateFormatter,
  DateAdapter,
} from '../src';
import { adapterFactory } from '../src/date-adapters/date-fns';

describe('calendarMomentDateFormatter provider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarMomentDateFormatter,
        { provide: MOMENT, useValue: moment },
        CalendarNativeDateFormatter,
        {
          provide: DateAdapter,
          useFactory: adapterFactory,
        },
      ],
    });
  });

  let dateFormatter: CalendarMomentDateFormatter;
  beforeEach(inject([CalendarMomentDateFormatter], (_dateFormatter_) => {
    dateFormatter = _dateFormatter_;
  }));

  it('monthViewColumnHeader', () => {
    expect(
      dateFormatter.monthViewColumnHeader({
        date: new Date('2016-01-01'),
        locale: 'en',
      })
    ).to.equal('Friday');
  });

  it('monthViewDayNumber', () => {
    expect(
      dateFormatter.monthViewDayNumber({
        date: new Date('2016-01-01'),
        locale: 'en',
      })
    ).to.equal('1');
  });

  it('monthViewTitle', () => {
    expect(
      dateFormatter.monthViewTitle({
        date: new Date('2016-01-01'),
        locale: 'en',
      })
    ).to.equal('January 2016');
  });

  it('weekViewColumnHeader', () => {
    expect(
      dateFormatter.weekViewColumnHeader({
        date: new Date('2016-01-01'),
        locale: 'en',
      })
    ).to.equal('Friday');
  });

  it('weekViewColumnSubHeader', () => {
    expect(
      dateFormatter.weekViewColumnSubHeader({
        date: new Date('2016-01-01'),
        locale: 'en',
      })
    ).to.equal('Jan 1');
  });

  it('weekViewTitle', () => {
    expect(
      dateFormatter.weekViewTitle({
        date: new Date('2016-01-04'),
        locale: 'en',
      })
    ).to.equal('Jan 3 - Jan 9, 2016');
  });

  it('weekViewHour', () => {
    expect(
      dateFormatter.weekViewHour({
        date: startOfDay(new Date('2016-01-01')),
        locale: 'en',
      })
    ).to.equal('12am');
  });

  it('dayViewHour', () => {
    expect(
      dateFormatter.dayViewHour({
        date: startOfDay(new Date('2016-01-01')),
        locale: 'en',
      })
    ).to.equal('12am');
  });

  it('dayViewTitle', () => {
    expect(
      dateFormatter.dayViewTitle({ date: new Date('2016-01-01'), locale: 'en' })
    ).to.equal('Friday, January 1, 2016');
  });
});
