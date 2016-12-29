import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule
  ],
  declarations: [
    CalendarHeaderComponent
  ],
  exports: [
    CalendarHeaderComponent
  ]
})
export class DemoUtilsModule {}