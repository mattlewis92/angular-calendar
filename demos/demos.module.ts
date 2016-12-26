import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import should be from `angular-calendar` in your app
import { CalendarModule } from './../src';
import { DemosComponent } from './demos.component';

@NgModule({
  declarations: [DemosComponent],
  imports: [
    BrowserModule,
    CalendarModule.forRoot()
  ],
  bootstrap: [DemosComponent]
})
export class DemosModule {}