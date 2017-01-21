"use strict";
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
var core_1 = require("@angular/core");
var calendar_utils_1 = require("calendar-utils");
var Subject_1 = require("rxjs/Subject");
var is_same_day_1 = require("date-fns/is_same_day");
var set_date_1 = require("date-fns/set_date");
var set_month_1 = require("date-fns/set_month");
var set_year_1 = require("date-fns/set_year");
var get_date_1 = require("date-fns/get_date");
var get_month_1 = require("date-fns/get_month");
var get_year_1 = require("date-fns/get_year");
var difference_in_seconds_1 = require("date-fns/difference_in_seconds");
var add_seconds_1 = require("date-fns/add_seconds");
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
         * Label for button Add Event: Note, is string empty not show button.
         */
        this.addEventTextBtn = "";
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new core_1.EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
        /**
         * Called when the button add event is clicked: Note, only show button if addEventTextBtn!=""
         */
        this.addEventClicked = new core_1.EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new core_1.EventEmitter();
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
        var year = get_year_1.default(day.date);
        var month = get_month_1.default(day.date);
        var date = get_date_1.default(day.date);
        var newStart = set_year_1.default(set_month_1.default(set_date_1.default(event.start, date), month), year);
        var newEnd;
        if (event.end) {
            var secondsDiff = difference_in_seconds_1.default(newStart, event.start);
            newEnd = add_seconds_1.default(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event: event, newStart: newStart, newEnd: newEnd });
    };
    CalendarMonthViewComponent.prototype.refreshHeader = function () {
        this.columnHeaders = calendar_utils_1.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarMonthViewComponent.prototype.refreshBody = function () {
        var _this = this;
        this.view = calendar_utils_1.getMonthView({
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
            this.openDay = this.view.days.find(function (day) { return is_same_day_1.default(day.date, _this.viewDate); });
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
    return CalendarMonthViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], CalendarMonthViewComponent.prototype, "viewDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CalendarMonthViewComponent.prototype, "events", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CalendarMonthViewComponent.prototype, "activeDayIsOpen", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CalendarMonthViewComponent.prototype, "addEventTextBtn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], CalendarMonthViewComponent.prototype, "dayModifier", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Subject_1.Subject)
], CalendarMonthViewComponent.prototype, "refresh", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CalendarMonthViewComponent.prototype, "locale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CalendarMonthViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CalendarMonthViewComponent.prototype, "weekStartsOn", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthViewComponent.prototype, "dayClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthViewComponent.prototype, "eventClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthViewComponent.prototype, "addEventClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthViewComponent.prototype, "eventTimesChanged", void 0);
CalendarMonthViewComponent = __decorate([
    core_1.Component({
        selector: 'mwl-calendar-month-view',
        template: "\n    <div class=\"cal-month-view\">\n      <div class=\"cal-cell-row cal-header\">\n        <div class=\"cal-cell\" *ngFor=\"let header of columnHeaders\">\n          {{ header.date | calendarDate:'monthViewColumnHeader':locale }}\n        </div>\n      </div>\n      <div class=\"cal-days\">\n        <div *ngFor=\"let rowIndex of view.rowOffsets\">\n          <div class=\"cal-cell-row\">\n            <mwl-calendar-month-cell\n              *ngFor=\"let day of view.days | slice : rowIndex : rowIndex + 7\"\n              [class.cal-drag-over]=\"day.dragOver\"\n              [day]=\"day\"\n              [addEventTextBtn]=\"addEventTextBtn\"\n              [openDay]=\"openDay\"\n              [locale]=\"locale\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              (click)=\"dayClicked.emit({day: day})\"\n              (highlightDay)=\"toggleDayHighlight($event.event, true)\"\n              (unhighlightDay)=\"toggleDayHighlight($event.event, false)\"\n              mwlDroppable\n              (dragEnter)=\"day.dragOver = true\"\n              (dragLeave)=\"day.dragOver = false\"\n              (drop)=\"day.dragOver = false; eventDropped(day, $event.dropData.event)\"\n              (addEventClicked)=\"addEventClicked.emit({day: day})\"\n              (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n            </mwl-calendar-month-cell>\n          </div>\n          <mwl-calendar-open-day-events\n            [isOpen]=\"openRowIndex === rowIndex\"\n            [events]=\"openDay?.events\"\n            (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n          </mwl-calendar-open-day-events>\n        </div>\n      </div>\n    </div>\n  "
    }),
    __param(1, core_1.Inject(core_1.LOCALE_ID)),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, String])
], CalendarMonthViewComponent);
exports.CalendarMonthViewComponent = CalendarMonthViewComponent;
//# sourceMappingURL=calendarMonthView.component.js.map