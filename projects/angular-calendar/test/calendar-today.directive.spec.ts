import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { startOfDay } from 'date-fns';
import { CalendarModule, DateAdapter } from '../src';
import { adapterFactory } from '../src/date-adapters/date-fns';

@Component({
  template: '<button mwlCalendarToday [(viewDate)]="viewDate">Next</button>',
})
class TestComponent {
  public viewDate: Date;
}

describe('mwlCalendarNextView directive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
      ],
      declarations: [TestComponent],
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
      startOfDay(new Date())
    );
    fixture.destroy();
  });
});
