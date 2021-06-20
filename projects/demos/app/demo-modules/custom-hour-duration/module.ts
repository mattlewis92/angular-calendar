import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CalendarModule,
  DateAdapter,
  CalendarNativeDateFormatter,
  CalendarDateFormatter,
  DateFormatterParams,
} from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: DemoModule,
        },
      }
    ),
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }]),
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent],
})
export class DemoModule extends CalendarNativeDateFormatter {
  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}
