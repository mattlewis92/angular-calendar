import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { expect } from 'chai';
import { CalendarModule } from '../src';

@Component({
  template: '<button mwlCalendarNextView [view]="view" [(viewDate)]="viewDate">Next</button>'
})
class TestComponent {
  public view: string;
  public viewDate: Date;
}

describe('mwlCalendarNextView directive', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CalendarModule.forRoot()], declarations: [TestComponent]});
  });

  it('should increase the view date by 1 month', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.componentInstance.view = 'month';
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(new Date('2017-02-28'));
    fixture.destroy();
  });

  it('should increase the view date by 1 week', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.componentInstance.view = 'week';
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(new Date('2017-02-04'));
    fixture.destroy();
  });

  it('should increase the view date by 1 day', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.componentInstance.view = 'day';
    fixture.componentInstance.viewDate = new Date('2017-01-28');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.viewDate).to.deep.equal(new Date('2017-01-29'));
    fixture.destroy();
  });

});