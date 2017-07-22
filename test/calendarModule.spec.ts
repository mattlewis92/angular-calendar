import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import * as moment from 'moment';
import {
  CalendarModule,
  CalendarDateFormatter,
  CalendarMomentDateFormatter,
  MOMENT
} from './../src';

describe('calendar module', () => {
  it('should not require providers to be specified when using CalendarModule.forRoot()', () => {
    TestBed.configureTestingModule({
      imports: [CalendarModule.forRoot()]
    });
    const dateFormatter: CalendarDateFormatter = TestBed.get(
      CalendarDateFormatter
    );
    expect(dateFormatter instanceof CalendarDateFormatter).to.equal(true);
  });

  it('should allow the date formatter to be customsied via the forRoot method', () => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          dateFormatter: {
            provide: CalendarDateFormatter,
            useClass: CalendarMomentDateFormatter
          }
        })
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
