import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export var CalendarEventActions = (function () {
    function CalendarEventActions() {
    }
    CalendarEventActions.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-event-actions',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n      <a\n        class=\"cal-event-action\"\n        href=\"javascript:;\"\n        *ngFor=\"let action of event.actions\"\n        (click)=\"action.onClick({event: event})\"\n        [ngClass]=\"action.cssClass\"\n        [innerHtml]=\"action.label\">\n      </a>\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarEventActions.ctorParameters = [];
    CalendarEventActions.propDecorators = {
        'event': [{ type: Input },],
    };
    return CalendarEventActions;
}());
//# sourceMappingURL=calendarEventActions.component.js.map