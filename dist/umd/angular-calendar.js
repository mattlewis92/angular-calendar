(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("calendar-utils"), require("rxjs/Subject"), require("date-fns/add_days/index"), require("angular-draggable-droppable"), require("angular-resizable-element"), require("date-fns/add_minutes/index"), require("date-fns/add_months/index"), require("date-fns/add_seconds/index"), require("date-fns/add_weeks/index"), require("date-fns/difference_in_seconds/index"), require("date-fns/get_date/index"), require("date-fns/get_iso_week/index"), require("date-fns/get_month/index"), require("date-fns/get_year/index"), require("date-fns/is_same_day/index"), require("date-fns/set_date/index"), require("date-fns/set_month/index"), require("date-fns/set_year/index"), require("date-fns/start_of_today/index"), require("date-fns/sub_days/index"), require("date-fns/sub_months/index"), require("date-fns/sub_weeks/index"), require("@angular/common"), require("@angular/platform-browser"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "calendar-utils", "rxjs/Subject", "date-fns/add_days/index", "angular-draggable-droppable", "angular-resizable-element", "date-fns/add_minutes/index", "date-fns/add_months/index", "date-fns/add_seconds/index", "date-fns/add_weeks/index", "date-fns/difference_in_seconds/index", "date-fns/get_date/index", "date-fns/get_iso_week/index", "date-fns/get_month/index", "date-fns/get_year/index", "date-fns/is_same_day/index", "date-fns/set_date/index", "date-fns/set_month/index", "date-fns/set_year/index", "date-fns/start_of_today/index", "date-fns/sub_days/index", "date-fns/sub_months/index", "date-fns/sub_weeks/index", "@angular/common", "@angular/platform-browser"], factory);
	else if(typeof exports === 'object')
		exports["angularCalendar"] = factory(require("@angular/core"), require("calendar-utils"), require("rxjs/Subject"), require("date-fns/add_days/index"), require("angular-draggable-droppable"), require("angular-resizable-element"), require("date-fns/add_minutes/index"), require("date-fns/add_months/index"), require("date-fns/add_seconds/index"), require("date-fns/add_weeks/index"), require("date-fns/difference_in_seconds/index"), require("date-fns/get_date/index"), require("date-fns/get_iso_week/index"), require("date-fns/get_month/index"), require("date-fns/get_year/index"), require("date-fns/is_same_day/index"), require("date-fns/set_date/index"), require("date-fns/set_month/index"), require("date-fns/set_year/index"), require("date-fns/start_of_today/index"), require("date-fns/sub_days/index"), require("date-fns/sub_months/index"), require("date-fns/sub_weeks/index"), require("@angular/common"), require("@angular/platform-browser"));
	else
		root["angularCalendar"] = factory(root["ng"]["core"], root["calendarUtils"], root["rx"]["Subject"], root["dateFns"]["addDays"], root["angularDraggableDroppable"], root["angularResizableElement"], root["dateFns"]["addMinutes"], root["dateFns"]["addMonths"], root["dateFns"]["addSeconds"], root["dateFns"]["addWeeks"], root["dateFns"]["differenceInSeconds"], root["dateFns"]["getDate"], root["dateFns"]["getIsoWeek"], root["dateFns"]["getMonth"], root["dateFns"]["getYear"], root["dateFns"]["isSameDay"], root["dateFns"]["setDate"], root["dateFns"]["setMonth"], root["dateFns"]["setYear"], root["dateFns"]["startOfToday"], root["dateFns"]["subDays"], root["dateFns"]["subMonths"], root["dateFns"]["subWeeks"], root["ng"]["common"], root["ng"]["platformBrowser"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_35__, __WEBPACK_EXTERNAL_MODULE_36__, __WEBPACK_EXTERNAL_MODULE_37__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_41__, __WEBPACK_EXTERNAL_MODULE_42__, __WEBPACK_EXTERNAL_MODULE_43__, __WEBPACK_EXTERNAL_MODULE_44__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_46__, __WEBPACK_EXTERNAL_MODULE_47__, __WEBPACK_EXTERNAL_MODULE_48__, __WEBPACK_EXTERNAL_MODULE_49__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_51__, __WEBPACK_EXTERNAL_MODULE_52__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__, __WEBPACK_EXTERNAL_MODULE_55__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendarNativeDateFormatter_provider__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDateFormatter; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * This class is responsible for all formatting of dates. There are 2 implementations available, the `CalendarNativeDateFormatter` (default) which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
 *
 * If you wish, you may override any of the defaults via angulars DI. For example:
 *
 * ```
 * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
 *
 * class CustomDateFormatter extends CalendarDateFormatter {
 *
 *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
 *     return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date); // use short week days
 *   }
 *
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *   provide: CalendarDateFormatter,
 *   useClass: CustomDateFormatter
 * }]
 * ```
 */
var CalendarDateFormatter = (function (_super) {
    __extends(CalendarDateFormatter, _super);
    function CalendarDateFormatter() {
        _super.apply(this, arguments);
    }
    return CalendarDateFormatter;
}(__WEBPACK_IMPORTED_MODULE_0__calendarNativeDateFormatter_provider__["a" /* CalendarNativeDateFormatter */]));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarEventTitleFormatter; });
/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
 * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
 *
 *   month(event: CalendarEvent): string {
 *     return `Custom prefix: ${event.title}`;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarEventTitleFormatter,
 *  useClass: CustomEventTitleFormatter
 * }]
 * ```
 */
var CalendarEventTitleFormatter = (function () {
    function CalendarEventTitleFormatter() {
    }
    /**
     * The month view event title.
     */
    CalendarEventTitleFormatter.prototype.month = function (event) {
        return event.title;
    };
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    CalendarEventTitleFormatter.prototype.monthTooltip = function (event) {
        return event.title;
    };
    /**
     * The week view event title.
     */
    CalendarEventTitleFormatter.prototype.week = function (event) {
        return event.title;
    };
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    CalendarEventTitleFormatter.prototype.weekTooltip = function (event) {
        return event.title;
    };
    /**
     * The day view event title.
     */
    CalendarEventTitleFormatter.prototype.day = function (event) {
        return event.title;
    };
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    CalendarEventTitleFormatter.prototype.dayTooltip = function (event) {
        return event.title;
    };
    return CalendarEventTitleFormatter;
}());


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendarUtils_provider__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDragHelper; });

var CalendarDragHelper = (function () {
    function CalendarDragHelper(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    CalendarDragHelper.prototype.validateDrag = function (_a) {
        var x = _a.x, y = _a.y;
        var newRect = Object.assign({}, this.startPosition, {
            left: this.startPosition.left + x,
            right: this.startPosition.right + x,
            top: this.startPosition.top + y,
            bottom: this.startPosition.bottom + y
        });
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__calendarUtils_provider__["a" /* isInside */])(this.dragContainerElement.getBoundingClientRect(), newRect);
    };
    return CalendarDragHelper;
}());


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_get_iso_week__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_get_iso_week___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns_get_iso_week__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarNativeDateFormatter; });

/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting. It is the default date formatter used by the calendar.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
var CalendarNativeDateFormatter = (function () {
    function CalendarNativeDateFormatter() {
    }
    /**
     * The month view header week day labels
     */
    CalendarNativeDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    };
    /**
     * The month view cell day number
     */
    CalendarNativeDateFormatter.prototype.monthViewDayNumber = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
    };
    /**
     * The month view title
     */
    CalendarNativeDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(date);
    };
    /**
     * The week view header week day labels
     */
    CalendarNativeDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    };
    /**
     * The week view sub header day and month labels
     */
    CalendarNativeDateFormatter.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short'
        }).format(date);
    };
    /**
     * The week view title
     */
    CalendarNativeDateFormatter.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        var year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
        var weekNumber = __WEBPACK_IMPORTED_MODULE_0_date_fns_get_iso_week___default()(date);
        return "Week " + weekNumber + " of " + year;
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    CalendarNativeDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
    };
    /**
     * The day view title
     */
    CalendarNativeDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        }).format(date);
    };
    return CalendarNativeDateFormatter;
}());


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendarUtils_provider__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarResizeHelper; });

var CalendarResizeHelper = (function () {
    function CalendarResizeHelper(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    CalendarResizeHelper.prototype.validateResize = function (_a) {
        var rectangle = _a.rectangle;
        if (this.minWidth && rectangle.width < this.minWidth) {
            return false;
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__calendarUtils_provider__["a" /* isInside */])(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    };
    return CalendarResizeHelper;
}());


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isInside;
function isInside(outer, inner) {
    return outer.left <= inner.left &&
        inner.left <= outer.right &&
        outer.left <= inner.right &&
        inner.right <= outer.right &&
        outer.top <= inner.top &&
        inner.top <= outer.bottom &&
        outer.top <= inner.bottom &&
        inner.bottom <= outer.bottom;
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_calendarEventTitleFormatter_provider__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CalendarEventTitleFormatter", function() { return __WEBPACK_IMPORTED_MODULE_0__providers_calendarEventTitleFormatter_provider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_calendarMomentDateFormatter_provider__ = __webpack_require__(33);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MOMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__providers_calendarMomentDateFormatter_provider__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CalendarMomentDateFormatter", function() { return __WEBPACK_IMPORTED_MODULE_1__providers_calendarMomentDateFormatter_provider__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_calendarNativeDateFormatter_provider__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CalendarNativeDateFormatter", function() { return __WEBPACK_IMPORTED_MODULE_2__providers_calendarNativeDateFormatter_provider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_calendarDateFormatter_provider__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CalendarDateFormatter", function() { return __WEBPACK_IMPORTED_MODULE_3__providers_calendarDateFormatter_provider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_calendarDateFormatter_interface__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_calendarDateFormatter_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__interfaces_calendarDateFormatter_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__interfaces_calendarDateFormatter_interface__) if(["CalendarEventTitleFormatter","MOMENT","CalendarMomentDateFormatter","CalendarNativeDateFormatter","CalendarDateFormatter","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_4__interfaces_calendarDateFormatter_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interfaces_calendarEventTimesChangedEvent_interface__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interfaces_calendarEventTimesChangedEvent_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__interfaces_calendarEventTimesChangedEvent_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_5__interfaces_calendarEventTimesChangedEvent_interface__) if(["CalendarEventTitleFormatter","MOMENT","CalendarMomentDateFormatter","CalendarNativeDateFormatter","CalendarDateFormatter","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_5__interfaces_calendarEventTimesChangedEvent_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__calendar_module__ = __webpack_require__(12);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CalendarModule", function() { return __WEBPACK_IMPORTED_MODULE_6__calendar_module__["a"]; });









/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_resizable_element__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_resizable_element___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_resizable_element__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_draggable_droppable__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_draggable_droppable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular_draggable_droppable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_day_calendarDayView_component__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_week_calendarWeekView_component__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_month_calendarMonthView_component__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_calendarEventActions_component__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_common_calendarEventTitle_component__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_month_calendarMonthCell_component__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_month_calendarOpenDayEvents_component__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_week_calendarWeekViewHeader_component__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_week_calendarWeekViewEvent_component__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_day_calendarAllDayEvent_component__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_day_calendarDayViewHourSegment_component__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_day_calendarDayViewEvent_component__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__directives_calendarTooltip_directive__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__directives_calendarPreviousView_directive__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__directives_calendarNextView_directive__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__directives_calendarToday_directive__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_calendarDate_pipe__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_calendarEventTitle_pipe__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_calendarEventTitleFormatter_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_calendarDateFormatter_provider__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
























/**
 * The main module of this library. Example usage:
 *
 * ```
 * import { CalenderModule } from 'angular-calendar';
 *
 * &commat;NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
