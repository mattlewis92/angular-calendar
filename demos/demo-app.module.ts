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
import * as dayClick from './demo-modules/day-click';
import * as dayViewStartEnd from './demo-modules/day-view-start-end';
import * as dayViewHourSplit from './demo-modules/day-view-hour-split';
import * as navigatingBetweenViews from './demo-modules/navigating-between-views';
import * as dayModifier from './demo-modules/day-modifier';
import * as i18n from './demo-modules/i18n';

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
    dayClick.DemoModule,
    dayViewStartEnd.DemoModule,
    dayViewHourSplit.DemoModule,
    navigatingBetweenViews.DemoModule,
    dayModifier.DemoModule,
    i18n.DemoModule,
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
      path: 'clickable-days',
      component: dayClick.DemoComponent,
      data: {
        label: 'Clickable days'
      }
    }, {
      path: 'day-view-start-end',
      component: dayViewStartEnd.DemoComponent,
      data: {
        label: 'Day view start / end time'
      }
    }, {
      path: 'day-view-hour-split',
      component: dayViewHourSplit.DemoComponent,
      data: {
        label: 'Day view hour split'
      }
    }, {
      path: 'navigating-between-views',
      component: navigatingBetweenViews.DemoComponent,
      data: {
        label: 'Navigating between views'
      }
    }, {
      path: 'day-modifier',
      component: dayModifier.DemoComponent,
      data: {
        label: 'Day modifier'
      }
    }, {
      path: 'i18n',
      component: i18n.DemoComponent,
      data: {
        label: 'Internationalisation'
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