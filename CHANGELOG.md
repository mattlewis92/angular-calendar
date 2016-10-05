# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
