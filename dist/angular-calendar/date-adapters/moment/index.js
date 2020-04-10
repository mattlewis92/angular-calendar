"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var moment_1 = require("calendar-utils/date-adapters/moment");
function adapterFactory(moment) {
    return tslib_1.__assign({}, moment_1.adapterFactory(moment), { addWeeks: function (date, amount) {
            return moment(date).add(amount, 'weeks').toDate();
        },
        addMonths: function (date, amount) {
            return moment(date).add(amount, 'months').toDate();
        },
        subDays: function (date, amount) {
            return moment(date).subtract(amount, 'days').toDate();
        },
        subWeeks: function (date, amount) {
            return moment(date).subtract(amount, 'weeks').toDate();
        },
        subMonths: function (date, amount) {
            return moment(date).subtract(amount, 'months').toDate();
        },
        getISOWeek: function (date) {
            return moment(date).isoWeek();
        },
        setDate: function (date, dayOfMonth) {
            return moment(date).date(dayOfMonth).toDate();
        },
        setMonth: function (date, month) {
            return moment(date).month(month).toDate();
        },
        setYear: function (date, year) {
            return moment(date).year(year).toDate();
        },
        getDate: function (date) {
            return moment(date).date();
        },
        getYear: function (date) {
            return moment(date).year();
        } });
}
exports.adapterFactory = adapterFactory;
//# sourceMappingURL=index.js.map