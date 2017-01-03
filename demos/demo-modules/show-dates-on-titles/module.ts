import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarEventTitleFormatter, CalendarDateFormatter } from 'angular-calendar';
import { DraggableHelper } from 'angular-draggable-droppable';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';

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
    CalendarDateFormatter,
    {provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatter},
    DraggableHelper
  ]
})
export class DemoModule {}