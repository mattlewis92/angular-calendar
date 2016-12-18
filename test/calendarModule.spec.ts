import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import {
  CalendarModule,
  CalendarDateFormatter,
  CalendarEventTitleFormatter
} from './../src';

describe('calendar module', () => {

  it('should not require providers to be specified when using CalendarModule.forRoot()', () => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot()
      ]
    });
    const dateFormatter: CalendarDateFormatter = TestBed.get(CalendarDateFormatter);
    expect(dateFormatter instanceof CalendarDateFormatter).to.be.true;
  });

});