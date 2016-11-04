import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import should be from `angular-calendar` in your app
import { CalendarModule } from './../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    CalendarModule.forRoot()
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {}