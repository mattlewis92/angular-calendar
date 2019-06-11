import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbTabsetModule,
  NgbCollapseModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DemoAppComponent } from './demo-app.component';
import { DemoComponent as DefaultDemoComponent } from './demo-modules/kitchen-sink/component';
import { DemoModule as DefaultDemoModule } from './demo-modules/kitchen-sink/module';
import { environment } from '../environments/environment';
import { CustomHammerConfig } from './hammer-config';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbTabsetModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DragAndDropModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production
    }),
    PerfectScrollbarModule,
    ClipboardModule,
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
          loadChildren: () =>
            import('./demo-modules/async-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Async events'
          }
        },
        {
          path: 'optional-event-end-dates',
          loadChildren: () =>
            import('./demo-modules/optional-event-end-dates/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Optional event end dates'
          }
        },
        {
          path: 'editable-deletable-events',
          loadChildren: () =>
            import('./demo-modules/editable-deletable-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Editable / deletable events'
          }
        },
        {
          path: 'draggable-events',
          loadChildren: () =>
            import('./demo-modules/draggable-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Draggable events'
          }
        },
        {
          path: 'resizable-events',
          loadChildren: () =>
            import('./demo-modules/resizable-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Resizable events'
          }
        },
        {
          path: 'month-view-badge-total',
          loadChildren: () =>
            import('./demo-modules/month-view-badge-total/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Month view badge total'
          }
        },
        {
          path: 'recurring-events',
          loadChildren: () =>
            import('./demo-modules/recurring-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Recurring events'
          }
        },
        {
          path: 'custom-event-class',
          loadChildren: () =>
            import('./demo-modules/custom-event-class/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Custom event class'
          }
        },
        {
          path: 'clickable-events',
          loadChildren: () =>
            import('./demo-modules/clickable-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Clickable events'
          }
        },
        {
          path: 'clickable-days',
          loadChildren: () =>
            import('./demo-modules/clickable-days/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Clickable times'
          }
        },
        {
          path: 'day-view-start-end',
          loadChildren: () =>
            import('./demo-modules/day-view-start-end/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Day view start / end time'
          }
        },
        {
          path: 'day-view-hour-split',
          loadChildren: () =>
            import('./demo-modules/day-view-hour-split/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Day view hour split'
          }
        },
        {
          path: 'navigating-between-views',
          loadChildren: () =>
            import('./demo-modules/navigating-between-views/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Navigating between views'
          }
        },
        {
          path: 'before-view-render',
          loadChildren: () =>
            import('./demo-modules/before-view-render/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Before view render',
            tags: ['disable']
          }
        },
        {
          path: 'exclude-days',
          loadChildren: () =>
            import('./demo-modules/exclude-days/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Exclude Weekends'
          }
        },
        {
          path: 'i18n',
          loadChildren: () =>
            import('./demo-modules/i18n/module').then(m => m.DemoModule),
          data: {
            label: 'Internationalisation',
            tags: ['translation', 'i18n', 'translate', 'locale']
          }
        },
        {
          path: 'draggable-external-events',
          loadChildren: () =>
            import('./demo-modules/draggable-external-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Draggable external events'
          }
        },
        {
          path: 'all-day-events',
          loadChildren: () =>
            import('./demo-modules/all-day-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'All day events'
          }
        },
        {
          path: 'customise-date-formats',
          loadChildren: () =>
            import('./demo-modules/customise-date-formats/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Customise date formats'
          }
        },
        {
          path: 'show-dates-on-titles',
          loadChildren: () =>
            import('./demo-modules/show-dates-on-titles/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Show dates on title'
          }
        },
        {
          path: 'disable-tooltips',
          loadChildren: () =>
            import('./demo-modules/disable-tooltips/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Disable tooltips'
          }
        },
        {
          path: 'additional-event-properties',
          loadChildren: () =>
            import('./demo-modules/additional-event-properties/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Additional event properties'
          }
        },
        {
          path: 'selectable-period',
          loadChildren: () =>
            import('./demo-modules/selectable-period/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Selectable period'
          }
        },
        {
          path: 'min-max-date',
          loadChildren: () =>
            import('./demo-modules/min-max-date/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Min max date'
          }
        },
        {
          path: 'refreshing-the-view',
          loadChildren: () =>
            import('./demo-modules/refreshing-the-view/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Refreshing the view'
          }
        },
        {
          path: 'custom-templates',
          loadChildren: () =>
            import('./demo-modules/custom-templates/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Custom templates'
          }
        },
        {
          path: 'group-month-view-events',
          loadChildren: () =>
            import('./demo-modules/group-month-view-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Group month view events'
          }
        },
        {
          path: 'context-menu',
          loadChildren: () =>
            import('./demo-modules/context-menu/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Context menu',
            tags: ['right click']
          }
        },
        {
          path: 'week-view-minute-precision',
          loadChildren: () =>
            import('./demo-modules/week-view-minute-precision/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Week view minute precision'
          }
        },
        {
          path: 'extra-month-view-weeks',
          loadChildren: () =>
            import('./demo-modules/extra-month-view-weeks/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Extra month view weeks'
          }
        },
        {
          path: 'disable-slide-animation',
          loadChildren: () =>
            import('./demo-modules/disable-slide-animation/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Disable slide animation'
          }
        },
        {
          path: 'no-events-label',
          loadChildren: () =>
            import('./demo-modules/no-events-label/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'No events label'
          }
        },
        {
          path: 'moment',
          loadChildren: () =>
            import('./demo-modules/moment/module').then(m => m.DemoModule),
          data: {
            label: 'Use moment'
          }
        },
        {
          path: 'day-view-scheduler',
          loadChildren: () =>
            import('./demo-modules/day-view-scheduler/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Day view scheduler'
          }
        },
        {
          path: 'drag-to-create-events',
          loadChildren: () =>
            import('./demo-modules/drag-to-create-events/module').then(
              m => m.DemoModule
            ),
          data: {
            label: 'Drag to create events'
          }
        },
        {
          path: 'dark-theme',
          loadChildren: () =>
            import('./demo-modules/dark-theme/module').then(m => m.DemoModule),
          data: {
            label: 'Dark theme',
            darkTheme: true
          }
        },
        {
          path: '**',
          redirectTo: 'kitchen-sink'
        }
      ],
      {
        useHash: true
      }
    )
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {}
