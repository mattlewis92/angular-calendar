import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';

@NgModule({
  imports: [CommonModule, CalendarModule.forRoot(), DemoUtilsModule],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
