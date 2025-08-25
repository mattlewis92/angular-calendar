import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import {
  A11yParams,
  CalendarA11yPipe,
  CalendarModule,
  DateAdapter,
  provideCalendar,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  template: '{{ a11yParams | calendarA11y:method }}',
  imports: [CalendarA11yPipe],
})
class TestComponent {
  a11yParams: A11yParams;
  method: string;
}

describe('calendarA11y pipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
      ],
    });
  });

  it('should throw when an invalid method is passed', () => {
    const fixture: ComponentFixture<TestComponent> =
      TestBed.createComponent(TestComponent);
    fixture.componentInstance.a11yParams = {};
    fixture.componentInstance.method = 'invalid';
    expect(() => fixture.detectChanges()).to.throw(
      /^invalid is not a valid a11y method. Can only be one of/,
    );
  });
});
