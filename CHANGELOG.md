# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.26.6"></a>
## [0.26.6](https://github.com/mattlewis92/angular-calendar/compare/v0.26.5...v0.26.6) (2019-02-05)


### Bug Fixes

* allow resizing events back to their original positions ([0b478b8](https://github.com/mattlewis92/angular-calendar/commit/0b478b8))



<a name="0.26.5"></a>
## [0.26.5](https://github.com/mattlewis92/angular-calendar/compare/v0.26.4...v0.26.5) (2019-02-03)


### Bug Fixes

* allow events to be dragged back to their original location ([cb07924](https://github.com/mattlewis92/angular-calendar/commit/cb07924)), closes [#847](https://github.com/mattlewis92/angular-calendar/issues/847)
* **week-view:** handle event objects being changed when resizing ([754d427](https://github.com/mattlewis92/angular-calendar/commit/754d427))
* **week-view:** workaround js error when resizing events ([94c51da](https://github.com/mattlewis92/angular-calendar/commit/94c51da))



<a name="0.26.4"></a>
## [0.26.4](https://github.com/mattlewis92/angular-calendar/compare/v0.26.3...v0.26.4) (2018-11-05)


### Bug Fixes

* **day-view:** set allDay to false when dragging events ([14f1e5a](https://github.com/mattlewis92/angular-calendar/commit/14f1e5a))
* make sure moment date formatter is injectable ([bd6da5f](https://github.com/mattlewis92/angular-calendar/commit/bd6da5f))
* **week-view:** use correct event width for hourly events ([2fd4163](https://github.com/mattlewis92/angular-calendar/commit/2fd4163)), closes [#784](https://github.com/mattlewis92/angular-calendar/issues/784)



<a name="0.26.3"></a>
## [0.26.3](https://github.com/mattlewis92/angular-calendar/compare/v0.26.2...v0.26.3) (2018-10-14)


### Bug Fixes

* **week-view:** use correct width on overlapping events ([8e32a48](https://github.com/mattlewis92/angular-calendar/commit/8e32a48)), closes [#763](https://github.com/mattlewis92/angular-calendar/issues/763)



<a name="0.26.2"></a>
## [0.26.2](https://github.com/mattlewis92/angular-calendar/compare/v0.26.1...v0.26.2) (2018-10-13)


### Bug Fixes

* make it easier to extend providers ([c753c22](https://github.com/mattlewis92/angular-calendar/commit/c753c22))
* **day-view:** add custom cssClass to allDay events ([d2ac44c](https://github.com/mattlewis92/angular-calendar/commit/d2ac44c)), closes [#769](https://github.com/mattlewis92/angular-calendar/issues/769)
* **month-view:** don't allow dropping events on the source day ([c96c87e](https://github.com/mattlewis92/angular-calendar/commit/c96c87e)), closes [#746](https://github.com/mattlewis92/angular-calendar/issues/746)
* **month-view:** use correct inflection of month names on the title ([ba9f5ad](https://github.com/mattlewis92/angular-calendar/commit/ba9f5ad)), closes [#757](https://github.com/mattlewis92/angular-calendar/issues/757)



<a name="0.26.1"></a>
## [0.26.1](https://github.com/mattlewis92/angular-calendar/compare/v0.26.0...v0.26.1) (2018-09-18)


### Bug Fixes

* include license and readme in npm package ([7fe03b1](https://github.com/mattlewis92/angular-calendar/commit/7fe03b1)), closes [#732](https://github.com/mattlewis92/angular-calendar/issues/732)



<a name="0.26.0"></a>
# [0.26.0](https://github.com/mattlewis92/angular-calendar/compare/v0.25.2...v0.26.0) (2018-09-03)


### Bug Fixes

* allow events that end on different days to be dragged ([df339b9](https://github.com/mattlewis92/angular-calendar/commit/df339b9))
* **week-view:** make sure currently resized events are always on top ([bb08ec1](https://github.com/mattlewis92/angular-calendar/commit/bb08ec1))
* allow the mouse to be moved slightly when clicking events ([08661c4](https://github.com/mattlewis92/angular-calendar/commit/08661c4)), closes [#678](https://github.com/mattlewis92/angular-calendar/issues/678)
* handle scrolling the page while dragging evwnts ([9fe2a0f](https://github.com/mattlewis92/angular-calendar/commit/9fe2a0f))
* make sure events that are being resized are always on top ([ce8063d](https://github.com/mattlewis92/angular-calendar/commit/ce8063d))
* **month-view:** stop events overflowing on ie11 ([10ff7d5](https://github.com/mattlewis92/angular-calendar/commit/10ff7d5)), closes [#501](https://github.com/mattlewis92/angular-calendar/issues/501)
* mark package as having side effects ([b20f821](https://github.com/mattlewis92/angular-calendar/commit/b20f821)), closes [#529](https://github.com/mattlewis92/angular-calendar/issues/529)
* **day-view:** allow events with no end date to be resized ([b00d57c](https://github.com/mattlewis92/angular-calendar/commit/b00d57c)), closes [#614](https://github.com/mattlewis92/angular-calendar/issues/614)
* **day-view:** always default eventSnapSize to hour segment height ([8908759](https://github.com/mattlewis92/angular-calendar/commit/8908759)), closes [#514](https://github.com/mattlewis92/angular-calendar/issues/514)
* **day-view:** disable pointer events whilst resizing ([56dc132](https://github.com/mattlewis92/angular-calendar/commit/56dc132))
* **day-view:** dont remove events that start and end at the same time ([d2223d5](https://github.com/mattlewis92/angular-calendar/commit/d2223d5))
* **day-view:** make sure segmentHeight is passed to a custom template ([79dd846](https://github.com/mattlewis92/angular-calendar/commit/79dd846)), closes [#514](https://github.com/mattlewis92/angular-calendar/issues/514)
* **day-view:** prevent segment double hover when dragging ([1fd9089](https://github.com/mattlewis92/angular-calendar/commit/1fd9089))
* **event-clicked:** clicking actual events now triggers eventClicked ([403e127](https://github.com/mattlewis92/angular-calendar/commit/403e127)), closes [#568](https://github.com/mattlewis92/angular-calendar/issues/568)
* **moment:** change weekViewColumnSubHeader from `D MMM` to `MMM D` ([a2fff58](https://github.com/mattlewis92/angular-calendar/commit/a2fff58))
* more robust way of telling if an event is dropped within a calendar ([46a650a](https://github.com/mattlewis92/angular-calendar/commit/46a650a)), closes [#637](https://github.com/mattlewis92/angular-calendar/issues/637)
* prevent text getting selected in safari while dragging events ([36fb312](https://github.com/mattlewis92/angular-calendar/commit/36fb312))
* **month-view:** prevent day clicked from firing when dragging events ([c505d38](https://github.com/mattlewis92/angular-calendar/commit/c505d38)), closes [#487](https://github.com/mattlewis92/angular-calendar/issues/487)
* **resizable:** prevent resizing of elements when not on top stack ([4bfac45](https://github.com/mattlewis92/angular-calendar/commit/4bfac45)), closes [#662](https://github.com/mattlewis92/angular-calendar/issues/662)
* **week-view:** allow resizing events with no end date ([ccffe05](https://github.com/mattlewis92/angular-calendar/commit/ccffe05)), closes [#614](https://github.com/mattlewis92/angular-calendar/issues/614)
* **week-view:** fix cursor on draggable events ([66e9223](https://github.com/mattlewis92/angular-calendar/commit/66e9223))
* **week-view:** use correct event left positioning ([fb4bbb7](https://github.com/mattlewis92/angular-calendar/commit/fb4bbb7)), closes [#675](https://github.com/mattlewis92/angular-calendar/issues/675)


### Features

* add a CalendarView enum to prevent typos in view names ([f634a86](https://github.com/mattlewis92/angular-calendar/commit/f634a86))
* add time grid to the week view ([5cfbfc7](https://github.com/mattlewis92/angular-calendar/commit/5cfbfc7)), closes [#593](https://github.com/mattlewis92/angular-calendar/issues/593)
* allow event actions template to be customised ([2c8a6db](https://github.com/mattlewis92/angular-calendar/commit/2c8a6db)), closes [#673](https://github.com/mattlewis92/angular-calendar/issues/673)
* allow meta to be passed to the event times changed interface ([c27b2d8](https://github.com/mattlewis92/angular-calendar/commit/c27b2d8))
* allow moment to be used as a replacement to date-fns ([1c5d32f](https://github.com/mattlewis92/angular-calendar/commit/1c5d32f))
* expose the full week view on the beforeViewRender output ([1185d27](https://github.com/mattlewis92/angular-calendar/commit/1185d27)), closes [#632](https://github.com/mattlewis92/angular-calendar/issues/632)
* remove deep module imports ([24eb394](https://github.com/mattlewis92/angular-calendar/commit/24eb394))
* remove direct dependency on date-fns ([b3c9520](https://github.com/mattlewis92/angular-calendar/commit/b3c9520))
* upgrade draggable library ([d9e76d4](https://github.com/mattlewis92/angular-calendar/commit/d9e76d4))
* **day-view:** allow dragging and dropping all day events ([62c41b9](https://github.com/mattlewis92/angular-calendar/commit/62c41b9)), closes [#665](https://github.com/mattlewis92/angular-calendar/issues/665)
* **day-view:** allow events to be dragged outside of the view ([6641319](https://github.com/mattlewis92/angular-calendar/commit/6641319)), closes [#532](https://github.com/mattlewis92/angular-calendar/issues/532)
* **day-view:** expose events in beforeViewRender output ([44347e2](https://github.com/mattlewis92/angular-calendar/commit/44347e2)), closes [#573](https://github.com/mattlewis92/angular-calendar/issues/573)
* **day-view:** make previous and next view helpers respect excludeDays ([50159cc](https://github.com/mattlewis92/angular-calendar/commit/50159cc))
* **day-view:** remove the mwl-calendar-all-day-event component ([c6b095a](https://github.com/mattlewis92/angular-calendar/commit/c6b095a))
* **event-times-changed:** expose type of event (resize, drag or drop) ([479c75a](https://github.com/mattlewis92/angular-calendar/commit/479c75a))
* **event-title-formatter:** expose the pre-formatted title ([df62e7a](https://github.com/mattlewis92/angular-calendar/commit/df62e7a)), closes [#587](https://github.com/mattlewis92/angular-calendar/issues/587)
* **month-view:** add class to day that's being highlighted ([13a688e](https://github.com/mattlewis92/angular-calendar/commit/13a688e)), closes [#630](https://github.com/mattlewis92/angular-calendar/issues/630)
* **month-view:** allow events to be dropped on the open day events list ([2454892](https://github.com/mattlewis92/angular-calendar/commit/2454892)), closes [#523](https://github.com/mattlewis92/angular-calendar/issues/523)
* **month-view:** allow the open day events animation to be overridden ([db0c880](https://github.com/mattlewis92/angular-calendar/commit/db0c880))
* upgrade the drag and drop library ([ab764ec](https://github.com/mattlewis92/angular-calendar/commit/ab764ec))
* **tooltip:** allow tooltip to be auto positioned ([d6d61c4](https://github.com/mattlewis92/angular-calendar/commit/d6d61c4)), closes [#617](https://github.com/mattlewis92/angular-calendar/issues/617)
* **week-view:** allow events to be dragged outside of the view ([e2538a1](https://github.com/mattlewis92/angular-calendar/commit/e2538a1)), closes [#516](https://github.com/mattlewis92/angular-calendar/issues/516)
* **week-view:** allow total days in the week to be customised ([0b4fcd5](https://github.com/mattlewis92/angular-calendar/commit/0b4fcd5))
* **week-view:** make the week view title work with no config with i18n ([aa7edd9](https://github.com/mattlewis92/angular-calendar/commit/aa7edd9)), closes [#670](https://github.com/mattlewis92/angular-calendar/issues/670)


### BREAKING CHANGES

* date-fns is now no longer a direct dependency of this library. To migrate:

Install date-fns with npm:
```
npm i date-fns
```

Add the date-fns calendar-utils adapter to the first argument of the CalendarModule.forRoot method:

```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class MyModule {}
```

For system.js users you will also need to add the following entries to your systemjs config:
```
'calendar-utils': 'npm:calendar-utils/bundles/calendar-utils.umd.js',
'calendar-utils/date-adapters/date-fns': 'npm:calendar-utils/date-adapters/date-fns/index.js',
'angular-calendar/date-adapters/date-fns': 'npm:angular-calendar/date-adapters/date-fns/index.js'
```
* **week-view:** the format of the week view title has changed from `Week d of yyyy` to `MMM d - MMM d, yyyy`. You can override this by using a custom date formatter.
* **day-view:** the allDayEventTemplate option was removed from the day view. To migrate use the eventTemplate input and check if dayEvent.event.allDay is set in the template
* Week view events will now appear on the bottom time grid. To restore the old behaviour you can set `allDay: true` on the event to make it appear at the top. 

People extending the `CalendarWeekViewComponent` will probably have to adjust their child component as the template and internal component api has changed significantly.
* **month-view:** If using a custom `openDayEventsTemplate` for the month view you must now wrap your template with:
```
<div class="cal-open-day-events" [@collapse] *ngIf="isOpen"></div>
```

and then you must add the collapse animation to the component that contains the open day events `<ng-template>`:

```
import { collapseAnimation } from 'angular-calendar';

// add this to your component metadata
animations: [collapseAnimation]
```
* **tooltip:** all tooltips now default to auto positioning, you can use the tooltipPlacement input on all components to override this behaviour though
* **event-clicked:** eventClicked now fires whenever the event container instead of the event title is clicked
* **day-view:** previously events with no end date that were resized would emit an empty end time, now they will emit a sensible default new end date
* **resizable:** only one event at a time can now be resized on the day or week views
* **week-view:** if you were extending the week view component then the internal API has changed slightly and you may need to adjust your app
* **month-view:** Custom template users will now need to add a "dragActiveClass='cal-drag-active'" anywhere they use an mwlDraggable directive

If using the mwlDraggable directive anywhere else in your app you will need to apply `pointer-events: none` to the element yourself when it's being dragged. This can be done with the `dragActiveClass` option
* **day-view:** if you were extending the day view component then the internal API has changed slightly and you may need to adjust your app
* deep module imports angular-calendar/modules/{common,month,week,day} are no longer supported as the package is now treeshakable. To migrate, adjust your imports to be from angular-calendar directly
* **moment:** the moment weekViewColumnSubHeader format has changed for consistency with the other date formatters
* there were some minor breaking changes in the drag and drop library that might affect your app if you were using it outside of the calendar. See the changelog for more info: https://github.com/mattlewis92/angular-draggable-droppable/blob/master/CHANGELOG.md
* **week-view:** events with no end date that are resized now assume to have the start date as the end date



<a name="0.25.2"></a>
## [0.25.2](https://github.com/mattlewis92/angular-calendar/compare/v0.25.1...v0.25.2) (2018-05-12)


### Bug Fixes

* properly mark styles as having side effects ([625e586](https://github.com/mattlewis92/angular-calendar/commit/625e586))



<a name="0.25.1"></a>
## [0.25.1](https://github.com/mattlewis92/angular-calendar/compare/v0.25.0...v0.25.1) (2018-05-11)


### Bug Fixes

* mark styles as having side effects ([2667433](https://github.com/mattlewis92/angular-calendar/commit/2667433))



<a name="0.25.0"></a>
# [0.25.0](https://github.com/mattlewis92/angular-calendar/compare/v0.24.1...v0.25.0) (2018-05-11)


### Features

* upgrade to angular 6 ([71091ab](https://github.com/mattlewis92/angular-calendar/commit/71091ab)), closes [#512](https://github.com/mattlewis92/angular-calendar/issues/512)


### BREAKING CHANGES

* angular 6 or higher is now required to use this package



<a name="0.24.1"></a>
## [0.24.1](https://github.com/mattlewis92/angular-calendar/compare/v0.24.0...v0.24.1) (2018-05-09)


### Bug Fixes

* **day-view:** prevent selection when dragging cal-event ([#521](https://github.com/mattlewis92/angular-calendar/issues/521)) ([f799bf5](https://github.com/mattlewis92/angular-calendar/commit/f799bf5)), closes [#522](https://github.com/mattlewis92/angular-calendar/issues/522)



<a name="0.24.0"></a>
# [0.24.0](https://github.com/mattlewis92/angular-calendar/compare/v0.23.7...v0.24.0) (2018-04-17)


### Bug Fixes

* use the browsers timezone in the angular date formatter ([41fa40b](https://github.com/mattlewis92/angular-calendar/commit/41fa40b)), closes [#502](https://github.com/mattlewis92/angular-calendar/issues/502)


### Features

* make event colors optional ([4f9ed24](https://github.com/mattlewis92/angular-calendar/commit/4f9ed24)), closes [#468](https://github.com/mattlewis92/angular-calendar/issues/468)



<a name="0.23.7"></a>
## [0.23.7](https://github.com/mattlewis92/angular-calendar/compare/v0.23.6...v0.23.7) (2018-03-15)


### Bug Fixes

* **day-view:** refresh the view when hourSegments changes ([f99a07b](https://github.com/mattlewis92/angular-calendar/commit/f99a07b)), closes [#470](https://github.com/mattlewis92/angular-calendar/issues/470)



<a name="0.23.6"></a>
## [0.23.6](https://github.com/mattlewis92/angular-calendar/compare/v0.23.5...v0.23.6) (2018-02-12)


### Bug Fixes

* fix partial module imports ([8540a28](https://github.com/mattlewis92/angular-calendar/commit/8540a28)), closes [#461](https://github.com/mattlewis92/angular-calendar/issues/461)



<a name="0.23.5"></a>
## [0.23.5](https://github.com/mattlewis92/angular-calendar/compare/v0.23.4...v0.23.5) (2018-02-11)


### Bug Fixes

* **month-view:** expose the day the event was dropped on ([6aeb550](https://github.com/mattlewis92/angular-calendar/commit/6aeb550)), closes [#443](https://github.com/mattlewis92/angular-calendar/issues/443)



<a name="0.23.4"></a>
## [0.23.4](https://github.com/mattlewis92/angular-calendar/compare/v0.23.3...v0.23.4) (2018-02-11)


### Bug Fixes

* **day-view:** fix scrolling on an ipad ([b5955ae](https://github.com/mattlewis92/angular-calendar/commit/b5955ae)), closes [#458](https://github.com/mattlewis92/angular-calendar/issues/458)



<a name="0.23.3"></a>
## [0.23.3](https://github.com/mattlewis92/angular-calendar/compare/v0.23.2...v0.23.3) (2018-01-29)


### Performance Improvements

* **track-by:** use track by on all ngFor elements ([aebe832](https://github.com/mattlewis92/angular-calendar/commit/aebe832)), closes [#444](https://github.com/mattlewis92/angular-calendar/issues/444)



<a name="0.23.2"></a>
## [0.23.2](https://github.com/mattlewis92/angular-calendar/compare/v0.23.1...v0.23.2) (2018-01-10)


### Bug Fixes

* **week-view:** ensure event span is correct in some edge cases ([8b8adef](https://github.com/mattlewis92/angular-calendar/commit/8b8adef)), closes [#432](https://github.com/mattlewis92/angular-calendar/issues/432)



<a name="0.23.1"></a>
## [0.23.1](https://github.com/mattlewis92/angular-calendar/compare/v0.23.0...v0.23.1) (2018-01-02)


### Bug Fixes

* restore compatibility with system.js ([1b3c27a](https://github.com/mattlewis92/angular-calendar/commit/1b3c27a))



<a name="0.23.0"></a>
# [0.23.0](https://github.com/mattlewis92/angular-calendar/compare/v0.22.3...v0.23.0) (2018-01-02)


### Bug Fixes

* **universal:** make the calendar work with universal (again) ([8ae8419](https://github.com/mattlewis92/angular-calendar/commit/8ae8419)), closes [#408](https://github.com/mattlewis92/angular-calendar/issues/408)


### Features

* **date-formatter:** use the angular date formatter by default ([bd68045](https://github.com/mattlewis92/angular-calendar/commit/bd68045))
* export drag+drop and resizable modules for use in custom templates ([579a51a](https://github.com/mattlewis92/angular-calendar/commit/579a51a)), closes [#419](https://github.com/mattlewis92/angular-calendar/issues/419)
* upgrade angular draggable droppable package ([fd30c39](https://github.com/mattlewis92/angular-calendar/commit/fd30c39))
* upgrade angular resizable element ([26e2b53](https://github.com/mattlewis92/angular-calendar/commit/26e2b53))
* upgrade calendar-utils ([fe59aad](https://github.com/mattlewis92/angular-calendar/commit/fe59aad))
* upgrade to angular 5 ([775a62e](https://github.com/mattlewis92/angular-calendar/commit/775a62e)), closes [#417](https://github.com/mattlewis92/angular-calendar/issues/417)
* use ng-packagr for bundling the package ([5744e9b](https://github.com/mattlewis92/angular-calendar/commit/5744e9b)), closes [#408](https://github.com/mattlewis92/angular-calendar/issues/408)
* **day-view:** expose the period on the beforeViewRender output ([24739ce](https://github.com/mattlewis92/angular-calendar/commit/24739ce)), closes [#418](https://github.com/mattlewis92/angular-calendar/issues/418)
* **month-view:** call beforeViewRender with the view period ([a9ab6d9](https://github.com/mattlewis92/angular-calendar/commit/a9ab6d9)), closes [#418](https://github.com/mattlewis92/angular-calendar/issues/418)
* **week-view:** expose the view period on beforeViewRender ([cb73eff](https://github.com/mattlewis92/angular-calendar/commit/cb73eff)), closes [#418](https://github.com/mattlewis92/angular-calendar/issues/418)


### BREAKING CHANGES

* angular 5 or higher is now required to use this package
* if using a locale other than english you will need to import the appropriate locale data somewhere in your app:
```
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'; // to register french

registerLocaleData(localeFr);
```
* **date-formatter:** the angular date formatter is now used by default to format dates instead of the formatter that requires the Intl polyfill
* **day-view:** the event signature of the beforeViewRender output has changed from $event.body to $event.body.hourGrid
* **week-view:** for people extending the root week view component, eventRows is now named view.eventRows
* the getWeekView function return signature has changed from an array of event rows to an object with the eventRows property set to the previous arrat value. This should only affect people overriding the CalendarUtils.getWeekView method.
* the umd entry path has changed from `angular-calendar/umd/angular-calendar.js` to `angular-calendar/bundles/angular-calendar.umd.js`. System.js users will need to update their config
* The UMD entry point for the `angular-draggable-droppable` package has changed from `angular-draggable-droppable/dist/umd/angular-draggable-droppable.js` to `angular-draggable-droppable/bundles/angular-draggable-droppable.umd.js`. System.js users will need to update their config accordingly.

Also the dragStart output was renamed to dragPointerDown. Users using a custom template for the root day or week view components will need to adjust their templates accordingly.
* The UMD entry point for the `angular-resizable-element` package has changed from `angular-resizable-element/dist/umd/angular-resizable-element.js` to `angular-resizable-element/bundles/angular-resizable-element.umd.js`. System.js users will need to update their config accordingly.
* System.js users will now need to add an entry for the `positioning` package to their config `'positioning': 'npm:positioning/dist/umd/positioning.js'`.


<a name="0.22.3"></a>
## [0.22.3](https://github.com/mattlewis92/angular-calendar/compare/v0.22.1...v0.22.3) (2017-12-24)


### Bug Fixes

* allow event actions to work on draggable events ([c4d6abc](https://github.com/mattlewis92/angular-calendar/commit/c4d6abc)), closes [#373](https://github.com/mattlewis92/angular-calendar/issues/373)
* restore TS < 2.4 compatibility ([fbfe430](https://github.com/mattlewis92/angular-calendar/commit/fbfe430))



<a name="0.22.2"></a>
## [0.22.2](https://github.com/mattlewis92/angular-calendar/compare/v0.22.1...v0.22.2) (2017-12-23)


### Bug Fixes

* restore TS < 2.4 compatibility ([fbfe430](https://github.com/mattlewis92/angular-calendar/commit/fbfe430))



<a name="0.22.1"></a>
## [0.22.1](https://github.com/mattlewis92/angular-calendar/compare/v0.22.0...v0.22.1) (2017-11-22)


### Bug Fixes

* restore aot compatibility with angular 4 ([f5e500a](https://github.com/mattlewis92/angular-calendar/commit/f5e500a)), closes [#397](https://github.com/mattlewis92/angular-calendar/issues/397)



<a name="0.22.0"></a>
# [0.22.0](https://github.com/mattlewis92/angular-calendar/compare/v0.21.3...v0.22.0) (2017-11-19)


### Bug Fixes

* **day-view:** fix scrolling on touch devices ([e887b89](https://github.com/mattlewis92/angular-calendar/commit/e887b89)), closes [#358](https://github.com/mattlewis92/angular-calendar/issues/358)


### Features

* **day-view:** allow the hour segment height to be customised ([688693c](https://github.com/mattlewis92/angular-calendar/commit/688693c)), closes [#360](https://github.com/mattlewis92/angular-calendar/issues/360)
* add individual month / week / day modules ([e87ae23](https://github.com/mattlewis92/angular-calendar/commit/e87ae23)), closes [#361](https://github.com/mattlewis92/angular-calendar/issues/361)
* add runtime validation of event properties ([194fe59](https://github.com/mattlewis92/angular-calendar/commit/194fe59)), closes [#362](https://github.com/mattlewis92/angular-calendar/issues/362)
* introduce angular date formatter ([cd40235](https://github.com/mattlewis92/angular-calendar/commit/cd40235)), closes [#376](https://github.com/mattlewis92/angular-calendar/issues/376)
* **styles:** move css files into the css root directory ([72ae546](https://github.com/mattlewis92/angular-calendar/commit/72ae546))
* move umd bundle up and out of the dist directory ([59d0049](https://github.com/mattlewis92/angular-calendar/commit/59d0049))


### BREAKING CHANGES

* **styles:** css styles have moved from:
```
node_modules/angular-calendar/dist/css/angular-calendar.css
```
to
```
node_modules/angular-calendar/css/angular-calendar.css
```

* The umd path for system.js users has changed from:
```
node_modules/angular-calendar/dist/umd/angular-calendar.js
```
to
```
node_modules/angular-calendar/umd/angular-calendar.js
```


<a name="0.21.3"></a>
## [0.21.3](https://github.com/mattlewis92/angular-calendar/compare/v0.21.2...v0.21.3) (2017-10-21)


### Bug Fixes

* allow angular 5 peer dependency ([d178614](https://github.com/mattlewis92/angular-calendar/commit/d178614))



<a name="0.21.2"></a>
## [0.21.2](https://github.com/mattlewis92/angular-calendar/compare/v0.21.1...v0.21.2) (2017-09-07)


### Bug Fixes

* **monthView:** allow adding extra weeks to the month view ([529ebd3](https://github.com/mattlewis92/angular-calendar/commit/529ebd3))



<a name="0.21.1"></a>
## [0.21.1](https://github.com/mattlewis92/angular-calendar/compare/v0.21.0...v0.21.1) (2017-08-31)


### Bug Fixes

* **weekView:** prevent ExpressionChangedAfterItHasBeenCheckedError error ([5858644](https://github.com/mattlewis92/angular-calendar/commit/5858644)), closes [#303](https://github.com/mattlewis92/angular-calendar/issues/303)



<a name="0.21.0"></a>
# [0.21.0](https://github.com/mattlewis92/angular-calendar/compare/v0.20.1...v0.21.0) (2017-08-29)


### Bug Fixes

* **monthView:** don't fire dayClicked output when clicking on an event and using hammerjs ([283c50e](https://github.com/mattlewis92/angular-calendar/commit/283c50e)), closes [#318](https://github.com/mattlewis92/angular-calendar/issues/318)


### Features

* **eventTitleTemplate:** allow the event title template to be customised ([e956463](https://github.com/mattlewis92/angular-calendar/commit/e956463)), closes [#312](https://github.com/mattlewis92/angular-calendar/issues/312)



<a name="0.20.1"></a>
## [0.20.1](https://github.com/mattlewis92/angular-calendar/compare/v0.20.0...v0.20.1) (2017-08-14)


### Bug Fixes

* **monthView:** make collapse animation smoother ([7b52366](https://github.com/mattlewis92/angular-calendar/commit/7b52366))



<a name="0.20.0"></a>
# [0.20.0](https://github.com/mattlewis92/angular-calendar/compare/v0.19.0...v0.20.0) (2017-08-06)


### Bug Fixes

* **dayView:** add the event.cssClass to the event container instead of the event itself ([591dd4a](https://github.com/mattlewis92/angular-calendar/commit/591dd4a)), closes [#299](https://github.com/mattlewis92/angular-calendar/issues/299)
* **monthView:** only call beforeViewRender once when refreshing the view ([3dd3118](https://github.com/mattlewis92/angular-calendar/commit/3dd3118)), closes [#293](https://github.com/mattlewis92/angular-calendar/issues/293)
* **weekView:** custom event `cssClass`'s are now added to the event container instead of the event i ([712ded8](https://github.com/mattlewis92/angular-calendar/commit/712ded8))


### BREAKING CHANGES

* **weekView:** you may need to adjust your CSS slightly to account for this change. See the day
view breaking change for how to migrate.
* **dayView:** the `event.cssClass` property is now added to the parent container element, rather
than the event itself. You may need to update your CSS.

Before:
```
.my-custom-event-class {}
```

After:
```
.my-custom-event-class .cal-event {}
```

People using custom day event event templates can also remove these lines from their template:

```
[class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
[class.cal-ends-within-day]="!dayEvent.endsAfterDay"
[ngClass]="dayEvent.event.cssClass"
```



<a name="0.19.0"></a>
# [0.19.0](https://github.com/mattlewis92/angular-calendar/compare/v0.18.3...v0.19.0) (2017-07-14)


### Features

* **tooltip:** allow the tooltip not to be appended to the body ([100fd75](https://github.com/mattlewis92/angular-calendar/commit/100fd75)), closes [#270](https://github.com/mattlewis92/angular-calendar/issues/270)



<a name="0.18.3"></a>
## [0.18.3](https://github.com/mattlewis92/angular-calendar/compare/v0.18.2...v0.18.3) (2017-06-28)


### Bug Fixes

* **tooltipTemplate:** ensure custom tooltip template is available to other custom templates ([ce14b96](https://github.com/mattlewis92/angular-calendar/commit/ce14b96))



<a name="0.18.2"></a>
## [0.18.2](https://github.com/mattlewis92/angular-calendar/compare/v0.18.1...v0.18.2) (2017-06-26)


### Bug Fixes

* **dayView:** force hour segments to be 30px in height for non bootstrap users ([ffc708b](https://github.com/mattlewis92/angular-calendar/commit/ffc708b)), closes [#260](https://github.com/mattlewis92/angular-calendar/issues/260)



<a name="0.18.1"></a>
## [0.18.1](https://github.com/mattlewis92/angular-calendar/compare/v0.18.0...v0.18.1) (2017-06-25)

* Missed a breaking change that wasn't included in 0.18.0


<a name="0.18.0"></a>
# [0.18.0](https://github.com/mattlewis92/angular-calendar/compare/v0.17.4...v0.18.0) (2017-06-25)


### Features

* **dayView:** introduce the `beforeViewRender` output ([cfab254](https://github.com/mattlewis92/angular-calendar/commit/cfab254))
* **monthView:** allow a css class to be added to a column header ([abf02d8](https://github.com/mattlewis92/angular-calendar/commit/abf02d8))
* **monthView:** introduce the `beforeViewRender` output ([c9a2366](https://github.com/mattlewis92/angular-calendar/commit/c9a2366))
* **tooltip:** allow the event tooltip templates to be customised ([82faaf4](https://github.com/mattlewis92/angular-calendar/commit/82faaf4)), closes [#249](https://github.com/mattlewis92/angular-calendar/issues/249)
* **weekendDays:** allow weekend days to be customised ([581b9a8](https://github.com/mattlewis92/angular-calendar/commit/581b9a8)), closes [#255](https://github.com/mattlewis92/angular-calendar/issues/255)
* **weekView:** allow a custom css class to be added to a column header ([068d08b](https://github.com/mattlewis92/angular-calendar/commit/068d08b)), closes [#222](https://github.com/mattlewis92/angular-calendar/issues/222)
* **weekView:** revert allowDragOutside feature ([ac70656](https://github.com/mattlewis92/angular-calendar/commit/ac70656))
* upgrade calendar-utils ([0dd602b](https://github.com/mattlewis92/angular-calendar/commit/0dd602b))
* **weekView:** introduce the `dayHeaderClicked` output ([2f11094](https://github.com/mattlewis92/angular-calendar/commit/2f11094)), closes [#222](https://github.com/mattlewis92/angular-calendar/issues/222)

### BREAKING CHANGES

* **monthView:** the `dayModifier` input has been replaced with a more powerful `beforeViewRender`
output. See [the demo](https://mattlewis92.github.io/angular-calendar/#/before-view-render) for an example of how to migrate your code.
* **dayView:** the `hourSegmentModifier` has been replaced with the `beforeViewRender` output.
* For system.js users only, the UMD path to the `calendar-utils` module has changed from `calendar-utils/dist/umd/calendarUtils.js` to `calendar-utils/dist/umd/calendar-utils.js`
* **weekView:** the `allowDragOutside` option has been removed from the week view as this can be implemented in user land. Please see this plunker for how to introduce it yourself: http://plnkr.co/edit/5KyUBC0lnfMsYMcVFAR9?p=preview
* **weekView:** the `dayClicked` output has been replaced with the `dayHeaderClicked` output. To migrate:

Before:
```
(dayClicked)="clickedDate = $event.date"
```

After:
```
(dayHeaderClicked)="clickedDate = $event.day.date"
```


<a name="0.17.4"></a>
## [0.17.4](https://github.com/mattlewis92/angular-calendar/compare/v0.17.3...v0.17.4) (2017-06-21)


### Bug Fixes

* various fixes when excluding days on the week and month views ([58ce981](https://github.com/mattlewis92/angular-calendar/commit/58ce981))



<a name="0.17.3"></a>
## [0.17.3](https://github.com/mattlewis92/angular-calendar/compare/v0.17.2...v0.17.3) (2017-06-12)


### Bug Fixes

* add explicit peer dependency on typescript 2.3.x ([3998c9c](https://github.com/mattlewis92/angular-calendar/commit/3998c9c)), closes [#221](https://github.com/mattlewis92/angular-calendar/issues/221)



<a name="0.17.2"></a>
## [0.17.2](https://github.com/mattlewis92/angular-calendar/compare/v0.17.1...v0.17.2) (2017-06-12)


### Bug Fixes

* **weekView:** use correct event span when the the week doesn't start on a sunday ([f19e970](https://github.com/mattlewis92/angular-calendar/commit/f19e970))



<a name="0.17.1"></a>
## [0.17.1](https://github.com/mattlewis92/angular-calendar/compare/v0.17.0...v0.17.1) (2017-06-10)


### Bug Fixes

* **dayView:** allow events to be resized that are next to each other ([f627b8e](https://github.com/mattlewis92/angular-calendar/commit/f627b8e)), closes [#225](https://github.com/mattlewis92/angular-calendar/issues/225)
* **weekView:** allow events to be resized that are next to each other ([01b776c](https://github.com/mattlewis92/angular-calendar/commit/01b776c))



<a name="0.17.0"></a>
# [0.17.0](https://github.com/mattlewis92/angular-calendar/compare/v0.16.0...v0.17.0) (2017-05-29)


### Bug Fixes

* **dayView:** ensure all day event actions are always visible ([132d990](https://github.com/mattlewis92/angular-calendar/commit/132d990))
* **dayView:** ensure event actions are always visible ([445b74f](https://github.com/mattlewis92/angular-calendar/commit/445b74f))
* **weekView:** stop events pushing others along when resizing ([e6e02c5](https://github.com/mattlewis92/angular-calendar/commit/e6e02c5)), closes [#191](https://github.com/mattlewis92/angular-calendar/issues/191)


### Features

* **meta:** add `CalendarEvent` `meta` property for storing arbritary data ([43b0124](https://github.com/mattlewis92/angular-calendar/commit/43b0124)), closes [#218](https://github.com/mattlewis92/angular-calendar/issues/218)
* **meta:** make the event meta property generic so it can be strongly typed ([d74c8e8](https://github.com/mattlewis92/angular-calendar/commit/d74c8e8))
* **weekView:** show event actions ([7e7af92](https://github.com/mattlewis92/angular-calendar/commit/7e7af92)), closes [#219](https://github.com/mattlewis92/angular-calendar/issues/219)

### BREAKING CHANGES

* Typescript 2.3 or higher is now required to use this library

<a name="0.16.0"></a>
# [0.16.0](https://github.com/mattlewis92/angular-calendar/compare/v0.15.4...v0.16.0) (2017-05-27)


### Features

* **weekView:** Allow drag outside calendar view ([#214](https://github.com/mattlewis92/angular-calendar/issues/214)) ([dcff88a](https://github.com/mattlewis92/angular-calendar/commit/dcff88a))



<a name="0.15.4"></a>
## [0.15.4](https://github.com/mattlewis92/angular-calendar/compare/v0.15.3...v0.15.4) (2017-05-21)


### Bug Fixes

* **monthView:** ensure events are dropped onto the correct dates ([af48ed2](https://github.com/mattlewis92/angular-calendar/commit/af48ed2))



<a name="0.15.3"></a>
## [0.15.3](https://github.com/mattlewis92/angular-calendar/compare/v0.15.2...v0.15.3) (2017-05-21)


### Bug Fixes

* **monthView:** fix clicking an event dot when using hammerjs ([0a9e9fe](https://github.com/mattlewis92/angular-calendar/commit/0a9e9fe)), closes [#211](https://github.com/mattlewis92/angular-calendar/issues/211)



<a name="0.15.2"></a>
## [0.15.2](https://github.com/mattlewis92/angular-calendar/compare/v0.15.1...v0.15.2) (2017-05-18)


### Bug Fixes

* **monthView:** preserve classes when removing a days cssClass ([a7c902d](https://github.com/mattlewis92/angular-calendar/commit/a7c902d)), closes [#210](https://github.com/mattlewis92/angular-calendar/issues/210)



<a name="0.15.1"></a>
## [0.15.1](https://github.com/mattlewis92/angular-calendar/compare/v0.15.0...v0.15.1) (2017-05-17)


### Bug Fixes

* **refresh:** use markForCheck instead of detectChanges ([16dc938](https://github.com/mattlewis92/angular-calendar/commit/16dc938))



<a name="0.15.0"></a>
# [0.15.0](https://github.com/mattlewis92/angular-calendar/compare/v0.14.0...v0.15.0) (2017-05-14)


### Bug Fixes

* **dayView:** correct events dimensions for apps without bootstrap ([977c344](https://github.com/mattlewis92/angular-calendar/commit/977c344)), closes [#201](https://github.com/mattlewis92/angular-calendar/issues/201)
* **tooltip:** avoid ExpressionChangedAfterItHasBeenCheckedError when sometimes showing the tooltip ([f9776c6](https://github.com/mattlewis92/angular-calendar/commit/f9776c6)), closes [#196](https://github.com/mattlewis92/angular-calendar/issues/196)
* **tooltip:** position the tooltip correctly when using AoT ([4531ebc](https://github.com/mattlewis92/angular-calendar/commit/4531ebc))


### Features

* **touch:** use tap event instead of click if hammerjs is loaded ([665520e](https://github.com/mattlewis92/angular-calendar/commit/665520e)), closes [#203](https://github.com/mattlewis92/angular-calendar/issues/203)
* allow calendar-utils functions to be overridden ([35ae95a](https://github.com/mattlewis92/angular-calendar/commit/35ae95a)), closes [#199](https://github.com/mattlewis92/angular-calendar/issues/199)
* allow overriding of providers via the calendar modules forRoot method ([847212e](https://github.com/mattlewis92/angular-calendar/commit/847212e)), closes [#205](https://github.com/mattlewis92/angular-calendar/issues/205)


### BREAKING CHANGES

* if not using `CalendarModule.forRoot()` you must explicitly add the `CalendarUtils`
provider to your module declaration



<a name="0.14.0"></a>
# [0.14.0](https://github.com/mattlewis92/angular-calendar/compare/v0.13.6...v0.14.0) (2017-04-21)


### Features

* **weekView:** add support for minute level precision on week view events ([25d6933](https://github.com/mattlewis92/angular-calendar/commit/25d6933))



<a name="0.13.6"></a>
## [0.13.6](https://github.com/mattlewis92/angular-calendar/compare/v0.13.5...v0.13.6) (2017-04-21)


### Bug Fixes

* **dayView:** respect eventSnapSize when dragging events ([028005f](https://github.com/mattlewis92/angular-calendar/commit/028005f))
* **dayView:** respect eventSnapSize when resizing events ([c0be926](https://github.com/mattlewis92/angular-calendar/commit/c0be926)), closes [#188](https://github.com/mattlewis92/angular-calendar/issues/188)



<a name="0.13.5"></a>
## [0.13.5](https://github.com/mattlewis92/angular-calendar/compare/v0.13.4...v0.13.5) (2017-04-14)


### Bug Fixes

* **draggable:** ensure text isnt selected on firefox ([ac26e14](https://github.com/mattlewis92/angular-calendar/commit/ac26e14)), closes [#183](https://github.com/mattlewis92/angular-calendar/issues/183)



<a name="0.13.4"></a>
## [0.13.4](https://github.com/mattlewis92/angular-calendar/compare/v0.13.3...v0.13.4) (2017-04-10)


### Bug Fixes

* **dayView:** fix resizing of events ([18b573f](https://github.com/mattlewis92/angular-calendar/commit/18b573f))



<a name="0.13.3"></a>
## [0.13.3](https://github.com/mattlewis92/angular-calendar/compare/v0.13.2...v0.13.3) (2017-04-10)


### Bug Fixes

* **dayView:** allow all events to be clicked ([c1c165d](https://github.com/mattlewis92/angular-calendar/commit/c1c165d)), closes [#179](https://github.com/mattlewis92/angular-calendar/issues/179)



<a name="0.13.2"></a>
## [0.13.2](https://github.com/mattlewis92/angular-calendar/compare/v0.13.1...v0.13.2) (2017-04-10)


### Bug Fixes

* **monthView:** handle DST changes in the middle of the month ([fcbca8a](https://github.com/mattlewis92/angular-calendar/commit/fcbca8a))



<a name="0.13.1"></a>
## [0.13.1](https://github.com/mattlewis92/angular-calendar/compare/v0.13.0...v0.13.1) (2017-04-09)


### Bug Fixes

* **monthView:** handle DST changes in the middle of the current month ([28b4be2](https://github.com/mattlewis92/angular-calendar/commit/28b4be2)), closes [#173](https://github.com/mattlewis92/angular-calendar/issues/173)



<a name="0.13.0"></a>
# [0.13.0](https://github.com/mattlewis92/angular-calendar/compare/v0.12.0...v0.13.0) (2017-04-07)


### Features

* **dayView:** allow the day view event template to be customised ([be4d5ee](https://github.com/mattlewis92/angular-calendar/commit/be4d5ee)), closes [#178](https://github.com/mattlewis92/angular-calendar/issues/178)



<a name="0.12.0"></a>
# [0.12.0](https://github.com/mattlewis92/angular-calendar/compare/v0.11.0...v0.12.0) (2017-04-05)


### Features

* **dayView:** allow the all day event template to be customised ([d542d13](https://github.com/mattlewis92/angular-calendar/commit/d542d13))
* **dayView:** allow the hour segment template to be customised ([149b605](https://github.com/mattlewis92/angular-calendar/commit/149b605)), closes [#172](https://github.com/mattlewis92/angular-calendar/issues/172)



<a name="0.11.0"></a>
# [0.11.0](https://github.com/mattlewis92/angular-calendar/compare/v0.10.1...v0.11.0) (2017-03-29)


### Features

* **weekView:** allow the event template to be customised ([0be434d](https://github.com/mattlewis92/angular-calendar/commit/0be434d)), closes [#171](https://github.com/mattlewis92/angular-calendar/issues/171)



<a name="0.10.1"></a>
## [0.10.1](https://github.com/mattlewis92/angular-calendar/compare/v0.10.0...v0.10.1) (2017-03-25)


### Bug Fixes

* allow events array to be null ([bcdf335](https://github.com/mattlewis92/angular-calendar/commit/bcdf335))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/mattlewis92/angular-calendar/compare/v0.9.1...v0.10.0) (2017-03-24)


### Features

* **ng4:** upgrade to angular 4 to remove the `<template>` tag deprecation warning ([68a8f39](https://github.com/mattlewis92/angular-calendar/commit/68a8f39)), closes [#163](https://github.com/mattlewis92/angular-calendar/issues/163)


### BREAKING CHANGES

* **ng4:** angular 4.0 or higher is now required to use this library. The
[upgrade](http://angularjs.blogspot.co.uk/2017/03/angular-400-now-available.html) should be seamless
for most users.



<a name="0.9.1"></a>
## [0.9.1](https://github.com/mattlewis92/angular-calendar/compare/v0.9.0...v0.9.1) (2017-03-23)


### Bug Fixes

* **draggable:** upgrade draggable dependency to allow touch events ([96145d1](https://github.com/mattlewis92/angular-calendar/commit/96145d1)), closes [#165](https://github.com/mattlewis92/angular-calendar/issues/165)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/mattlewis92/angular-calendar/compare/v0.8.0...v0.9.0) (2017-03-21)


### Features

* **monthView:** allow open day events template to be customised ([ef5a37f](https://github.com/mattlewis92/angular-calendar/commit/ef5a37f))
* **monthView:** allow the cell templates to be customised ([4603e6b](https://github.com/mattlewis92/angular-calendar/commit/4603e6b))
* **monthView:** allow the header template to be customised ([53db16b](https://github.com/mattlewis92/angular-calendar/commit/53db16b))
* **weekView:** allow the header template to be customised ([595a667](https://github.com/mattlewis92/angular-calendar/commit/595a667))
* expose day, week and month view components so they can be extended with inheritance ([426c287](https://github.com/mattlewis92/angular-calendar/commit/426c287))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/mattlewis92/angular-calendar/compare/v0.7.3...v0.8.0) (2017-03-12)


### Features

* **excludeDays:** add an option to hide days on the month and week views ([e296357](https://github.com/mattlewis92/angular-calendar/commit/e296357))



<a name="0.7.3"></a>
## [0.7.3](https://github.com/mattlewis92/angular-calendar/compare/v0.7.2...v0.7.3) (2017-03-04)


### Bug Fixes

* loosen angular peer dependency to support angular 4 ([e00c115](https://github.com/mattlewis92/angular-calendar/commit/e00c115))
* **dayView:** allow dropping of external events ([86e5d06](https://github.com/mattlewis92/angular-calendar/commit/86e5d06)), closes [#150](https://github.com/mattlewis92/angular-calendar/issues/150)
* **monthView:** add helper classes to the month view header ([0008a83](https://github.com/mattlewis92/angular-calendar/commit/0008a83)), closes [#152](https://github.com/mattlewis92/angular-calendar/issues/152)
* **weekView:** allow external events to be dropped on the column headers ([83266f7](https://github.com/mattlewis92/angular-calendar/commit/83266f7)), closes [#150](https://github.com/mattlewis92/angular-calendar/issues/150)


### Performance Improvements

* improve performance of draggable and resizable events ([71fe9cd](https://github.com/mattlewis92/angular-calendar/commit/71fe9cd)), closes [#149](https://github.com/mattlewis92/angular-calendar/issues/149)



<a name="0.7.2"></a>
## [0.7.2](https://github.com/mattlewis92/angular-calendar/compare/v0.7.1...v0.7.2) (2017-02-03)


### Bug Fixes

* disable drag events when resizing ([43c128c](https://github.com/mattlewis92/angular-calendar/commit/43c128c))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/mattlewis92/angular-calendar/compare/v0.7.0...v0.7.1) (2017-02-01)


### Features

* add all declarations to exports (*Please note that these sub components will be subject to breaking changes in the next release once [#16](https://github.com/mattlewis92/angular-calendar/issues/16) lands, however will eventually become part of the public API. Use at your own risk!*) ([f20a991](https://github.com/mattlewis92/angular-calendar/commit/f20a991))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/mattlewis92/angular-calendar/compare/v0.6.2...v0.7.0) (2017-01-28)


### Features

* add helper directives for changing the current view ([df398cb](https://github.com/mattlewis92/angular-calendar/commit/df398cb)), closes [#124](https://github.com/mattlewis92/angular-calendar/issues/124)



<a name="0.6.2"></a>
## [0.6.2](https://github.com/mattlewis92/angular-calendar/compare/v0.6.1...v0.6.2) (2017-01-06)


### Bug Fixes

* allow events to be dragged and clicked ([bc909a3](https://github.com/mattlewis92/angular-calendar/commit/bc909a3)), closes [#123](https://github.com/mattlewis92/angular-calendar/issues/123)


### Features

* export the CalendarMonthViewDay interface ([4142231](https://github.com/mattlewis92/angular-calendar/commit/4142231))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/mattlewis92/angular-calendar/compare/v0.5.0...v0.6.1) (2016-12-30)


### Bug Fixes

* update the event title in the UI when it changes ([3b611bf](https://github.com/mattlewis92/angular-calendar/commit/3b611bf)), closes [#116](https://github.com/mattlewis92/angular-calendar/issues/116)
* **monthView:** cell events should be clickable ([d61719e](https://github.com/mattlewis92/angular-calendar/commit/d61719e)), closes [#111](https://github.com/mattlewis92/angular-calendar/issues/111)


<a name="0.6.0"></a>
# [0.6.0](https://github.com/mattlewis92/angular-calendar/compare/v0.5.0...v0.6.0) (2016-12-21)


### Features

* **draggable:** allow external draggable events ([8ba068c](https://github.com/mattlewis92/angular-calendar/commit/8ba068c)), closes [#106](https://github.com/mattlewis92/angular-calendar/issues/106)


### BREAKING CHANGES

* draggable: if not using CalendarModule.forRoot() and manually adding providers you must now also include the DraggableHelper from the angular-draggable-droppable module

Before:
```
import {CalendarModule, CalendarEventTitleFormatter, CalendarDateFormatter} from 'angular-calendar';

imports: [
  CalendarModule
],
providers: [
  CalendarEventTitleFormatter,
  CalendarDateFormatter
]
```

After:
```
import {CalendarModule, CalendarEventTitleFormatter, CalendarDateFormatter} from 'angular-calendar';
import {DraggableHelper} from 'angular-draggable-droppable';

imports: [
  CalendarModule
],
providers: [
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  DraggableHelper
]
```


<a name="0.5.0"></a>
# [0.5.0](https://github.com/mattlewis92/angular-calendar/compare/v0.4.4...v0.5.0) (2016-12-18)


### Bug Fixes

* **dayView:** don't allow events to be resized outside of the calendar ([78eb123](https://github.com/mattlewis92/angular-calendar/commit/78eb123)), closes [#99](https://github.com/mattlewis92/angular-calendar/issues/99)
* **dayView:** use correct event height when resizing from the top ([1c5e74f](https://github.com/mattlewis92/angular-calendar/commit/1c5e74f))
* **weekView:** dont allow events to be resized outside of the calendar component ([007fbc5](https://github.com/mattlewis92/angular-calendar/commit/007fbc5)), closes [#99](https://github.com/mattlewis92/angular-calendar/issues/99)


### Features

* add drag and drop support ([#100](https://github.com/mattlewis92/angular-calendar/issues/100)) ([bbc02f3](https://github.com/mattlewis92/angular-calendar/commit/bbc02f3)), closes [#10](https://github.com/mattlewis92/angular-calendar/issues/10) [#102](https://github.com/mattlewis92/angular-calendar/issues/102)
* remove change detection strategy from all components ([#101](https://github.com/mattlewis92/angular-calendar/issues/101)) ([36458ab](https://github.com/mattlewis92/angular-calendar/commit/36458ab)), closes [#94](https://github.com/mattlewis92/angular-calendar/issues/94)
* rename `CalendarEventTitle` service to `CalendarEventTitleFormatter` ([45c0142](https://github.com/mattlewis92/angular-calendar/commit/45c0142))


### BREAKING CHANGES

* the `CalendarEventTitle` service has been renamed to `CalendarEventTitleFormatter`
* A dependency on the `angular-draggable-droppable` library has been added. System.js users will need to add this to their config:

```
'angular-draggable-droppable': 'npm:angular-draggable-droppable/dist/umd/angular-draggable-droppable.js'
```
* For enhanced performance it is recommended that you add `changeDetection: ChangeDetectionStrategy.OnPush` on all components that use this library. This will restrict change detection to only run when the components inputs change



<a name="0.4.4"></a>
## [0.4.4](https://github.com/mattlewis92/angular-calendar/compare/v0.4.3...v0.4.4) (2016-12-07)


### Bug Fixes

* **date-fns:** upgrade date-fns to fix module not found TS errors ([733ed3e](https://github.com/mattlewis92/angular-calendar/commit/733ed3e))



<a name="0.4.3"></a>
## [0.4.3](https://github.com/mattlewis92/angular-calendar/compare/v0.4.1...v0.4.3) (2016-12-05)


### Bug Fixes

* allow events array to be undefined ([3a475b9](https://github.com/mattlewis92/angular-calendar/commit/3a475b9)), closes [#96](https://github.com/mattlewis92/angular-calendar/issues/96)



<a name="0.4.2"></a>
## [0.4.2](https://github.com/mattlewis92/angular-calendar/compare/v0.4.1...v0.4.2) (2016-12-05)

* botched release



<a name="0.4.1"></a>
## [0.4.1](https://github.com/mattlewis92/angular-calendar/compare/v0.4.0...v0.4.1) (2016-11-25)


### Bug Fixes

* **date-fns:** fix duplicate module declaration typescript errors ([24be6f3](https://github.com/mattlewis92/angular-calendar/commit/24be6f3))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/mattlewis92/angular-calendar/compare/v0.3.6...v0.4.0) (2016-11-04)


### Bug Fixes

* **aot:** remove hacks required for AOT to work ([72a6e41](https://github.com/mattlewis92/angular-calendar/commit/72a6e41)), closes [#81](https://github.com/mattlewis92/angular-calendar/issues/81)


### Features

* **dayView:** add tooltips to events ([2cc7929](https://github.com/mattlewis92/angular-calendar/commit/2cc7929)), closes [#75](https://github.com/mattlewis92/angular-calendar/issues/75)
* **dayView:** allow resizing of events ([95b9033](https://github.com/mattlewis92/angular-calendar/commit/95b9033))
* **weekView:** support resizing of events ([c034a9d](https://github.com/mattlewis92/angular-calendar/commit/c034a9d)), closes [#9](https://github.com/mattlewis92/angular-calendar/issues/9)
* rename module from angular2-calendar to angular-calendar ([fa1ef98](https://github.com/mattlewis92/angular-calendar/commit/fa1ef98)), closes [#69](https://github.com/mattlewis92/angular-calendar/issues/69)


### BREAKING CHANGES

* The module has now been renamed from angular2-calendar to angular-calendar

The path to the sass and UMD builds has now changed. To migrate change all occurences of `angular2-calendar` to `angular-calendar`
* dayView: day view events now have tooltips by default
* aot: angular 2.1.2 or higher is now required for AOT to work
* dayView: A dependency on the `angular-resizable-element` library has now been added. System.js users will need to add this to their config

```
'angular-resizable-element': 'npm:angular-resizable-element/dist/umd/angular-resizable-element.js',
```

Part of #9



<a name="0.3.6"></a>
## [0.3.6](https://github.com/mattlewis92/angular2-calendar/compare/v0.3.5...v0.3.6) (2016-10-30)


### Bug Fixes

* **dayView:** fix event column stacking ([4570fc6](https://github.com/mattlewis92/angular2-calendar/commit/4570fc6)), closes [#80](https://github.com/mattlewis92/angular2-calendar/issues/80)
* **dayView:** show all day events that start outside of the day view start ([edb2614](https://github.com/mattlewis92/angular2-calendar/commit/edb2614)), closes [#79](https://github.com/mattlewis92/angular2-calendar/issues/79)



<a name="0.3.5"></a>
## [0.3.5](https://github.com/mattlewis92/angular2-calendar/compare/v0.3.4...v0.3.5) (2016-10-13)


### Bug Fixes

* **system.js:** use date-fns index imports for system.js users ([096d6a2](https://github.com/mattlewis92/angular2-calendar/commit/096d6a2))



<a name="0.3.4"></a>
## [0.3.4](https://github.com/mattlewis92/angular2-calendar/compare/v0.3.3...v0.3.4) (2016-10-08)


### Bug Fixes

* **umd:** more robust fix for umd build ([135116a](https://github.com/mattlewis92/angular2-calendar/commit/135116a))



<a name="0.3.3"></a>
## [0.3.3](https://github.com/mattlewis92/angular2-calendar/compare/v0.3.2...v0.3.3) (2016-10-07)


### Bug Fixes

* **umd:** fix umd build imports ([87c4764](https://github.com/mattlewis92/angular2-calendar/commit/87c4764)), closes [#68](https://github.com/mattlewis92/angular2-calendar/issues/68)



<a name="0.3.2"></a>
## [0.3.2](https://github.com/mattlewis92/angular2-calendar/compare/v0.3.1...v0.3.2) (2016-10-06)


### Bug Fixes

* **rollup:** allow the module to be bundled with rollup ([e6deeea](https://github.com/mattlewis92/angular2-calendar/commit/e6deeea))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/mattlewis92/angular2-calendar/compare/v0.3.0...v0.3.1) (2016-10-05)


### Bug Fixes

* support building with rollup ([428e254](https://github.com/mattlewis92/angular2-calendar/commit/428e254))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.7...v0.3.0) (2016-10-05)


### Bug Fixes

* only versions of angular >= 2.0.0 are supported ([6b1700b](https://github.com/mattlewis92/angular2-calendar/commit/6b1700b)), closes [#66](https://github.com/mattlewis92/angular2-calendar/issues/66)
* remove positioning sourcemap from umd build ([d7ea482](https://github.com/mattlewis92/angular2-calendar/commit/d7ea482)), closes [#66](https://github.com/mattlewis92/angular2-calendar/issues/66)


### Features

* add CalendarModule.forRoot so providers dont need to be specified ([ee54b8f](https://github.com/mattlewis92/angular2-calendar/commit/ee54b8f))


### BREAKING CHANGES

* no RC versions of angular are supported. This was probably introduced in 0.2.x of this module, but clarifying here as a distinct breaking change



<a name="0.2.7"></a>
## [0.2.7](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.6...v0.2.7) (2016-10-05)


### Bug Fixes

* use commonjs date-fns imports for rollup ([7e758ba](https://github.com/mattlewis92/angular2-calendar/commit/7e758ba))



<a name="0.2.6"></a>
## [0.2.6](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.5...v0.2.6) (2016-09-28)


### Bug Fixes

* **typings:** dont include reference to core-js ([4daac27](https://github.com/mattlewis92/angular2-calendar/commit/4daac27))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.4...v0.2.5) (2016-09-24)


### Bug Fixes

* **aot:** export all components for aot ([f701f86](https://github.com/mattlewis92/angular2-calendar/commit/f701f86))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.3...v0.2.4) (2016-09-24)


### Bug Fixes

* **aot:** export components so aot works ([8b7ffc7](https://github.com/mattlewis92/angular2-calendar/commit/8b7ffc7))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.2...v0.2.3) (2016-09-24)


### Bug Fixes

* **aot:** fix typescript errors when doing aot ([c5ac3f9](https://github.com/mattlewis92/angular2-calendar/commit/c5ac3f9))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.1...v0.2.2) (2016-09-23)


### Bug Fixes

* typings and esm paths ([b70b92a](https://github.com/mattlewis92/angular2-calendar/commit/b70b92a))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/mattlewis92/angular2-calendar/compare/v0.2.0...v0.2.1) (2016-09-23)


### Bug Fixes

* allow any 1.x version of date-fns to be installed ([726aaac](https://github.com/mattlewis92/angular2-calendar/commit/726aaac))
* **esm:** dont import sass files in the esm build ([00120f9](https://github.com/mattlewis92/angular2-calendar/commit/00120f9))
* **ng-bootstrap:** add ng-bootstrap dependency to fix es module imports ([af91adc](https://github.com/mattlewis92/angular2-calendar/commit/af91adc))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/mattlewis92/angular2-calendar/compare/v0.1.3...v0.2.0) (2016-09-23)


### Features

* **build:** support offline template compilation ([dc12621](https://github.com/mattlewis92/angular2-calendar/commit/dc12621))
* replace the moment dependency with the date-fns library ([c147827](https://github.com/mattlewis92/angular2-calendar/commit/c147827)), closes [#48](https://github.com/mattlewis92/angular2-calendar/issues/48)


### BREAKING CHANGES

* 1/ The `dayClicked`, `dayModifier` and `hourSegmentModifier` output objects now return pure date objects instead of moments

2/ If using the `CalendarMomentDateFormatter` you must now also provide moment to the calendar like so
```
import * as moment from 'moment';
import {
  CalendarMomentDateFormatter,
  CalendarDateFormatter,
  MOMENT
} from './../angular2-calendar';

...

providers: [
  {provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter},
  {provide: MOMENT, useValue: moment}
]

```

3/ The week start day is now no longer determined by moment. You must manually pass it to the month and week view components like so
```
// the first day of the week is Monday
[weekStartsOn]="1"
```

4/ If using this library without a module bundler you must make sure the date-fns library is included in a script tag
* build: The dist file paths have changed. To migrate

Before
```
import 'angular2-calendar/css/angular2-calendar.css';
```

After:
```
import 'angular2-calendar/dist/css/angular2-calendar.css';
```

For System.js users the path to the UMD files has changed:

Before:
```
node_modules/angular2-calendar/angular2-calendar.js
```

After:
```
node_modules/angular2-calendar/dist/umd/angular2-calendar.js
```

Webpack / browserify users aren't affected



<a name="0.1.3"></a>
## [0.1.3](https://github.com/mattlewis92/angular2-calendar/compare/v0.1.2...v0.1.3) (2016-09-13)


### Bug Fixes

* **peerDependencies:** support any version of angular >= RC5 ([2698bcf](https://github.com/mattlewis92/angular2-calendar/commit/2698bcf))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/mattlewis92/angular2-calendar/compare/v0.1.1...v0.1.2) (2016-09-08)


### Bug Fixes

* **monthView:** Change month-view header text-overflow to ellipsis ([#60](https://github.com/mattlewis92/angular2-calendar/issues/60)) ([23ba526](https://github.com/mattlewis92/angular2-calendar/commit/23ba526)), closes [#59](https://github.com/mattlewis92/angular2-calendar/issues/59)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/mattlewis92/angular2-calendar/compare/v0.1.0...v0.1.1) (2016-09-03)


### Bug Fixes

* **monthView:** fix the eventClicked output ([745fff7](https://github.com/mattlewis92/angular2-calendar/commit/745fff7))



<a name="0.1.0"></a>
# 0.1.0 (2016-09-03)

_Initial release_
