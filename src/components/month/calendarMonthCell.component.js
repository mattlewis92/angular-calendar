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
var core_1 = require("@angular/core");
var CalendarMonthCellComponent = (function () {
    function CalendarMonthCellComponent() {
        this.highlightDay = new core_1.EventEmitter();
        this.unhighlightDay = new core_1.EventEmitter();
        this.eventClicked = new core_1.EventEmitter();
        this.inn = false;
        this.addEventClicked = new core_1.EventEmitter();
        this.addEventTextBtn = "";
    }
    return CalendarMonthCellComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CalendarMonthCellComponent.prototype, "day", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CalendarMonthCellComponent.prototype, "openDay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CalendarMonthCellComponent.prototype, "locale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthCellComponent.prototype, "unhighlightDay", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthCellComponent.prototype, "eventClicked", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CalendarMonthCellComponent.prototype, "inn", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CalendarMonthCellComponent.prototype, "addEventClicked", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CalendarMonthCellComponent.prototype, "addEventTextBtn", void 0);
CalendarMonthCellComponent = __decorate([
    core_1.Component({
        selector: 'mwl-calendar-month-cell',
        template: "\n  <div (mouseleave)=\"inn=false\" (mouseenter)=\"inn=true\">\n    <div class=\"cal-cell-top\" >\n      <span *ngIf=\"inn && addEventTextBtn\">\n        <button type=\"button\" class=\"btn btn-default btn-xs\" (click)=\"$event.stopPropagation(); addEventClicked.emit({day: day})\">\n          <i class=\"fa fa-plus\"></i> {{addEventTextBtn}}\n        </button>\n      </span>\n\n      <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{ day.badgeTotal }}</span>\n      <span class=\"cal-day-number\">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>\n    </div>\n    <div class=\"cal-events\">\n      <div\n        class=\"cal-event\"\n        *ngFor=\"let event of day.events\"\n        [style.backgroundColor]=\"event.color.primary\"\n        [ngClass]=\"event?.cssClass\"\n        (mouseenter)=\"highlightDay.emit({event: event})\"\n        (mouseleave)=\"unhighlightDay.emit({event: event})\"\n        [mwlCalendarTooltip]=\"event.title | calendarEventTitle:'monthTooltip':event\"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        mwlDraggable\n        [dropData]=\"{event: event}\"\n        [dragAxis]=\"{x: event.draggable, y: event.draggable}\"\n        (click)=\"$event.stopPropagation(); eventClicked.emit({event: event})\">\n      </div>\n    </div>\n    </div>\n  ",
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
    __metadata("design:paramtypes", [])
], CalendarMonthCellComponent);
exports.CalendarMonthCellComponent = CalendarMonthCellComponent;
//# sourceMappingURL=calendarMonthCell.component.js.map