import {Component} from '@angular/core';
import {NgSwitch} from '@angular/common';
import {CalendarMonthView, CalendarWeekView, CalendarEvent} from './../angular2-calendar';

@Component({
  selector: 'demo-app',
  directives: [NgSwitch, CalendarMonthView, CalendarWeekView],
  styles: [`
    h3 {
      margin: 0;
    }
  `],
  template: `
    <div class="container">
      <div class="row  text-center">
        <div class="col-md-4">
           <div class="btn-group">
             <div class="btn btn-primary">
               Previous
             </div>
             <div class="btn btn-default">
               Today
             </div>
             <div class="btn btn-primary">
               Next
             </div>
           </div>
        </div>
        <div class="col-md-4">
          <h3>Calendar title goes here</h3>
        </div>
        <div class="col-md-4">
          <div class="btn-group">
            <div class="btn btn-primary" (click)="view = 'month'" [class.active]="view === 'month'">Month</div>
            <div class="btn btn-primary" (click)="view = 'week'" [class.active]="view === 'week'">Week</div>
            <div class="btn btn-primary" (click)="view = 'day'" [class.active]="view === 'day'">Day</div>
          </div>
        </div>
      </div>
      <br>
      <div [ngSwitch]="view">
        <mwl-calendar-month-view *ngSwitchCase="'month'" [date]="date" [events]="events"></mwl-calendar-month-view>
        <mwl-calendar-week-view *ngSwitchCase="'week'" [date]="date" [events]="events"></mwl-calendar-week-view>
      </div>
    </div>
  `
})
export class DemoApp {

  private view: string = 'week';

  private date: Date = new Date();

  private events: CalendarEvent[] = [{
    start: new Date(),
    title: 'My event',
    color: 'blue'
  }];

}
