import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import moment from 'moment';
import {
  CalendarModule,
  CalendarDateFormatter,
  CalendarMomentDateFormatter,
  MOMENT,
  CalendarUtils
} from '../src';
import { CalendarUtilsDateFns } from '../src/calendar-utils/date-fns';

describe('calendar module', () => {
  it('should not require providers to be specified when using CalendarModule.forRoot()', () => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          provide: CalendarUtils,
          useClass: CalendarUtilsDateFns
        })
      ]
    });
    const dateFormatter: CalendarDateFormatter = TestBed.get(
      CalendarDateFormatter
    );
    expect(dateFormatter instanceof CalendarDateFormatter).to.equal(true);
  });

  it('should allow the date formatter to be customsied via the forRoot method', () => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot(
          {
            provide: CalendarUtils,
            useClass: CalendarUtilsDateFns
          },
          {
            dateFormatter: {
              provide: CalendarDateFormatter,
              useClass: CalendarMomentDateFormatter
            }
          }
        )
      ],
      providers: [{ provide: MOMENT, useValue: moment }]
    });
    const dateFormatter: CalendarDateFormatter = TestBed.get(
      CalendarDateFormatter
    );
    expect(dateFormatter instanceof CalendarDateFormatter).to.equal(false);
    expect(dateFormatter instanceof CalendarMomentDateFormatter).to.equal(true);
  });
});
