import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { AnotherComponent } from './another.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AnotherComponent
  ],
  exports: [
    AnotherComponent
  ]
})
export class AnotherModule {}