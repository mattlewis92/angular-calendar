"use strict";
exports.__esModule = true;
var packageJson = require('../../package.json'); // tslint:disable-line no-var-requires
exports.angularCalendarVersion = "^" + packageJson.version;
exports.momentVersion = packageJson.devDependencies.moment;
exports.dateFnsVersion = packageJson.devDependencies['date-fns'];
