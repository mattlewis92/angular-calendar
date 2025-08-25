import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { DayViewSchedulerComponent } from './day-view-scheduler.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }]),
    DemoComponent,
    DayViewSchedulerComponent,
  ],
  exports: [DemoComponent],
})
export class DemoModule {}
