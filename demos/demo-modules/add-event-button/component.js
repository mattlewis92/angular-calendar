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
var date_fns_1 = require("date-fns");
var Subject_1 = require("rxjs/Subject");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
var DemoComponent = (function () {
    function DemoComponent(modal) {
        var _this = this;
        this.modal = modal;
        this.view = 'month';
        this.labelButton = 'add event';
        this.viewDate = new Date();
        this.actions = [{
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                }
            }, {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                    _this.handleEvent('Deleted', event);
                }
            }];
        this.refresh = new Subject_1.Subject();
        this.events = [{
                start: date_fns_1.subDays(date_fns_1.startOfDay(new Date()), 1),
                end: date_fns_1.addDays(new Date(), 1),
                title: 'A 3 day event',
                color: colors.red,
                actions: this.actions
            }, {
                start: date_fns_1.startOfDay(new Date()),
                title: 'An event with no end date',
                color: colors.yellow,
                actions: this.actions
            }, {
                start: date_fns_1.subDays(date_fns_1.endOfMonth(new Date()), 3),
                end: date_fns_1.addDays(date_fns_1.endOfMonth(new Date()), 3),
                title: 'A long event that spans 2 months',
                color: colors.blue
            }, {
                start: date_fns_1.addHours(date_fns_1.startOfDay(new Date()), 2),
                end: new Date(),
                title: 'A draggable and resizable event',
                color: colors.yellow,
                actions: this.actions,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            }];
        this.activeDayIsOpen = true;
    }
    DemoComponent.prototype.increment = function () {
        var addFn = {
            day: date_fns_1.addDays,
            week: date_fns_1.addWeeks,
            month: date_fns_1.addMonths
        }[this.view];
        this.viewDate = addFn(this.viewDate, 1);
    };
    DemoComponent.prototype.decrement = function () {
        var subFn = {
            day: date_fns_1.subDays,
            week: date_fns_1.subWeeks,
            month: date_fns_1.subMonths
        }[this.view];
        this.viewDate = subFn(this.viewDate, 1);
    };
    DemoComponent.prototype.today = function () {
        this.viewDate = new Date();
    };
    DemoComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    DemoComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    DemoComponent.prototype.handleEvent = function (action, event) {
        this.modalData = { event: event, action: action };
        this.modal.open(this.modalContent, { size: 'lg' });
    };
    DemoComponent.prototype.customAddEvent = function (action, day) {
        this.events.push({
            title: 'New event from button',
            start: date_fns_1.startOfDay(new Date(day.date)),
            end: date_fns_1.endOfDay(new Date(day.date)),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
        //console.log(day);
    };
    DemoComponent.prototype.addEvent = function () {
        this.events.push({
            title: 'New event',
            start: date_fns_1.startOfDay(new Date()),
            end: date_fns_1.endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    };
    return DemoComponent;
}());
__decorate([
    core_1.ViewChild('modalContent'),
    __metadata("design:type", core_1.TemplateRef)
], DemoComponent.prototype, "modalContent", void 0);
DemoComponent = __decorate([
    core_1.Component({
        selector: 'mwl-demo-component',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styleUrls: ['styles.css'],
        templateUrl: 'template.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
], DemoComponent);
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=component.js.map