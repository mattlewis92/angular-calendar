import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'highlight.js/styles/github.css';
import '../scss/angular-calendar.scss';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import * as hljs from 'highlight.js';
import { HighlightJsModule } from 'angular-highlight-js';
import { DemoAppComponent } from './demo-app.component';
import * as kitchenSink from './demo-modules/kitchen-sink';
import * as optionalEventEndDates from './demo-modules/optional-event-end-dates';
import * as editableDeletableEvents from './demo-modules/editable-deletable-events';
import * as draggableEvents from './demo-modules/draggable-events';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    HighlightJsModule.forRoot(hljs),
    kitchenSink.DemoModule,
    optionalEventEndDates.DemoModule,
    editableDeletableEvents.DemoModule,
    draggableEvents.DemoModule,
    RouterModule.forRoot([{
      path: 'kitchen-sink',
      component: kitchenSink.DemoComponent,
      data: {
        label: 'Kitchen sink'
      }
    }, {
      path: 'optional-event-end-dates',
      component: optionalEventEndDates.DemoComponent,
      data: {
        label: 'Optional event end dates'
      }
    }, {
      path: 'editable-deletable-events',
      component: editableDeletableEvents.DemoComponent,
      data: {
        label: 'Editable / deletable events'
      }
    }, {
      path: 'draggable-events',
      component: draggableEvents.DemoComponent,
      data: {
        label: 'Draggable events'
      }
    }, {
      path: '**',
      redirectTo: 'kitchen-sink'
    }], {
      useHash: true
    })
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {}