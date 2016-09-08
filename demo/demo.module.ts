import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CalendarModule, CalendarEventTitle, CalendarDateFormatter} from './../angular2-calendar';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, CalendarModule],
  bootstrap: [Demo],
  providers: [
    CalendarEventTitle,
    CalendarDateFormatter
  ]
})
export class DemoModule {}