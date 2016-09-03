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

## Installation

Install through npm:
```
npm install --save angular2-calendar
```

For a full e2e example see the [demo source](https://github.com/mattlewis92/angular2-calendar/blob/master/demo/demo.component.ts). Better docs to follow in the future!

### Usage without a module bundler
```
<script src="node_modules/angular2-calendar/angular2-calendar.js"></script>
<script>
    // everything is exported angular2Calendar namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://mattlewis92.github.io/angular2-calendar/docs/

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
