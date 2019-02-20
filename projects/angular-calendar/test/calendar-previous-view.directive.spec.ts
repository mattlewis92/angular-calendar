import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { CalendarModule, DateAdapter } from '../src';
import { adapterFactory } from '../src/date-adapters/date-fns';

@Component({
  template: `
    <button
      mwlCalendarPreviousView
      [view]="view"
      [(viewDate)]="viewDate"
      [excludeDays]="excludeDays"
      [daysInWeek]="daysInWeek"
    >
      Previous
    </button>
  `
})
class TestComponent {
  public view: string;
  public viewDate: Date;
  excludeDays: number[] = [];
  daysInWeek: number;
}

describe('calendarPreviousView directive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        })
      ],
      declarations: [TestComponent]
    });
  });

  it('should decrease the view date by 1 month', () => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    fixture.componentInstance.view = 'month';
    fixture.componentInstance.viewDate = new Date('2017-02-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(
      new Date('2017-01-28')
    );
    fixture.destroy();
  });

  it('should decrease the view date by 1 week', () => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    fixture.componentInstance.view = 'week';
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(
      new Date('2017-01-21')
    );
    fixture.destroy();
  });

  it('should decrease the view date by 1 day', () => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    fixture.componentInstance.view = 'day';
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(
      new Date('2017-01-27')
    );
    fixture.destroy();
  });

  it('should decrease the view date by 1 day, skipping weekends', () => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    fixture.componentInstance.view = 'day';
    fixture.componentInstance.viewDate = new Date('2018-06-18');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(
      new Date('2018-06-15')
    );
    fixture.destroy();
  });

  it('should decrease the view date by 4 days, skipping weekends', () => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    fixture.componentInstance.view = 'week';
    fixture.componentInstance.viewDate = new Date('2018-08-02');
    fixture.componentInstance.excludeDays = [0, 6];
    fixture.componentInstance.daysInWeek = 4;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(
      new Date('2018-07-27')
    );
    fixture.destroy();
  });
});
