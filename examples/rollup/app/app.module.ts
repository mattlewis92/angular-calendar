import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CalendarModule } from 'angular2-calendar';
import { AppComponent }   from './app.component';

@NgModule({
  imports:      [ BrowserModule, CalendarModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
