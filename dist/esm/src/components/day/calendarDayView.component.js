import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject } from '@angular/core';
import { getDayView, getDayViewHourGrid } from 'calendar-utils';
var SEGMENT_HEIGHT = 30;
export var CalendarDayView = (function () {
    function CalendarDayView(cdr, locale) {
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
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        this.hours = [];
        this.width = 0;
        this.locale = locale;
    }
    CalendarDayView.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    CalendarDayView.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarDayView.prototype.ngOnChanges = function (changes) {
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
    CalendarDayView.prototype.refreshHourGrid = function () {
        var _this = this;
        this.hours = getDayViewHourGrid({
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
    CalendarDayView.prototype.refreshView = function () {
        this.view = getDayView({
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
    CalendarDayView.prototype.refreshAll = function () {
        this.refreshHourGrid();
        this.refreshView();
    };
    CalendarDayView.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"cal-day-view\">\n      <mwl-calendar-all-day-event\n        *ngFor=\"let event of view.allDayEvents\"\n        [event]=\"event\"\n        (eventClicked)=\"eventClicked.emit({event: event})\">\n      </mwl-calendar-all-day-event>\n      <div class=\"cal-hour-rows\">\n        <div class=\"cal-events\">\n          <mwl-calendar-day-view-event\n            *ngFor=\"let dayEvent of view?.events\"\n            [dayEvent]=\"dayEvent\"\n            (eventClicked)=\"eventClicked.emit({event: dayEvent.event})\">\n          </mwl-calendar-day-view-event>\n        </div>\n        <div class=\"cal-hour\" *ngFor=\"let hour of hours\" [style.minWidth.px]=\"view?.width + 70\">\n          <mwl-calendar-day-view-hour-segment\n            *ngFor=\"let segment of hour.segments\"\n            [segment]=\"segment\"\n            [locale]=\"locale\"\n            (click)=\"hourSegmentClicked.emit({date: segment.date})\">\n          </mwl-calendar-day-view-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarDayView.ctorParameters = [
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
    CalendarDayView.propDecorators = {
        'viewDate': [{ type: Input },],
        'events': [{ type: Input },],
        'hourSegments': [{ type: Input },],
        'dayStartHour': [{ type: Input },],
        'dayStartMinute': [{ type: Input },],
        'dayEndHour': [{ type: Input },],
        'dayEndMinute': [{ type: Input },],
        'eventWidth': [{ type: Input },],
        'refresh': [{ type: Input },],
        'locale': [{ type: Input },],
        'hourSegmentModifier': [{ type: Input },],
        'eventClicked': [{ type: Output },],
        'hourSegmentClicked': [{ type: Output },],
    };
    return CalendarDayView;
}());
//# sourceMappingURL=calendarDayView.component.js.map