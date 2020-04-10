"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var date_fns_1 = require("calendar-utils/date-adapters/date-fns");
var date_fns_2 = require("date-fns");
function adapterFactory() {
    return tslib_1.__assign({}, date_fns_1.adapterFactory(), { addWeeks: date_fns_2.addWeeks,
        addMonths: date_fns_2.addMonths,
        subDays: date_fns_2.subDays,
        subWeeks: date_fns_2.subWeeks,
        subMonths: date_fns_2.subMonths,
        getISOWeek: date_fns_2.getISOWeek,
        setDate: date_fns_2.setDate,
        setMonth: date_fns_2.setMonth,
        setYear: date_fns_2.setYear,
        getDate: date_fns_2.getDate,
        getYear: date_fns_2.getYear });
}
exports.adapterFactory = adapterFactory;
//# sourceMappingURL=index.js.map