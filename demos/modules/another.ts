import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'another demo'
})
export class AnotherComponent {}

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