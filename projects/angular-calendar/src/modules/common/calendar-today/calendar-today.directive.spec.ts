import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { startOfDay } from 'date-fns';
import {
  CalendarModule,
  CalendarTodayDirective,
  DateAdapter,
  provideCalendar,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  template: '<button mwlCalendarToday [(viewDate)]="viewDate">Next</button>',
  imports: [CalendarTodayDirective],
})
class TestComponent {
  public viewDate: Date;
}

describe('mwlCalendarNextView directive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
      ],
    });
  });

  it('should set the view date to the start of today', () => {
    const fixture: ComponentFixture<TestComponent> =
      TestBed.createComponent(TestComponent);
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(
      startOfDay(new Date()),
    );
    fixture.destroy();
  });
});
