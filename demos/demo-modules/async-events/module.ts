import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CalendarModule, CalendarUtils } from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { CalendarUtilsDateFns } from 'angular-calendar/calendar-utils/date-fns';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: CalendarUtils,
      useClass: CalendarUtilsDateFns
    }),
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
