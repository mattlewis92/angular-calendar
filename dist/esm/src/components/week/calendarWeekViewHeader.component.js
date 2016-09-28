import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export var CalendarWeekViewHeader = (function () {
    function CalendarWeekViewHeader() {
    }
    CalendarWeekViewHeader.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-week-view-header',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>\n    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>\n  ",
                    host: {
                        '[class]': '"cal-header"',
                        '[class.cal-past]': 'day.isPast',
                        '[class.cal-today]': 'day.isToday',
                        '[class.cal-future]': 'day.isFuture',
                        '[class.cal-weekend]': 'day.isWeekend'
                    }
                },] },
    ];
    /** @nocollapse */
    CalendarWeekViewHeader.ctorParameters = [];
    CalendarWeekViewHeader.propDecorators = {
        'day': [{ type: Input },],
        'locale': [{ type: Input },],
    };
    return CalendarWeekViewHeader;
}());
//# sourceMappingURL=calendarWeekViewHeader.component.js.map