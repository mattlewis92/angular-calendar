import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { bootstrapApplication } from '@angular/platform-browser';
import { Angulartics2Module } from 'angulartics2';
import { withHashLocation, provideRouter } from '@angular/router';
import { DemoComponent as DefaultDemoComponent } from './app/demo-modules/kitchen-sink/component';
import { DemoAppComponent } from './app/demo-app.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { provideHttpClient } from '@angular/common/http';
import { DateAdapter, provideCalendar } from 'angular-calendar';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DemoAppComponent, {
  providers: [
    importProvidersFrom(
      Angulartics2Module.forRoot({
        developerMode: !environment.production,
      }),
    ),
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
    provideFlatpickrDefaults(),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          scss: () => import('highlight.js/lib/languages/scss'),
        },
      },
    },
    provideHttpClient(),
    provideRouter(
      [
        {
          path: 'kitchen-sink',
          component: DefaultDemoComponent,
          data: {
            label: 'Kitchen sink',
          },
        },
        {
          path: 'async-events',
          loadComponent: () =>
            import('./app/demo-modules/async-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Async events',
          },
        },
        {
          path: 'optional-event-end-dates',
          loadComponent: () =>
            import(
              './app/demo-modules/optional-event-end-dates/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Optional event end dates',
          },
        },
        {
          path: 'editable-deletable-events',
          loadComponent: () =>
            import(
              './app/demo-modules/editable-deletable-events/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Editable / deletable events',
          },
        },
        {
          path: 'draggable-events',
          loadComponent: () =>
            import('./app/demo-modules/draggable-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Draggable events',
          },
        },
        {
          path: 'resizable-events',
          loadComponent: () =>
            import('./app/demo-modules/resizable-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Resizable events',
          },
        },
        {
          path: 'month-view-badge-total',
          loadComponent: () =>
            import('./app/demo-modules/month-view-badge-total/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Month view badge total',
          },
        },
        {
          path: 'recurring-events',
          loadComponent: () =>
            import('./app/demo-modules/recurring-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Recurring events',
          },
        },
        {
          path: 'custom-event-class',
          loadComponent: () =>
            import('./app/demo-modules/custom-event-class/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Custom event class',
          },
        },
        {
          path: 'clickable-events',
          loadComponent: () =>
            import('./app/demo-modules/clickable-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Clickable events',
          },
        },
        {
          path: 'clickable-days',
          loadComponent: () =>
            import('./app/demo-modules/clickable-days/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Clickable times',
          },
        },
        {
          path: 'custom-hour-duration',
          loadComponent: () =>
            import('./app/demo-modules/custom-hour-duration/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Custom hour duration',
          },
        },
        {
          path: 'day-view-start-end',
          loadComponent: () =>
            import('./app/demo-modules/day-view-start-end/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Day view start / end time',
          },
        },
        {
          path: 'day-view-hour-split',
          loadComponent: () =>
            import('./app/demo-modules/day-view-hour-split/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Day view hour split',
          },
        },
        {
          path: 'navigating-between-views',
          loadComponent: () =>
            import(
              './app/demo-modules/navigating-between-views/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Navigating between views',
          },
        },
        {
          path: 'before-view-render',
          loadComponent: () =>
            import('./app/demo-modules/before-view-render/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Before view render',
            tags: ['disable'],
          },
        },
        {
          path: 'exclude-days',
          loadComponent: () =>
            import('./app/demo-modules/exclude-days/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Exclude Weekends',
          },
        },
        {
          path: 'i18n',
          loadComponent: () =>
            import('./app/demo-modules/i18n/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Internationalisation',
            tags: ['translation', 'i18n', 'translate', 'locale'],
          },
        },
        {
          path: 'draggable-external-events',
          loadComponent: () =>
            import(
              './app/demo-modules/draggable-external-events/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Draggable external events',
          },
        },
        {
          path: 'all-day-events',
          loadComponent: () =>
            import('./app/demo-modules/all-day-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'All day events',
          },
        },
        {
          path: 'customise-date-formats',
          loadComponent: () =>
            import('./app/demo-modules/customise-date-formats/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Customise date formats',
          },
        },
        {
          path: 'show-dates-on-titles',
          loadComponent: () =>
            import('./app/demo-modules/show-dates-on-titles/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Show dates on title',
          },
        },
        {
          path: 'disable-tooltips',
          loadComponent: () =>
            import('./app/demo-modules/disable-tooltips/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Disable tooltips',
          },
        },
        {
          path: 'additional-event-properties',
          loadComponent: () =>
            import(
              './app/demo-modules/additional-event-properties/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Additional event properties',
          },
        },
        {
          path: 'selectable-period',
          loadComponent: () =>
            import('./app/demo-modules/selectable-period/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Selectable period',
          },
        },
        {
          path: 'min-max-date',
          loadComponent: () =>
            import('./app/demo-modules/min-max-date/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Min max date',
          },
        },
        {
          path: 'refreshing-the-view',
          loadComponent: () =>
            import('./app/demo-modules/refreshing-the-view/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Refreshing the view',
          },
        },
        {
          path: 'custom-templates',
          loadComponent: () =>
            import('./app/demo-modules/custom-templates/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Custom templates',
          },
        },
        {
          path: 'group-similar-events',
          loadComponent: () =>
            import('./app/demo-modules/group-similar-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Group similar events',
          },
        },
        {
          path: 'context-menu',
          loadComponent: () =>
            import('./app/demo-modules/context-menu/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Context menu',
            tags: ['right click'],
          },
        },
        {
          path: 'week-view-minute-precision',
          loadComponent: () =>
            import(
              './app/demo-modules/week-view-minute-precision/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Week view minute precision',
          },
        },
        {
          path: 'extra-month-view-weeks',
          loadComponent: () =>
            import('./app/demo-modules/extra-month-view-weeks/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Extra month view weeks',
          },
        },
        {
          path: 'disable-slide-animation',
          loadComponent: () =>
            import('./app/demo-modules/disable-slide-animation/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Disable slide animation',
          },
        },
        {
          path: 'no-events-label',
          loadComponent: () =>
            import('./app/demo-modules/no-events-label/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'No events label',
          },
        },
        {
          path: 'moment',
          loadComponent: () =>
            import('./app/demo-modules/moment/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Use moment',
          },
        },
        {
          path: 'dayjs',
          loadComponent: () =>
            import('./app/demo-modules/dayjs/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Use dayjs',
          },
        },
        {
          path: 'day-view-scheduler',
          loadComponent: () =>
            import('./app/demo-modules/day-view-scheduler/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Day view scheduler',
          },
        },
        {
          path: 'drag-to-create-events',
          loadComponent: () =>
            import('./app/demo-modules/drag-to-create-events/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Drag to create events',
          },
        },
        {
          path: 'responsive-week-view',
          loadComponent: () =>
            import('./app/demo-modules/responsive-week-view/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Responsive week view',
          },
        },
        {
          path: 'dark-theme',
          loadComponent: () =>
            import('./app/demo-modules/dark-theme/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Dark theme',
            darkTheme: true,
          },
        },
        {
          path: 'week-view-event-margin',
          loadComponent: () =>
            import('./app/demo-modules/week-view-event-margin/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Week view event margin',
          },
        },
        {
          path: 'customise-current-time-marker',
          loadComponent: () =>
            import(
              './app/demo-modules/customise-current-time-marker/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Customise current time marker',
          },
        },
        {
          path: 'public-holidays',
          loadComponent: () =>
            import('./app/demo-modules/public-holidays/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Public holidays',
          },
        },
        {
          path: 'scroll-to-current-time',
          loadComponent: () =>
            import('./app/demo-modules/scroll-to-current-time/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'Scroll to current time',
          },
        },
        {
          path: 'rtl',
          loadComponent: () =>
            import('./app/demo-modules/rtl/component').then(
              (c) => c.DemoComponent,
            ),
          data: {
            label: 'RTL',
          },
        },
        {
          path: 'validate-drag-and-resize',
          loadComponent: () =>
            import(
              './app/demo-modules/validate-drag-and-resize/component'
            ).then((c) => c.DemoComponent),
          data: {
            label: 'Validate dragging and resizing',
          },
        },
        {
          path: '**',
          redirectTo: 'kitchen-sink',
        },
      ],
      withHashLocation(),
    ),
  ],
}).catch((err) => console.log(err));
