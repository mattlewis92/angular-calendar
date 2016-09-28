import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export var CalendarDayViewHourSegment = (function () {
    function CalendarDayViewHourSegment() {
    }
    CalendarDayViewHourSegment.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view-hour-segment',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"cal-hour-segment\" [ngClass]=\"segment.cssClass\">\n      <div [hidden]=\"!segment.isStart\" class=\"cal-time\">\n        {{ segment.date | calendarDate:'dayViewHour':locale }}\n      </div>\n      &nbsp;\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarDayViewHourSegment.ctorParameters = [];
    CalendarDayViewHourSegment.propDecorators = {
        'segment': [{ type: Input },],
        'locale': [{ type: Input },],
    };
    return CalendarDayViewHourSegment;
}());
//# sourceMappingURL=calendarDayViewHourSegment.component.js.map