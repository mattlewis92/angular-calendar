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
import * as resizableEvents from './demo-modules/resizable-events';
import * as monthViewBadgeTotal from './demo-modules/month-view-badge-total';
import * as recurringEvents from './demo-modules/recurring-events';
import * as customEventClass from './demo-modules/custom-event-class';
import * as clickableEvents from './demo-modules/clickable-events';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    HighlightJsModule.forRoot(hljs),
    kitchenSink.DemoModule,
    optionalEventEndDates.DemoModule,
    editableDeletableEvents.DemoModule,
    draggableEvents.DemoModule,
    resizableEvents.DemoModule,
    monthViewBadgeTotal.DemoModule,
    recurringEvents.DemoModule,
    customEventClass.DemoModule,
    clickableEvents.DemoModule,
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
      path: 'resizable-events',
      component: resizableEvents.DemoComponent,
      data: {
        label: 'Resizable events'
      }
    }, {
      path: 'month-view-badge-total',
      component: monthViewBadgeTotal.DemoComponent,
      data: {
        label: 'Month view badge total'
      }
    }, {
      path: 'recurring-events',
      component: recurringEvents.DemoComponent,
      data: {
        label: 'Recurring events'
      }
    }, {
      path: 'custom-event-class',
      component: customEventClass.DemoComponent,
      data: {
        label: 'Custom event class'
      }
    }, {
      path: 'clickable-events',
      component: clickableEvents.DemoComponent,
      data: {
        label: 'Clickable events'
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