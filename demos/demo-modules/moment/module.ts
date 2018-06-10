import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  CalendarUtils,
  MOMENT
} from 'angular-calendar';
import moment from 'moment';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { CalendarUtilsMoment } from 'angular-calendar/calendar-utils/moment';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(
      {
        provide: CalendarUtils,
        useClass: CalendarUtilsMoment
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter
        }
      }
    ),
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent],
  providers: [
    {
      provide: MOMENT,
      useValue: moment
    }
  ]
})
export class DemoModule {}
