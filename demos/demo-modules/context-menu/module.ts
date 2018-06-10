import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule, CalendarUtils } from 'angular-calendar';
import { ContextMenuModule } from 'ngx-contextmenu';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { CalendarUtilsDateFns } from 'angular-calendar/calendar-utils/date-fns';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: CalendarUtils,
      useClass: CalendarUtilsDateFns
    }),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
