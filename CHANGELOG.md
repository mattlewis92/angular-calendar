# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0"></a>
# [0.2.0](https://github.com/mattlewis92/angular2-calendar/compare/v0.1.3...v0.2.0) (2016-09-23)


### Features

* **build:** support offline template compilation ([dc12621](https://github.com/mattlewis92/angular2-calendar/commit/dc12621))
* replace the moment dependency with the date-fns library ([c147827](https://github.com/mattlewis92/angular2-calendar/commit/c147827)), closes [#48](https://github.com/mattlewis92/angular2-calendar/issues/48)


### BREAKING CHANGES

* 1/ The `dayModifier` and `hourSegmentModifier` output objects now return pure date objects instead of moments

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
