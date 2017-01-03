import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarEventTitleFormatter, CalendarDateFormatter } from 'angular-calendar';
import { DraggableHelper } from 'angular-draggable-droppable';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { CustomDateFormatter } from './custom-date-formatter.provider';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule, // note how we don't use forRoot here
    DemoUtilsModule
  ],
  declarations: [
    DemoComponent
  ],
  exports: [
    DemoComponent
  ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter},
    CalendarEventTitleFormatter,
    DraggableHelper
  ]
})
export class DemoModule {}