import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import should be from `angular2-calendar` in your app
import { CalendarModule, CalendarEventTitle, CalendarDateFormatter } from './../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, CalendarModule],
  bootstrap: [DemoComponent],
  providers: [
    CalendarEventTitle,
    CalendarDateFormatter
  ]
})
export class DemoModule {}