import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { KitchenSinkComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    KitchenSinkComponent
  ],
  exports: [
    KitchenSinkComponent
  ]
})
export class KitchenSinkModule {}