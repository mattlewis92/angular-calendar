import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export var CalendarWeekViewEvent = (function () {
    function CalendarWeekViewEvent() {
        this.eventClicked = new EventEmitter();
    }
    CalendarWeekViewEvent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-week-view-event',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      class=\"cal-event\"\n      [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n      [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n      [style.backgroundColor]=\"weekEvent.event.color.secondary\"\n      [ngClass]=\"weekEvent.event?.cssClass\"\n      [mwlCalendarTooltip]=\"weekEvent.event | calendarEventTitle:'weekTooltip'\"\n      [tooltipPlacement]=\"tooltipPlacement\">\n      <mwl-calendar-event-title\n        [event]=\"weekEvent.event\"\n        view=\"week\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarWeekViewEvent.ctorParameters = [];
    CalendarWeekViewEvent.propDecorators = {
        'weekEvent': [{ type: Input },],
        'tooltipPlacement': [{ type: Input },],
        'eventClicked': [{ type: Output },],
    };
    return CalendarWeekViewEvent;
}());
//# sourceMappingURL=calendarWeekViewEvent.component.js.map