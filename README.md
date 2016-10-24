# angular2 calendar
[![Build Status](https://travis-ci.org/mattlewis92/angular2-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular2-calendar)
[![npm version](https://badge.fury.io/js/angular2-calendar.svg)](http://badge.fury.io/js/angular2-calendar)
[![devDependency Status](https://david-dm.org/mattlewis92/angular2-calendar/dev-status.svg)](https://david-dm.org/mattlewis92/angular2-calendar#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular2-calendar.svg)](https://github.com/mattlewis92/angular2-calendar/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular2-calendar.svg)](https://github.com/mattlewis92/angular2-calendar/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular2-calendar/master/LICENSE)

## Demo
https://mattlewis92.github.io/angular2-calendar/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A calendar component that can display events on a month, week or day view. The successor of: https://github.com/mattlewis92/angular-bootstrap-calendar

## Getting started

Install through npm:
```
npm install --save angular2-calendar
```

Import the calendar module into your apps module:
```
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular2-calendar';

@NgModule({
  imports: [
    CalendarModule.forRoot()
  ]
})
export class MyModule {}
```

Then use the `mwl-calendar-month-view`, `mwl-calendar-week-view` and `mwl-calendar-day-view` components in your app. For a full e2e example see the [demo source](https://github.com/mattlewis92/angular2-calendar/blob/master/demo/demo.component.ts). 

To see all available API options see the auto generated [documentation](https://mattlewis92.github.io/angular2-calendar/docs/). Full e2e examples will follow [in the future](https://github.com/mattlewis92/angular2-calendar/issues/32)

### Module bundlers

You can find quick start examples for all common module bundlers in the [examples](https://github.com/mattlewis92/angular2-calendar/examples/) folder.

### Usage without a module bundler
```
<script src="node_modules/angular2-calendar/dist/umd/angular2-calendar.js"></script>
<script>
    // everything is exported angular2Calendar namespace
</script>
```

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
