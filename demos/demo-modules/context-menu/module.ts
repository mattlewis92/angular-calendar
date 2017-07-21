import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { ContextMenuModule } from 'ngx-contextmenu';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    DemoUtilsModule
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