var CalendarModule = (function () {
    function CalendarModule() {
    }
    CalendarModule.forRoot = function () {
        return {
            ngModule: CalendarModule,
            providers: [
                __WEBPACK_IMPORTED_MODULE_22__providers_calendarEventTitleFormatter_provider__["a" /* CalendarEventTitleFormatter */],
                __WEBPACK_IMPORTED_MODULE_23__providers_calendarDateFormatter_provider__["a" /* CalendarDateFormatter */],
                __WEBPACK_IMPORTED_MODULE_3_angular_draggable_droppable__["DraggableHelper"]
            ]
        };
    };
    CalendarModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__components_day_calendarDayView_component__["a" /* CalendarDayViewComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_week_calendarWeekView_component__["a" /* CalendarWeekViewComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_month_calendarMonthView_component__["a" /* CalendarMonthViewComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_common_calendarEventActions_component__["a" /* CalendarEventActionsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_common_calendarEventTitle_component__["a" /* CalendarEventTitleComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_month_calendarMonthCell_component__["a" /* CalendarMonthCellComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_month_calendarOpenDayEvents_component__["a" /* CalendarOpenDayEventsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_week_calendarWeekViewHeader_component__["a" /* CalendarWeekViewHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_week_calendarWeekViewEvent_component__["a" /* CalendarWeekViewEventComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_day_calendarAllDayEvent_component__["a" /* CalendarAllDayEventComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_day_calendarDayViewHourSegment_component__["a" /* CalendarDayViewHourSegmentComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_day_calendarDayViewEvent_component__["a" /* CalendarDayViewEventComponent */],
                __WEBPACK_IMPORTED_MODULE_16__directives_calendarTooltip_directive__["a" /* CalendarTooltipWindowComponent */],
                __WEBPACK_IMPORTED_MODULE_16__directives_calendarTooltip_directive__["b" /* CalendarTooltipDirective */],
                __WEBPACK_IMPORTED_MODULE_17__directives_calendarPreviousView_directive__["a" /* CalendarPreviousViewDirective */],
                __WEBPACK_IMPORTED_MODULE_18__directives_calendarNextView_directive__["a" /* CalendarNextViewDirective */],
                __WEBPACK_IMPORTED_MODULE_19__directives_calendarToday_directive__["a" /* CalendarTodayDirective */],
                __WEBPACK_IMPORTED_MODULE_20__pipes_calendarDate_pipe__["a" /* CalendarDatePipe */],
                __WEBPACK_IMPORTED_MODULE_21__pipes_calendarEventTitle_pipe__["a" /* CalendarEventTitlePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2_angular_resizable_element__["ResizableModule"],
                __WEBPACK_IMPORTED_MODULE_3_angular_draggable_droppable__["DragAndDropModule"]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__components_day_calendarDayView_component__["a" /* CalendarDayViewComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_week_calendarWeekView_component__["a" /* CalendarWeekViewComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_month_calendarMonthView_component__["a" /* CalendarMonthViewComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_common_calendarEventActions_component__["a" /* CalendarEventActionsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_common_calendarEventTitle_component__["a" /* CalendarEventTitleComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_month_calendarMonthCell_component__["a" /* CalendarMonthCellComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_month_calendarOpenDayEvents_component__["a" /* CalendarOpenDayEventsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_week_calendarWeekViewHeader_component__["a" /* CalendarWeekViewHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_week_calendarWeekViewEvent_component__["a" /* CalendarWeekViewEventComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_day_calendarAllDayEvent_component__["a" /* CalendarAllDayEventComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_day_calendarDayViewHourSegment_component__["a" /* CalendarDayViewHourSegmentComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_day_calendarDayViewEvent_component__["a" /* CalendarDayViewEventComponent */],
                __WEBPACK_IMPORTED_MODULE_16__directives_calendarTooltip_directive__["a" /* CalendarTooltipWindowComponent */],
                __WEBPACK_IMPORTED_MODULE_16__directives_calendarTooltip_directive__["b" /* CalendarTooltipDirective */],
                __WEBPACK_IMPORTED_MODULE_17__directives_calendarPreviousView_directive__["a" /* CalendarPreviousViewDirective */],
                __WEBPACK_IMPORTED_MODULE_18__directives_calendarNextView_directive__["a" /* CalendarNextViewDirective */],
                __WEBPACK_IMPORTED_MODULE_19__directives_calendarToday_directive__["a" /* CalendarTodayDirective */],
                __WEBPACK_IMPORTED_MODULE_20__pipes_calendarDate_pipe__["a" /* CalendarDatePipe */],
                __WEBPACK_IMPORTED_MODULE_21__pipes_calendarEventTitle_pipe__["a" /* CalendarEventTitlePipe */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_16__directives_calendarTooltip_directive__["a" /* CalendarTooltipWindowComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarModule);
    return CalendarModule;
}());


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarEventActionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarEventActionsComponent = (function () {
    function CalendarEventActionsComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarEventActionsComponent.prototype, "event", void 0);
    CalendarEventActionsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-event-actions',
            template: "\n    <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n      <a\n        class=\"cal-event-action\"\n        href=\"javascript:;\"\n        *ngFor=\"let action of event.actions\"\n        (click)=\"action.onClick({event: event})\"\n        [ngClass]=\"action.cssClass\"\n        [innerHtml]=\"action.label\">\n      </a>\n    </span>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarEventActionsComponent);
    return CalendarEventActionsComponent;
}());


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarEventTitleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarEventTitleComponent = (function () {
    function CalendarEventTitleComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarEventTitleComponent.prototype, "event", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarEventTitleComponent.prototype, "view", void 0);
    CalendarEventTitleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-event-title',
            template: "\n    <a\n      class=\"cal-event-title\"\n      href=\"javascript:;\"\n      [innerHTML]=\"event.title | calendarEventTitle:view:event\">\n    </a>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarEventTitleComponent);
    return CalendarEventTitleComponent;
}());


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarAllDayEventComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarAllDayEventComponent = (function () {
    function CalendarAllDayEventComponent() {
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarAllDayEventComponent.prototype, "event", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarAllDayEventComponent.prototype, "eventClicked", void 0);
    CalendarAllDayEventComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-all-day-event',
            template: "\n    <div\n      class=\"cal-all-day-event\"\n      [style.backgroundColor]=\"event.color.secondary\"\n      [style.borderColor]=\"event.color.primary\">\n      <mwl-calendar-event-title\n        [event]=\"event\"\n        view=\"day\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n      <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarAllDayEventComponent);
    return CalendarAllDayEventComponent;
}());


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_calendar_utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_calendar_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_calendar_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDayViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/**
 * @hidden
 */
var SEGMENT_HEIGHT = 30;
/**
 * Shows all events on a given day. Example usage:
 *
 * ```
 * &lt;mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/mwl-calendar-day-view&gt;
 * ```
 */
var CalendarDayViewComponent = (function () {
    /**
     * @hidden
     */
    function CalendarDayViewComponent(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The grid size to snap resizing and dragging of events to
         */
        this.eventSnapSize = 30;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.width = 0;
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarDayViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarDayViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    CalendarDayViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    };
    CalendarDayViewComponent.prototype.refreshHourGrid = function () {
        var _this = this;
        this.hours = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_calendar_utils__["getDayViewHourGrid"])({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        if (this.hourSegmentModifier) {
            this.hours.forEach(function (hour) {
                hour.segments.forEach(function (segment) { return _this.hourSegmentModifier(segment); });
            });
        }
    };
    CalendarDayViewComponent.prototype.refreshView = function () {
        this.view = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_calendar_utils__["getDayView"])({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: SEGMENT_HEIGHT
        });
    };
    CalendarDayViewComponent.prototype.refreshAll = function () {
        this.refreshHourGrid();
        this.refreshView();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Date)
    ], CalendarDayViewComponent.prototype, "viewDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], CalendarDayViewComponent.prototype, "events", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "hourSegments", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayStartHour", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayStartMinute", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayEndHour", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayEndMinute", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "eventWidth", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"])
    ], CalendarDayViewComponent.prototype, "refresh", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarDayViewComponent.prototype, "locale", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Function)
    ], CalendarDayViewComponent.prototype, "hourSegmentModifier", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "eventSnapSize", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarDayViewComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarDayViewComponent.prototype, "eventClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarDayViewComponent.prototype, "hourSegmentClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarDayViewComponent.prototype, "eventTimesChanged", void 0);
    CalendarDayViewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-day-view',
            template: "\n    <div class=\"cal-day-view\" #dayViewContainer>\n      <mwl-calendar-all-day-event\n        *ngFor=\"let event of view.allDayEvents\"\n        [event]=\"event\"\n        (eventClicked)=\"eventClicked.emit({event: event})\">\n      </mwl-calendar-all-day-event>\n      <div class=\"cal-hour-rows\">\n        <div class=\"cal-events\">\n          <mwl-calendar-day-view-event\n            *ngFor=\"let dayEvent of view?.events\"\n            [dayEvent]=\"dayEvent\"\n            [hourSegments]=\"hourSegments\"\n            [tooltipPlacement]=\"tooltipPlacement\"\n            [eventSnapSize]=\"eventSnapSize\"\n            [dayViewContainer]=\"dayViewContainer\"\n            (eventClicked)=\"eventClicked.emit({event: dayEvent.event})\"\n            (eventResized)=\"eventTimesChanged.emit($event)\">\n          </mwl-calendar-day-view-event>\n        </div>\n        <div class=\"cal-hour\" *ngFor=\"let hour of hours\" [style.minWidth.px]=\"view?.width + 70\">\n          <mwl-calendar-day-view-hour-segment\n            *ngFor=\"let segment of hour.segments\"\n            [segment]=\"segment\"\n            [locale]=\"locale\"\n            (click)=\"hourSegmentClicked.emit({date: segment.date})\">\n          </mwl-calendar-day-view-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"])), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], String])
    ], CalendarDayViewComponent);
    return CalendarDayViewComponent;
}());


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_calendarDragHelper_provider__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_calendarResizeHelper_provider__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDayViewEventComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CalendarDayViewEventComponent = (function () {
    function CalendarDayViewEventComponent(cdr) {
        this.cdr = cdr;
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.eventResized = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CalendarDayViewEventComponent.prototype.resizeStarted = function (event, resizeEvent) {
        this.currentResize = {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        };
        var resizeHelper = new __WEBPACK_IMPORTED_MODULE_3__providers_calendarResizeHelper_provider__["a" /* CalendarResizeHelper */](this.dayViewContainer);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    CalendarDayViewEventComponent.prototype.resizing = function (event, resizeEvent) {
        if (resizeEvent.edges.top) {
            event.top = this.currentResize.originalTop + +resizeEvent.edges.top;
            event.height = this.currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (resizeEvent.edges.bottom) {
            event.height = this.currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    };
    CalendarDayViewEventComponent.prototype.resizeEnded = function (dayEvent) {
        var segments;
        if (this.currentResize.edge === 'top') {
            segments = (dayEvent.top - this.currentResize.originalTop) / this.eventSnapSize;
        }
        else {
            segments = (dayEvent.height - this.currentResize.originalHeight) / this.eventSnapSize;
        }
        dayEvent.top = this.currentResize.originalTop;
        dayEvent.height = this.currentResize.originalHeight;
        var segmentAmountInMinutes = 60 / this.hourSegments;
        var minutesMoved = segments * segmentAmountInMinutes;
        var newStart = dayEvent.event.start;
        var newEnd = dayEvent.event.end;
        if (this.currentResize.edge === 'top') {
            newStart = __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default()(newStart, minutesMoved);
        }
        else if (newEnd) {
            newEnd = __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default()(newEnd, minutesMoved);
        }
        this.eventResized.emit({ newStart: newStart, newEnd: newEnd, event: dayEvent.event });
        this.currentResize = null;
    };
    CalendarDayViewEventComponent.prototype.dragStart = function (event) {
        var _this = this;
        var dragHelper = new __WEBPACK_IMPORTED_MODULE_2__providers_calendarDragHelper_provider__["a" /* CalendarDragHelper */](this.dayViewContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y;
            return !_this.currentResize && dragHelper.validateDrag({ x: x, y: y });
        };
        this.cdr.markForCheck();
    };
    CalendarDayViewEventComponent.prototype.eventDragged = function (dayEvent, draggedInPixels) {
        var segments = draggedInPixels / this.eventSnapSize;
        var segmentAmountInMinutes = 60 / this.hourSegments;
        var minutesMoved = segments * segmentAmountInMinutes;
        var newStart = __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default()(dayEvent.event.start, minutesMoved);
        var newEnd;
        if (dayEvent.event.end) {
            newEnd = __WEBPACK_IMPORTED_MODULE_1_date_fns_add_minutes___default()(dayEvent.event.end, minutesMoved);
        }
        this.eventResized.emit({ newStart: newStart, newEnd: newEnd, event: dayEvent.event });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarDayViewEventComponent.prototype, "dayEvent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewEventComponent.prototype, "hourSegments", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarDayViewEventComponent.prototype, "eventSnapSize", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarDayViewEventComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', HTMLElement)
    ], CalendarDayViewEventComponent.prototype, "dayViewContainer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarDayViewEventComponent.prototype, "eventClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarDayViewEventComponent.prototype, "eventResized", void 0);
    CalendarDayViewEventComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-day-view-event',
            template: "\n    <div\n      class=\"cal-event\"\n      #event\n      [style.marginTop.px]=\"dayEvent.top\"\n      [style.marginLeft.px]=\"dayEvent.left + 70\"\n      [style.height.px]=\"dayEvent.height\"\n      [style.width.px]=\"dayEvent.width - 1\"\n      [style.backgroundColor]=\"dayEvent.event.color.secondary\"\n      [style.borderColor]=\"dayEvent.event.color.primary\"\n      [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n      [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n      [class.cal-draggable]=\"dayEvent.event.draggable\"\n      [ngClass]=\"dayEvent.event.cssClass\"\n      [mwlCalendarTooltip]=\"dayEvent.event.title | calendarEventTitle:'dayTooltip':dayEvent.event\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      mwlResizable\n      [resizeEdges]=\"{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}\"\n      [resizeSnapGrid]=\"{top: eventSnapSize, bottom: eventSnapSize}\"\n      [validateResize]=\"validateResize\"\n      (resizeStart)=\"resizeStarted(dayEvent, $event)\"\n      (resizing)=\"resizing(dayEvent, $event)\"\n      (resizeEnd)=\"resizeEnded(dayEvent)\"\n      mwlDraggable\n      [dragAxis]=\"{x: false, y: dayEvent.event.draggable && !currentResize}\"\n      [dragSnapGrid]=\"{y: eventSnapSize}\"\n      [validateDrag]=\"validateDrag\"\n      (dragStart)=\"dragStart(event)\"\n      (dragEnd)=\"eventDragged(dayEvent, $event.y)\">\n      <mwl-calendar-event-title\n        [event]=\"dayEvent.event\"\n        view=\"day\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n      <mwl-calendar-event-actions [event]=\"dayEvent.event\"></mwl-calendar-event-actions>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], CalendarDayViewEventComponent);
    return CalendarDayViewEventComponent;
}());


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDayViewHourSegmentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarDayViewHourSegmentComponent = (function () {
    function CalendarDayViewHourSegmentComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarDayViewHourSegmentComponent.prototype, "segment", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarDayViewHourSegmentComponent.prototype, "locale", void 0);
    CalendarDayViewHourSegmentComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-day-view-hour-segment',
            template: "\n    <div class=\"cal-hour-segment\" [ngClass]=\"segment.cssClass\">\n      <div [hidden]=\"!segment.isStart\" class=\"cal-time\">\n        {{ segment.date | calendarDate:'dayViewHour':locale }}\n      </div>\n      &nbsp;\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarDayViewHourSegmentComponent);
    return CalendarDayViewHourSegmentComponent;
}());


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarMonthCellComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarMonthCellComponent = (function () {
    function CalendarMonthCellComponent() {
        this.highlightDay = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.unhighlightDay = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarMonthCellComponent.prototype, "day", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarMonthCellComponent.prototype, "openDay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarMonthCellComponent.prototype, "locale", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarMonthCellComponent.prototype, "unhighlightDay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarMonthCellComponent.prototype, "eventClicked", void 0);
    CalendarMonthCellComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-month-cell',
            template: "\n    <div class=\"cal-cell-top\">\n      <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{ day.badgeTotal }}</span>\n      <span class=\"cal-day-number\">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>\n    </div>\n    <div class=\"cal-events\">\n      <div\n        class=\"cal-event\"\n        *ngFor=\"let event of day.events\"\n        [style.backgroundColor]=\"event.color.primary\"\n        [ngClass]=\"event?.cssClass\"\n        (mouseenter)=\"highlightDay.emit({event: event})\"\n        (mouseleave)=\"unhighlightDay.emit({event: event})\"\n        [mwlCalendarTooltip]=\"event.title | calendarEventTitle:'monthTooltip':event\"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        mwlDraggable\n        [dropData]=\"{event: event}\"\n        [dragAxis]=\"{x: event.draggable, y: event.draggable}\"\n        (click)=\"$event.stopPropagation(); eventClicked.emit({event: event})\">\n      </div>\n    </div>\n  ",
            host: {
                '[class]': '"cal-cell cal-day-cell " + day?.cssClass',
                '[class.cal-past]': 'day.isPast',
                '[class.cal-today]': 'day.isToday',
                '[class.cal-future]': 'day.isFuture',
                '[class.cal-weekend]': 'day.isWeekend',
                '[class.cal-in-month]': 'day.inMonth',
                '[class.cal-out-month]': '!day.inMonth',
                '[class.cal-has-events]': 'day.events.length > 0',
                '[class.cal-open]': 'day === openDay',
                '[style.backgroundColor]': 'day.backgroundColor'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarMonthCellComponent);
    return CalendarMonthCellComponent;
}());


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_calendar_utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_calendar_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_calendar_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_is_same_day__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_is_same_day___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_is_same_day__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_set_date__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns_set_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_date_fns_set_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_set_month__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_set_month___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_date_fns_set_month__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_date_fns_set_year__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_date_fns_set_year___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_date_fns_set_year__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns_get_date__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns_get_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_date_fns_get_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_date_fns_get_month__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_date_fns_get_month___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_date_fns_get_month__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_date_fns_get_year__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_date_fns_get_year___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_date_fns_get_year__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_seconds__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_seconds__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_date_fns_add_seconds__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_date_fns_add_seconds___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_date_fns_add_seconds__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarMonthViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/mwl-calendar-month-view&gt;
 * ```
 */
var CalendarMonthViewComponent = (function () {
    /**
     * @hidden
     */
    function CalendarMonthViewComponent(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate) {
            this.refreshHeader();
        }
        if (changes.viewDate || changes.events) {
            this.refreshBody();
        }
        if (changes.activeDayIsOpen || changes.viewDate || changes.events) {
            this.checkActiveDayIsOpen();
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.toggleDayHighlight = function (event, isHighlighted) {
        this.view.days.forEach(function (day) {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor = event.color.secondary;
            }
            else {
                delete day.backgroundColor;
            }
        });
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.eventDropped = function (day, event) {
        var year = __WEBPACK_IMPORTED_MODULE_9_date_fns_get_year___default()(day.date);
        var month = __WEBPACK_IMPORTED_MODULE_8_date_fns_get_month___default()(day.date);
        var date = __WEBPACK_IMPORTED_MODULE_7_date_fns_get_date___default()(day.date);
        var newStart = __WEBPACK_IMPORTED_MODULE_6_date_fns_set_year___default()(__WEBPACK_IMPORTED_MODULE_5_date_fns_set_month___default()(__WEBPACK_IMPORTED_MODULE_4_date_fns_set_date___default()(event.start, date), month), year);
        var newEnd;
        if (event.end) {
            var secondsDiff = __WEBPACK_IMPORTED_MODULE_10_date_fns_difference_in_seconds___default()(newStart, event.start);
            newEnd = __WEBPACK_IMPORTED_MODULE_11_date_fns_add_seconds___default()(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event: event, newStart: newStart, newEnd: newEnd });
    };
    CalendarMonthViewComponent.prototype.refreshHeader = function () {
        this.columnHeaders = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_calendar_utils__["getWeekViewHeader"])({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarMonthViewComponent.prototype.refreshBody = function () {
        var _this = this;
        this.view = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_calendar_utils__["getMonthView"])({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
        if (this.dayModifier) {
            this.view.days.forEach(function (day) { return _this.dayModifier(day); });
        }
    };
    CalendarMonthViewComponent.prototype.checkActiveDayIsOpen = function () {
        var _this = this;
        if (this.activeDayIsOpen === true) {
            this.openDay = this.view.days.find(function (day) { return __WEBPACK_IMPORTED_MODULE_3_date_fns_is_same_day___default()(day.date, _this.viewDate); });
            var index = this.view.days.indexOf(this.openDay);
            this.openRowIndex = Math.floor(index / 7) * 7;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    };
    CalendarMonthViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.checkActiveDayIsOpen();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Date)
    ], CalendarMonthViewComponent.prototype, "viewDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], CalendarMonthViewComponent.prototype, "events", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], CalendarMonthViewComponent.prototype, "activeDayIsOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Function)
    ], CalendarMonthViewComponent.prototype, "dayModifier", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"])
    ], CalendarMonthViewComponent.prototype, "refresh", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarMonthViewComponent.prototype, "locale", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarMonthViewComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarMonthViewComponent.prototype, "weekStartsOn", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarMonthViewComponent.prototype, "dayClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarMonthViewComponent.prototype, "eventClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarMonthViewComponent.prototype, "eventTimesChanged", void 0);
    CalendarMonthViewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-month-view',
            template: "\n    <div class=\"cal-month-view\">\n      <div class=\"cal-cell-row cal-header\">\n        <div class=\"cal-cell\" *ngFor=\"let header of columnHeaders\">\n          {{ header.date | calendarDate:'monthViewColumnHeader':locale }}\n        </div>\n      </div>\n      <div class=\"cal-days\">\n        <div *ngFor=\"let rowIndex of view.rowOffsets\">\n          <div class=\"cal-cell-row\">\n            <mwl-calendar-month-cell\n              *ngFor=\"let day of view.days | slice : rowIndex : rowIndex + 7\"\n              [class.cal-drag-over]=\"day.dragOver\"\n              [day]=\"day\"\n              [openDay]=\"openDay\"\n              [locale]=\"locale\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              (click)=\"dayClicked.emit({day: day})\"\n              (highlightDay)=\"toggleDayHighlight($event.event, true)\"\n              (unhighlightDay)=\"toggleDayHighlight($event.event, false)\"\n              mwlDroppable\n              (dragEnter)=\"day.dragOver = true\"\n              (dragLeave)=\"day.dragOver = false\"\n              (drop)=\"day.dragOver = false; eventDropped(day, $event.dropData.event)\"\n              (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n            </mwl-calendar-month-cell>\n          </div>\n          <mwl-calendar-open-day-events\n            [isOpen]=\"openRowIndex === rowIndex\"\n            [events]=\"openDay?.events\"\n            (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n          </mwl-calendar-open-day-events>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"])), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], String])
    ], CalendarMonthViewComponent);
    return CalendarMonthViewComponent;
}());


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarOpenDayEventsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarOpenDayEventsComponent = (function () {
    function CalendarOpenDayEventsComponent() {
        this.isOpen = false;
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], CalendarOpenDayEventsComponent.prototype, "isOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], CalendarOpenDayEventsComponent.prototype, "events", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarOpenDayEventsComponent.prototype, "eventClicked", void 0);
    CalendarOpenDayEventsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-open-day-events',
            template: "\n    <div class=\"cal-open-day-events\" [@collapse] *ngIf=\"isOpen\">\n      <div\n        *ngFor=\"let event of events\"\n        [ngClass]=\"event?.cssClass\"\n        mwlDraggable\n        [dropData]=\"{event: event}\"\n        [dragAxis]=\"{x: event.draggable, y: event.draggable}\">\n        <span\n          class=\"cal-event\"\n          [style.backgroundColor]=\"event.color.primary\">\n        </span>\n        <mwl-calendar-event-title\n          [event]=\"event\"\n          view=\"month\"\n          (click)=\"eventClicked.emit({event: event})\">\n        </mwl-calendar-event-title>\n        <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n      </div>\n    </div>\n  ",
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('collapse', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ height: 0 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('150ms linear', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ height: '*' }))
                    ]),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => void', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ height: '*' }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('150ms linear', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ height: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarOpenDayEventsComponent);
    return CalendarOpenDayEventsComponent;
}());


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_calendar_utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_calendar_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_calendar_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_add_days__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_add_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_add_days__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_calendarDragHelper_provider__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_calendarResizeHelper_provider__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarWeekViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






/**
 * Shows all events on a given week. Example usage:
 *
 * ```
 * &lt;mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/mwl-calendar-week-view&gt;
 * ```
 */
var CalendarWeekViewComponent = (function () {
    /**
     * @hidden
     */
    function CalendarWeekViewComponent(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'bottom';
        /**
         * Called when a header week day is clicked
         */
        this.dayClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * @hidden
         */
        this.eventRows = [];
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate) {
            this.refreshHeader();
        }
        if (changes.events || changes.viewDate) {
            this.refreshBody();
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.resizeStarted = function (weekViewContainer, weekEvent, resizeEvent) {
        this.currentResize = {
            originalOffset: weekEvent.offset,
            originalSpan: weekEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        };
        var resizeHelper = new __WEBPACK_IMPORTED_MODULE_5__providers_calendarResizeHelper_provider__["a" /* CalendarResizeHelper */](weekViewContainer, this.getDayColumnWidth(weekViewContainer));
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.resizing = function (weekEvent, resizeEvent, dayWidth) {
        if (resizeEvent.edges.left) {
            var diff = Math.round(+resizeEvent.edges.left / dayWidth);
            weekEvent.offset = this.currentResize.originalOffset + diff;
            weekEvent.span = this.currentResize.originalSpan - diff;
        }
        else if (resizeEvent.edges.right) {
            var diff = Math.round(+resizeEvent.edges.right / dayWidth);
            weekEvent.span = this.currentResize.originalSpan + diff;
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.resizeEnded = function (weekEvent) {
        var daysDiff;
        if (this.currentResize.edge === 'left') {
            daysDiff = weekEvent.offset - this.currentResize.originalOffset;
        }
        else {
            daysDiff = weekEvent.span - this.currentResize.originalSpan;
        }
        weekEvent.offset = this.currentResize.originalOffset;
        weekEvent.span = this.currentResize.originalSpan;
        var newStart = weekEvent.event.start;
        var newEnd = weekEvent.event.end;
        if (this.currentResize.edge === 'left') {
            newStart = __WEBPACK_IMPORTED_MODULE_3_date_fns_add_days___default()(newStart, daysDiff);
        }
        else if (newEnd) {
            newEnd = __WEBPACK_IMPORTED_MODULE_3_date_fns_add_days___default()(newEnd, daysDiff);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
        this.currentResize = null;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.eventDragged = function (weekEvent, draggedByPx, dayWidth) {
        var daysDragged = draggedByPx / dayWidth;
        var newStart = __WEBPACK_IMPORTED_MODULE_3_date_fns_add_days___default()(weekEvent.event.start, daysDragged);
        var newEnd;
        if (weekEvent.event.end) {
            newEnd = __WEBPACK_IMPORTED_MODULE_3_date_fns_add_days___default()(weekEvent.event.end, daysDragged);
        }
        this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.getDayColumnWidth = function (eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / 7);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragStart = function (weekViewContainer, event) {
        var _this = this;
        var dragHelper = new __WEBPACK_IMPORTED_MODULE_4__providers_calendarDragHelper_provider__["a" /* CalendarDragHelper */](weekViewContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y;
            return !_this.currentResize && dragHelper.validateDrag({ x: x, y: y });
        };
        this.cdr.markForCheck();
    };
    CalendarWeekViewComponent.prototype.refreshHeader = function () {
        this.days = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_calendar_utils__["getWeekViewHeader"])({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarWeekViewComponent.prototype.refreshBody = function () {
        this.eventRows = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_calendar_utils__["getWeekView"])({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarWeekViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Date)
    ], CalendarWeekViewComponent.prototype, "viewDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], CalendarWeekViewComponent.prototype, "events", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"])
    ], CalendarWeekViewComponent.prototype, "refresh", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarWeekViewComponent.prototype, "locale", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarWeekViewComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], CalendarWeekViewComponent.prototype, "weekStartsOn", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarWeekViewComponent.prototype, "dayClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarWeekViewComponent.prototype, "eventClicked", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarWeekViewComponent.prototype, "eventTimesChanged", void 0);
    CalendarWeekViewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-week-view',
            template: "\n    <div class=\"cal-week-view\" #weekViewContainer>\n      <div class=\"cal-day-headers\">\n        <mwl-calendar-week-view-header\n          *ngFor=\"let day of days\"\n          [day]=\"day\"\n          [locale]=\"locale\"\n          (click)=\"dayClicked.emit({date: day.date})\">\n        </mwl-calendar-week-view-header>\n      </div>\n      <div *ngFor=\"let eventRow of eventRows\" #eventRowContainer>\n        <div\n          class=\"cal-event-container\"\n          #event\n          [class.cal-draggable]=\"weekEvent.event.draggable\"\n          *ngFor=\"let weekEvent of eventRow.row\"\n          [style.width]=\"((100 / 7) * weekEvent.span) + '%'\"\n          [style.marginLeft]=\"((100 / 7) * weekEvent.offset) + '%'\"\n          mwlResizable\n          [resizeEdges]=\"{left: weekEvent.event?.resizable?.beforeStart, right: weekEvent.event?.resizable?.afterEnd}\"\n          [resizeSnapGrid]=\"{left: getDayColumnWidth(eventRowContainer), right: getDayColumnWidth(eventRowContainer)}\"\n          [validateResize]=\"validateResize\"\n          (resizeStart)=\"resizeStarted(weekViewContainer, weekEvent, $event)\"\n          (resizing)=\"resizing(weekEvent, $event, getDayColumnWidth(eventRowContainer))\"\n          (resizeEnd)=\"resizeEnded(weekEvent)\"\n          mwlDraggable\n          [dragAxis]=\"{x: weekEvent.event.draggable && !currentResize, y: false}\"\n          [dragSnapGrid]=\"{x: getDayColumnWidth(eventRowContainer)}\"\n          [validateDrag]=\"validateDrag\"\n          (dragStart)=\"dragStart(weekViewContainer, event)\"\n          (dragEnd)=\"eventDragged(weekEvent, $event.x, getDayColumnWidth(eventRowContainer))\">\n          <mwl-calendar-week-view-event\n            [weekEvent]=\"weekEvent\"\n            [tooltipPlacement]=\"tooltipPlacement\"\n            (eventClicked)=\"eventClicked.emit({event: weekEvent.event})\">\n          </mwl-calendar-week-view-event>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"])), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], String])
    ], CalendarWeekViewComponent);
    return CalendarWeekViewComponent;
}());


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarWeekViewEventComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarWeekViewEventComponent = (function () {
    function CalendarWeekViewEventComponent() {
        this.eventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarWeekViewEventComponent.prototype, "weekEvent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarWeekViewEventComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarWeekViewEventComponent.prototype, "eventClicked", void 0);
    CalendarWeekViewEventComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-week-view-event',
            template: "\n    <div\n      class=\"cal-event\"\n      [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n      [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n      [style.backgroundColor]=\"weekEvent.event.color.secondary\"\n      [ngClass]=\"weekEvent.event?.cssClass\"\n      [mwlCalendarTooltip]=\"weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event\"\n      [tooltipPlacement]=\"tooltipPlacement\">\n      <mwl-calendar-event-title\n        [event]=\"weekEvent.event\"\n        view=\"week\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarWeekViewEventComponent);
    return CalendarWeekViewEventComponent;
}());


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarWeekViewHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarWeekViewHeaderComponent = (function () {
    function CalendarWeekViewHeaderComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], CalendarWeekViewHeaderComponent.prototype, "day", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarWeekViewHeaderComponent.prototype, "locale", void 0);
    CalendarWeekViewHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mwl-calendar-week-view-header',
            template: "\n    <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>\n    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>\n  ",
            host: {
                '[class]': '"cal-header"',
                '[class.cal-past]': 'day.isPast',
                '[class.cal-today]': 'day.isToday',
                '[class.cal-future]': 'day.isFuture',
                '[class.cal-weekend]': 'day.isWeekend'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarWeekViewHeaderComponent);
    return CalendarWeekViewHeaderComponent;
}());


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_add_days__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_add_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_add_days__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_add_weeks__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_add_weeks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns_add_weeks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_add_months__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_add_months___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_add_months__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarNextViewDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Change the view date to the next view. For example:
 *
 * ```
 * &lt;button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view"&gt;
 *  Next
 * &lt;/button&gt;
 * ```
 */
var CalendarNextViewDirective = (function () {
    function CalendarNextViewDirective() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * @hidden
     */
    CalendarNextViewDirective.prototype.onClick = function () {
        var addFn = {
            day: __WEBPACK_IMPORTED_MODULE_1_date_fns_add_days___default.a,
            week: __WEBPACK_IMPORTED_MODULE_2_date_fns_add_weeks___default.a,
            month: __WEBPACK_IMPORTED_MODULE_3_date_fns_add_months___default.a
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, 1));
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarNextViewDirective.prototype, "view", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Date)
    ], CalendarNextViewDirective.prototype, "viewDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarNextViewDirective.prototype, "viewDateChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalendarNextViewDirective.prototype, "onClick", null);
    CalendarNextViewDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[mwlCalendarNextView]'
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarNextViewDirective);
    return CalendarNextViewDirective;
}());


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_sub_days__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_sub_days___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_sub_days__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_sub_weeks__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_sub_weeks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns_sub_weeks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_sub_months__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_sub_months___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_fns_sub_months__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPreviousViewDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Change the view date to the previous view. For example:
 *
 * ```
 * &lt;button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view"&gt;
 *  Previous
 * &lt;/button&gt;
 * ```
 */
var CalendarPreviousViewDirective = (function () {
    function CalendarPreviousViewDirective() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * @hidden
     */
    CalendarPreviousViewDirective.prototype.onClick = function () {
        var subFn = {
            day: __WEBPACK_IMPORTED_MODULE_1_date_fns_sub_days___default.a,
            week: __WEBPACK_IMPORTED_MODULE_2_date_fns_sub_weeks___default.a,
            month: __WEBPACK_IMPORTED_MODULE_3_date_fns_sub_months___default.a
        }[this.view];
        this.viewDateChange.emit(subFn(this.viewDate, 1));
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarPreviousViewDirective.prototype, "view", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Date)
    ], CalendarPreviousViewDirective.prototype, "viewDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarPreviousViewDirective.prototype, "viewDateChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalendarPreviousViewDirective.prototype, "onClick", null);
    CalendarPreviousViewDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[mwlCalendarPreviousView]'
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarPreviousViewDirective);
    return CalendarPreviousViewDirective;
}());


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_start_of_today__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_start_of_today___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_start_of_today__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarTodayDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Change the view date to the current day. For example:
 *
 * ```
 * &lt;button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate"&gt;
 *  Today
 * &lt;/button&gt;
 * ```
 */
var CalendarTodayDirective = (function () {
    function CalendarTodayDirective() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * @hidden
     */
    CalendarTodayDirective.prototype.onClick = function () {
        this.viewDateChange.emit(__WEBPACK_IMPORTED_MODULE_1_date_fns_start_of_today___default()());
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Date)
    ], CalendarTodayDirective.prototype, "viewDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CalendarTodayDirective.prototype, "viewDateChange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalendarTodayDirective.prototype, "onClick", null);
    CalendarTodayDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[mwlCalendarToday]'
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarTodayDirective);
    return CalendarTodayDirective;
}());


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_positioning__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarTooltipWindowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CalendarTooltipDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var CalendarTooltipWindowComponent = (function () {
    function CalendarTooltipWindowComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarTooltipWindowComponent.prototype, "contents", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], CalendarTooltipWindowComponent.prototype, "placement", void 0);
    CalendarTooltipWindowComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            styles: ["\n    .cal-tooltip {\n      position: absolute;\n      z-index: 1070;\n      display: block;\n      font-style: normal;\n      font-weight: normal;\n      letter-spacing: normal;\n      line-break: auto;\n      line-height: 1.5;\n      text-align: start;\n      text-decoration: none;\n      text-shadow: none;\n      text-transform: none;\n      white-space: normal;\n      word-break: normal;\n      word-spacing: normal;\n      font-size: 11px;\n      word-wrap: break-word;\n      opacity: 0.9;\n    }\n\n    .cal-tooltip.cal-tooltip-top {\n      padding: 5px 0;\n      margin-top: -3px;\n    }\n\n    .cal-tooltip.cal-tooltip-top .cal-tooltip-arrow {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 5px 5px 0;\n      border-top-color: #000;\n    }\n\n    .cal-tooltip.cal-tooltip-right {\n      padding: 0 5px;\n      margin-left: 3px;\n    }\n\n    .cal-tooltip.cal-tooltip-right .cal-tooltip-arrow {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000;\n    }\n\n    .cal-tooltip.cal-tooltip-bottom {\n      padding: 5px 0;\n      margin-top: 3px;\n    }\n\n    .cal-tooltip.cal-tooltip-bottom .cal-tooltip-arrow {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 0 5px 5px;\n      border-bottom-color: #000;\n    }\n\n    .cal-tooltip.cal-tooltip-left {\n      padding: 0 5px;\n      margin-left: -3px;\n    }\n\n    .cal-tooltip.cal-tooltip-left .cal-tooltip-arrow {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000;\n    }\n\n    .cal-tooltip-inner {\n      max-width: 200px;\n      padding: 3px 8px;\n      color: #fff;\n      text-align: center;\n      background-color: #000;\n      border-radius: 0.25rem;\n    }\n\n    .cal-tooltip-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-color: transparent;\n      border-style: solid;\n    }\n  "],
            template: "\n    <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n      <div class=\"cal-tooltip-arrow\"></div>\n      <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarTooltipWindowComponent);
    return CalendarTooltipWindowComponent;
}());
var CalendarTooltipDirective = (function () {
    function CalendarTooltipDirective(elementRef, renderer, injector, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
        ) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        this.placement = 'top'; // tslint:disable-line no-input-rename
        this.positioning = new __WEBPACK_IMPORTED_MODULE_2_positioning__["a" /* Positioning */]();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    CalendarTooltipDirective.prototype.ngAfterViewChecked = function () {
        this.positionPopover();
    };
    CalendarTooltipDirective.prototype.ngOnDestroy = function () {
        this.hide();
    };
    CalendarTooltipDirective.prototype.onMouseOver = function () {
        this.show();
    };
    CalendarTooltipDirective.prototype.onMouseOut = function () {
        this.hide();
    };
    CalendarTooltipDirective.prototype.show = function () {
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.placement = this.placement;
            this.renderer.invokeElementMethod(this.document.body, 'appendChild', [this.tooltipRef.location.nativeElement]);
        }
    };
    CalendarTooltipDirective.prototype.hide = function () {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
    };
    CalendarTooltipDirective.prototype.positionPopover = function () {
        if (this.tooltipRef) {
            var targetPosition = this.positioning.positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, true);
            var targetStyle = this.tooltipRef.location.nativeElement.children[0].style;
            targetStyle.top = targetPosition.top + "px";
            targetStyle.left = targetPosition.left + "px";
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('mwlCalendarTooltip'), 
        __metadata('design:type', String)
    ], CalendarTooltipDirective.prototype, "contents", void 0);
    __decorate([
        // tslint:disable-line no-input-rename
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tooltipPlacement'), 
        __metadata('design:type', String)
    ], CalendarTooltipDirective.prototype, "placement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalendarTooltipDirective.prototype, "onMouseOver", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalendarTooltipDirective.prototype, "onMouseOut", null);
    CalendarTooltipDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[mwlCalendarTooltip]'
        }),
        __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DOCUMENT"])), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], Object])
    ], CalendarTooltipDirective);
    return CalendarTooltipDirective;
}());


/***/ }),
/* 29 */
/***/ (function(module, exports) {



/***/ }),
/* 30 */
/***/ (function(module, exports) {



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_calendarDateFormatter_provider__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDatePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
var CalendarDatePipe = (function () {
    function CalendarDatePipe(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    CalendarDatePipe.prototype.transform = function (date, method, locale) {
        if (locale === void 0) { locale = this.locale; }
        return this.dateFormatter[method]({ date: date, locale: locale });
    };
    CalendarDatePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'calendarDate'
        }),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"])), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__providers_calendarDateFormatter_provider__["a" /* CalendarDateFormatter */], String])
    ], CalendarDatePipe);
    return CalendarDatePipe;
}());


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_calendarEventTitleFormatter_provider__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarEventTitlePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CalendarEventTitlePipe = (function () {
    function CalendarEventTitlePipe(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    CalendarEventTitlePipe.prototype.transform = function (title, titleType, event) {
        return this.calendarEventTitle[titleType](event);
    };
    CalendarEventTitlePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'calendarEventTitle'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__providers_calendarEventTitleFormatter_provider__["a" /* CalendarEventTitleFormatter */]])
    ], CalendarEventTitlePipe);
    return CalendarEventTitlePipe;
}());


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MOMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CalendarMomentDateFormatter; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var MOMENT = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Moment');
/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import * as moment from 'moment';
 *
 * // in your component
 * provide: [{
 *   provide: MOMENT, useValue: moment
 * }, {
 *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
 * }]
 *
 * ```
 */
var CalendarMomentDateFormatter = (function () {
    /**
     * @hidden
     */
    function CalendarMomentDateFormatter(moment) {
        this.moment = moment;
    }
    /**
     * The month view header week day labels
     */
    CalendarMomentDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('dddd');
    };
    /**
     * The month view cell day number
     */
    CalendarMomentDateFormatter.prototype.monthViewDayNumber = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('D');
    };
    /**
     * The month view title
     */
    CalendarMomentDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('MMMM YYYY');
    };
    /**
     * The week view header week day labels
     */
    CalendarMomentDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('dddd');
    };
    /**
     * The week view sub header day and month labels
     */
    CalendarMomentDateFormatter.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('D MMM');
    };
    /**
     * The week view title
     */
    CalendarMomentDateFormatter.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('[Week] W [of] YYYY');
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    CalendarMomentDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('ha');
    };
    /**
     * The day view title
     */
    CalendarMomentDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('dddd, D MMMM, YYYY');
    };
    CalendarMomentDateFormatter = __decorate([
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(MOMENT)), 
        __metadata('design:paramtypes', [Object])
    ], CalendarMomentDateFormatter);
    return CalendarMomentDateFormatter;
}());


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Positioning; });
/* unused harmony export positionElements */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
var Positioning = (function () {
    function Positioning() {
    }
    Positioning.prototype.getStyle = function (element, prop) { return window.getComputedStyle(element)[prop]; };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    };
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            var offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    };
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        var elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    };
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        var shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        var shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
            bottom: hostElPosition.top + hostElPosition.height
        };
        var targetElBCR = targetElement.getBoundingClientRect();
        var placementPrimary = placement.split('-')[0] || 'top';
        var placementSecondary = placement.split('-')[1] || 'center';
        var targetElPosition = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: 0,
            bottom: targetElBCR.height || targetElement.offsetHeight,
            left: 0,
            right: targetElBCR.width || targetElement.offsetWidth
        };
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top = hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.bottom += hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'bottom':
                targetElPosition.top = shiftHeight[placementPrimary];
                targetElPosition.bottom += shiftHeight[placementPrimary];
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'left':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = hostElPosition.left - targetElement.offsetWidth;
                targetElPosition.right += hostElPosition.left - targetElement.offsetWidth;
                break;
            case 'right':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = shiftWidth[placementPrimary];
                targetElPosition.right += shiftWidth[placementPrimary];
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    };
    return Positioning;
}());
var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody) {
    var pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = pos.top + "px";
    targetElement.style.left = pos.left + "px";
}
//# sourceMappingURL=positioning.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_35__;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_37__;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_41__;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_42__;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_43__;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_45__;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_46__;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_47__;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_49__;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_52__;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_53__;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_54__;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_55__;

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_angular_calendar_scss__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_angular_calendar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_angular_calendar_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(10);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__index__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__index__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-calendar.js.map