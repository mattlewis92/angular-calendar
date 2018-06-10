import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, CalendarUtils } from 'angular-calendar';
import { CalendarUtilsDateFns } from 'angular-calendar/calendar-utils/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: CalendarUtils,
      useClass: CalendarUtilsDateFns
    }),
    DemoUtilsModule
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
