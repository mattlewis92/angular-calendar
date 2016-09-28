import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export var CalendarDayViewEvent = (function () {
    function CalendarDayViewEvent() {
        this.eventClicked = new EventEmitter();
    }
    CalendarDayViewEvent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view-event',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      class=\"cal-event\"\n      [style.marginTop.px]=\"dayEvent.top\"\n      [style.marginLeft.px]=\"dayEvent.left + 70\"\n      [style.height.px]=\"dayEvent.height\"\n      [style.width.px]=\"dayEvent.width - 1\"\n      [style.backgroundColor]=\"dayEvent.event.color.secondary\"\n      [style.borderColor]=\"dayEvent.event.color.primary\"\n      [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n      [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n      [ngClass]=\"dayEvent.event.cssClass\">\n      <mwl-calendar-event-title\n        [event]=\"dayEvent.event\"\n        view=\"day\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n      <mwl-calendar-event-actions [event]=\"dayEvent.event\"></mwl-calendar-event-actions>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarDayViewEvent.ctorParameters = [];
    CalendarDayViewEvent.propDecorators = {
        'dayEvent': [{ type: Input },],
        'eventClicked': [{ type: Output },],
    };
    return CalendarDayViewEvent;
}());
//# sourceMappingURL=calendarDayViewEvent.component.js.map