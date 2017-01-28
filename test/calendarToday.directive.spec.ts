import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { expect } from 'chai';
import startOfToday from 'date-fns/start_of_today';
import { CalendarModule } from '../src';

@Component({
  template: '<button mwlCalendarToday [(viewDate)]="viewDate">Next</button>'
})
class TestComponent {
  public viewDate: Date;
}

describe('mwlCalendarNextView directive', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule.forRoot()], declarations: [TestComponent]});
  });

  it('should set the view date to the start of today', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(startOfToday());
    fixture.destroy();
  });

});