import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import {
  CalendarModule,
  CalendarDateFormatter,
  CalendarEventTitle
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

  it('should allow a custom date formatter to be used', () => {
    class MyDateFormatter extends CalendarDateFormatter {}
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          dateFormatter: {
            provide: CalendarDateFormatter,
            useClass: MyDateFormatter
          }
        })
      ]
    });
    const dateFormatter: MyDateFormatter = TestBed.get(CalendarDateFormatter);
    expect(dateFormatter instanceof MyDateFormatter).to.be.true;
  });

  it('should allow a custom title formatter to be used', () => {
    class MyEventTitle extends CalendarEventTitle {}
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          dateFormatter: {
            provide: CalendarEventTitle,
            useClass: MyEventTitle
          }
        })
      ]
    });
    const eventTitle: MyEventTitle = TestBed.get(CalendarEventTitle);
    expect(eventTitle instanceof MyEventTitle).to.be.true;
  });

});