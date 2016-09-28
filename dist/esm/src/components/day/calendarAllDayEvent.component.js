import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export var CalendarAllDayEvent = (function () {
    function CalendarAllDayEvent() {
        this.eventClicked = new EventEmitter();
    }
    CalendarAllDayEvent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-all-day-event',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      class=\"cal-all-day-event\"\n      [style.backgroundColor]=\"event.color.secondary\"\n      [style.borderColor]=\"event.color.primary\">\n      <mwl-calendar-event-title\n        [event]=\"event\"\n        view=\"day\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n      <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarAllDayEvent.ctorParameters = [];
    CalendarAllDayEvent.propDecorators = {
        'event': [{ type: Input },],
        'eventClicked': [{ type: Output },],
    };
    return CalendarAllDayEvent;
}());
//# sourceMappingURL=calendarAllDayEvent.component.js.map