import {
  inject,
  TestBed
} from '@angular/core/testing';
import { expect } from 'chai';
import {
  CalendarModule,
  CalendarDateFormatter
} from './../src';

describe('calendar module', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule.forRoot()]});
  });

  it('should not require providers to be specified when using CalendarModule.forRoot()',
    inject([CalendarDateFormatter], (dateFormatter) => {
    expect(dateFormatter instanceof CalendarDateFormatter).to.be.true;
  }));

});