import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'highlight.js/styles/github.css';
import '../scss/angular-calendar.scss';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as hljs from 'highlight.js';
import { HighlightJsModule } from 'angular-highlight-js';
import { NgbTabsetModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoAppComponent } from './demo-app.component';
import * as kitchenSink from './demo-modules/kitchen-sink';
import * as asyncEvents from './demo-modules/async-events';
import * as optionalEventEndDates from './demo-modules/optional-event-end-dates';
import * as editableDeletableEvents from './demo-modules/editable-deletable-events';
import * as draggableEvents from './demo-modules/draggable-events';
import * as resizableEvents from './demo-modules/resizable-events';
import * as monthViewBadgeTotal from './demo-modules/month-view-badge-total';
import * as recurringEvents from './demo-modules/recurring-events';
import * as customEventClass from './demo-modules/custom-event-class';
import * as clickableEvents from './demo-modules/clickable-events';
import * as clickableDays from './demo-modules/clickable-days';
import * as dayViewStartEnd from './demo-modules/day-view-start-end';
import * as dayViewHourSplit from './demo-modules/day-view-hour-split';
import * as navigatingBetweenViews from './demo-modules/navigating-between-views';
import * as beforeViewRender from './demo-modules/before-view-render';
import * as i18n from './demo-modules/i18n';
import * as draggableExternalEvents from './demo-modules/draggable-external-events';
import * as allDayEvents from './demo-modules/all-day-events';
import * as customiseDateFormats from './demo-modules/customise-date-formats';
import * as showDatesOnTitles from './demo-modules/show-dates-on-titles';
import * as disableTooltips from './demo-modules/disable-tooltips';
import * as additionalEventProperties from './demo-modules/additional-event-properties';
import * as selectableMonthDay from './demo-modules/selectable-month-day';
import * as minMaxDate from './demo-modules/min-max-date';
import * as excludeDays from './demo-modules/exclude-days';
import * as refreshingTheView from './demo-modules/refreshing-the-view';
import * as customTemplates from './demo-modules/custom-templates';
import * as groupMonthViewEvents from './demo-modules/group-month-view-events';
import * as contextMenu from './demo-modules/context-menu';
import * as weekViewMinutePrecision from './demo-modules/week-view-minute-precision';
import * as extraMonthViewWeeks from './demo-modules/extra-month-view-weeks';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbTabsetModule.forRoot(),
    NgbCollapseModule.forRoot(),
    HighlightJsModule.forRoot(hljs),
    kitchenSink.DemoModule,
    asyncEvents.DemoModule,
    optionalEventEndDates.DemoModule,
    editableDeletableEvents.DemoModule,
    draggableEvents.DemoModule,
    resizableEvents.DemoModule,
    monthViewBadgeTotal.DemoModule,
    recurringEvents.DemoModule,
    customEventClass.DemoModule,
    clickableEvents.DemoModule,
    clickableDays.DemoModule,
    dayViewStartEnd.DemoModule,
    dayViewHourSplit.DemoModule,
    navigatingBetweenViews.DemoModule,
    beforeViewRender.DemoModule,
    i18n.DemoModule,
    draggableExternalEvents.DemoModule,
    allDayEvents.DemoModule,
    customiseDateFormats.DemoModule,
    showDatesOnTitles.DemoModule,
    disableTooltips.DemoModule,
    additionalEventProperties.DemoModule,
    selectableMonthDay.DemoModule,
    minMaxDate.DemoModule,
    excludeDays.DemoModule,
    refreshingTheView.DemoModule,
    customTemplates.DemoModule,
    groupMonthViewEvents.DemoModule,
    contextMenu.DemoModule,
    weekViewMinutePrecision.DemoModule,
    extraMonthViewWeeks.DemoModule,
    RouterModule.forRoot([{
      path: 'kitchen-sink',
      component: kitchenSink.DemoComponent,
      data: {
        label: 'Kitchen sink'
      }
    }, {
      path: 'async-events',
      component: asyncEvents.DemoComponent,
      data: {
        label: 'Async events'
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
      component: clickableDays.DemoComponent,
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
      path: 'before-view-render',
      component: beforeViewRender.DemoComponent,
      data: {
        label: 'Before view render'
      }
    }, {
      path: 'exclude-days',
      component: excludeDays.DemoComponent,
      data: {
        label: 'Exclude Weekends'
      }
    }, {
      path: 'i18n',
      component: i18n.DemoComponent,
      data: {
        label: 'Internationalisation'
      }
    }, {
      path: 'draggable-external-events',
      component: draggableExternalEvents.DemoComponent,
      data: {
        label: 'Draggable external events'
      }
    }, {
      path: 'all-day-events',
      component: allDayEvents.DemoComponent,
      data: {
        label: 'All day events'
      }
    }, {
      path: 'customise-date-formats',
      component: customiseDateFormats.DemoComponent,
      data: {
        label: 'Customise date formats'
      }
    }, {
      path: 'show-dates-on-titles',
      component: showDatesOnTitles.DemoComponent,
      data: {
        label: 'Show dates on title'
      }
    }, {
      path: 'disable-tooltips',
      component: disableTooltips.DemoComponent,
      data: {
        label: 'Disable tooltips'
      }
    }, {
      path: 'additional-event-properties',
      component: additionalEventProperties.DemoComponent,
      data: {
        label: 'Additional event properties'
      }
    }, {
      path: 'selectable-month-day',
      component: selectableMonthDay.DemoComponent,
      data: {
        label: 'Selectable month day'
      }
    }, {
      path: 'min-max-date',
      component: minMaxDate.DemoComponent,
      data: {
        label: 'Min max date'
      }
    }, {
      path: 'refreshing-the-view',
      component: refreshingTheView.DemoComponent,
      data: {
        label: 'Refreshing the view'
      }
    }, {
      path: 'custom-templates',
      component: customTemplates.DemoComponent,
      data: {
        label: 'Custom templates'
      }
    }, {
      path: 'group-month-view-events',
      component: groupMonthViewEvents.DemoComponent,
      data: {
        label: 'Group month view events'
      }
    }, {
      path: 'context-menu',
      component: contextMenu.DemoComponent,
      data: {
        label: 'Context menu'
      }
    }, {
      path: 'week-view-minute-precision',
      component: weekViewMinutePrecision.DemoComponent,
      data: {
        label: 'Week view minute precision'
      }
    }, {
      path: 'extra-month-view-weeks',
      component: extraMonthViewWeeks.DemoComponent,
      data: {
        label: 'Extra month view weeks'
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
