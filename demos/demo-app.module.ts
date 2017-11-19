import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'highlight.js/styles/github.css';
import '../src/angular-calendar.scss';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTabsetModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoAppComponent } from './demo-app.component';
import { DemoComponent as DefaultDemoComponent } from './demo-modules/kitchen-sink/component';
import { DemoModule as DefaultDemoModule } from './demo-modules/kitchen-sink/module';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbTabsetModule.forRoot(),
    NgbCollapseModule.forRoot(),
    DefaultDemoModule,
    RouterModule.forRoot(
      [
        {
          path: 'kitchen-sink',
          component: DefaultDemoComponent,
          data: {
            label: 'Kitchen sink'
          }
        },
        {
          path: 'async-events',
          loadChildren: './demo-modules/async-events/module#DemoModule',
          data: {
            label: 'Async events'
          }
        },
        {
          path: 'optional-event-end-dates',
          loadChildren:
            './demo-modules/optional-event-end-dates/module#DemoModule',
          data: {
            label: 'Optional event end dates'
          }
        },
        {
          path: 'editable-deletable-events',
          loadChildren:
            './demo-modules/editable-deletable-events/module#DemoModule',
          data: {
            label: 'Editable / deletable events'
          }
        },
        {
          path: 'draggable-events',
          loadChildren: './demo-modules/draggable-events/module#DemoModule',
          data: {
            label: 'Draggable events'
          }
        },
        {
          path: 'resizable-events',
          loadChildren: './demo-modules/resizable-events/module#DemoModule',
          data: {
            label: 'Resizable events'
          }
        },
        {
          path: 'month-view-badge-total',
          loadChildren:
            './demo-modules/month-view-badge-total/module#DemoModule',
          data: {
            label: 'Month view badge total'
          }
        },
        {
          path: 'recurring-events',
          loadChildren: './demo-modules/recurring-events/module#DemoModule',
          data: {
            label: 'Recurring events'
          }
        },
        {
          path: 'custom-event-class',
          loadChildren: './demo-modules/custom-event-class/module#DemoModule',
          data: {
            label: 'Custom event class'
          }
        },
        {
          path: 'clickable-events',
          loadChildren: './demo-modules/clickable-events/module#DemoModule',
          data: {
            label: 'Clickable events'
          }
        },
        {
          path: 'clickable-days',
          loadChildren: './demo-modules/clickable-days/module#DemoModule',
          data: {
            label: 'Clickable days'
          }
        },
        {
          path: 'day-view-start-end',
          loadChildren: './demo-modules/day-view-start-end/module#DemoModule',
          data: {
            label: 'Day view start / end time'
          }
        },
        {
          path: 'day-view-hour-split',
          loadChildren: './demo-modules/day-view-hour-split/module#DemoModule',
          data: {
            label: 'Day view hour split'
          }
        },
        {
          path: 'navigating-between-views',
          loadChildren:
            './demo-modules/navigating-between-views/module#DemoModule',
          data: {
            label: 'Navigating between views'
          }
        },
        {
          path: 'before-view-render',
          loadChildren: './demo-modules/before-view-render/module#DemoModule',
          data: {
            label: 'Before view render'
          }
        },
        {
          path: 'exclude-days',
          loadChildren: './demo-modules/exclude-days/module#DemoModule',
          data: {
            label: 'Exclude Weekends'
          }
        },
        {
          path: 'i18n',
          loadChildren: './demo-modules/i18n/module#DemoModule',
          data: {
            label: 'Internationalisation'
          }
        },
        {
          path: 'draggable-external-events',
          loadChildren:
            './demo-modules/draggable-external-events/module#DemoModule',
          data: {
            label: 'Draggable external events'
          }
        },
        {
          path: 'all-day-events',
          loadChildren: './demo-modules/all-day-events/module#DemoModule',
          data: {
            label: 'All day events'
          }
        },
        {
          path: 'customise-date-formats',
          loadChildren:
            './demo-modules/customise-date-formats/module#DemoModule',
          data: {
            label: 'Customise date formats'
          }
        },
        {
          path: 'show-dates-on-titles',
          loadChildren: './demo-modules/show-dates-on-titles/module#DemoModule',
          data: {
            label: 'Show dates on title'
          }
        },
        {
          path: 'disable-tooltips',
          loadChildren: './demo-modules/disable-tooltips/module#DemoModule',
          data: {
            label: 'Disable tooltips'
          }
        },
        {
          path: 'additional-event-properties',
          loadChildren:
            './demo-modules/additional-event-properties/module#DemoModule',
          data: {
            label: 'Additional event properties'
          }
        },
        {
          path: 'selectable-month-day',
          loadChildren: './demo-modules/selectable-month-day/module#DemoModule',
          data: {
            label: 'Selectable month day'
          }
        },
        {
          path: 'min-max-date',
          loadChildren: './demo-modules/min-max-date/module#DemoModule',
          data: {
            label: 'Min max date'
          }
        },
        {
          path: 'refreshing-the-view',
          loadChildren: './demo-modules/refreshing-the-view/module#DemoModule',
          data: {
            label: 'Refreshing the view'
          }
        },
        {
          path: 'custom-templates',
          loadChildren: './demo-modules/custom-templates/module#DemoModule',
          data: {
            label: 'Custom templates'
          }
        },
        {
          path: 'group-month-view-events',
          loadChildren:
            './demo-modules/group-month-view-events/module#DemoModule',
          data: {
            label: 'Group month view events'
          }
        },
        {
          path: 'context-menu',
          loadChildren: './demo-modules/context-menu/module#DemoModule',
          data: {
            label: 'Context menu'
          }
        },
        {
          path: 'week-view-minute-precision',
          loadChildren:
            './demo-modules/week-view-minute-precision/module#DemoModule',
          data: {
            label: 'Week view minute precision'
          }
        },
        {
          path: 'extra-month-view-weeks',
          loadChildren:
            './demo-modules/extra-month-view-weeks/module#DemoModule',
          data: {
            label: 'Extra month view weeks'
          }
        },
        {
          path: 'disable-slide-animation',
          loadChildren:
            './demo-modules/disable-slide-animation/module#DemoModule',
          data: {
            label: 'Disable slide animation'
          }
        },
        {
          path: '**',
          redirectTo: 'kitchen-sink'
        }
      ],
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {}
