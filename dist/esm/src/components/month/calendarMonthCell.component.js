import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export var CalendarMonthCell = (function () {
    function CalendarMonthCell() {
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
    }
    CalendarMonthCell.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-month-cell',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"cal-cell-top\">\n      <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{ day.badgeTotal }}</span>\n      <span class=\"cal-day-number\">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>\n    </div>\n    <div class=\"cal-events\">\n      <span\n        class=\"cal-event\"\n        *ngFor=\"let event of day.events\"\n        [style.backgroundColor]=\"event.color.primary\"\n        [ngClass]=\"event?.cssClass\"\n        (mouseenter)=\"highlightDay.emit({event: event})\"\n        (mouseleave)=\"unhighlightDay.emit({event: event})\"\n        [mwlCalendarTooltip]=\"event | calendarEventTitle:'monthTooltip'\"\n        [tooltipPlacement]=\"tooltipPlacement\">\n      </span>\n    </div>\n  ",
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
                },] },
    ];
    /** @nocollapse */
    CalendarMonthCell.ctorParameters = [];
    CalendarMonthCell.propDecorators = {
        'day': [{ type: Input },],
        'openDay': [{ type: Input },],
        'locale': [{ type: Input },],
        'tooltipPlacement': [{ type: Input },],
        'highlightDay': [{ type: Output },],
        'unhighlightDay': [{ type: Output },],
    };
    return CalendarMonthCell;
}());
//# sourceMappingURL=calendarMonthCell.component.js.map