# angular 2.0+ calendar
[![Build Status](https://travis-ci.org/mattlewis92/angular-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-calendar)
[![npm version](https://badge.fury.io/js/angular-calendar.svg)](http://badge.fury.io/js/angular-calendar)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-calendar/dev-status.svg)](https://david-dm.org/mattlewis92/angular-calendar#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular-calendar.svg)](https://github.com/mattlewis92/angular-calendar/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular-calendar.svg)](https://github.com/mattlewis92/angular-calendar/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular-calendar/master/LICENSE)

## Demo
https://mattlewis92.github.io/angular-calendar/demos/

## Table of contents

- [About](#about)
- [Getting started](#getting-started)
- [Documentation](#documentation)
- [Angular 1 version](#angular-1-version)
- [Development](#development)
- [License](#licence)

## About

A calendar component for angular 2.0+ that can display events on a month, week or day view. The successor of: https://github.com/mattlewis92/angular-bootstrap-calendar

## Getting started

First install through npm:
```
npm install --save angular-calendar
```

Next include the CSS file somewhere into your app:
```
node_modules/angular-calendar/dist/css/angular-calendar.css
```

Finally import the calendar module into your apps module:
```
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    CalendarModule.forRoot()
  ]
})
export class MyModule {}
```

Then you can use the [`mwl-calendar-month-view`](https://mattlewis92.github.io/angular-calendar/docs/classes/calendarmonthviewcomponent.html), [`mwl-calendar-week-view`](https://mattlewis92.github.io/angular-calendar/docs/classes/calendarweekviewcomponent.html) and [`mwl-calendar-day-view`](https://mattlewis92.github.io/angular-calendar/docs/classes/calendardayviewcomponent.html) components in your app. For a full e2e example see the [demo source](https://github.com/mattlewis92/angular-calendar/blob/master/demos). 

### Module bundlers

You can find quick start examples for all common module bundlers in the [examples](https://github.com/mattlewis92/angular-calendar/tree/master/build-tool-examples) folder.

### Usage without a module bundler
```
<script src="node_modules/angular-calendar/dist/umd/angular-calendar.js"></script>
<script>
    // everything is exported angularCalendar namespace
</script>
```

## Documentation
To see all available API options see the auto generated [documentation](https://mattlewis92.github.io/angular-calendar/docs/) or you may find it helpful to view the examples on the demo page.

## Angular 1 version
https://github.com/mattlewis92/angular-bootstrap-calendar

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
