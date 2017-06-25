import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ResizableModule } from 'angular-resizable-element';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent, DragEventsOutsideWeekViewComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    DragAndDropModule,
    ResizableModule,
    DemoUtilsModule
  ],
  declarations: [
    DemoComponent,
    DragEventsOutsideWeekViewComponent
  ],
  exports: [
    DemoComponent
  ]
})
export class DemoModule {}