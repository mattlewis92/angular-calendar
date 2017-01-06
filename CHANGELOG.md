# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
