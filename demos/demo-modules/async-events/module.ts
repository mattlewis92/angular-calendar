import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CalendarModule.forRoot(),
    DemoUtilsModule
  ],
  declarations: [
    DemoComponent
  ],
  exports: [
    DemoComponent
  ]
})
export class DemoModule {}