import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export var CalendarEventTitle = (function () {
    function CalendarEventTitle() {
    }
    CalendarEventTitle.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-event-title',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <a\n      class=\"cal-event-title\"\n      href=\"javascript:;\"\n      [innerHTML]=\"event | calendarEventTitle:view\">\n    </a>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarEventTitle.ctorParameters = [];
    CalendarEventTitle.propDecorators = {
        'event': [{ type: Input },],
        'view': [{ type: Input },],
    };
    return CalendarEventTitle;
}());
//# sourceMappingURL=calendarEventTitle.component.js.map