import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// import should be from `angular2-calendar` in your app
import {CalendarModule, CalendarEventTitle, CalendarDateFormatter} from './../src';
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