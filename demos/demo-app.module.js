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
require("bootstrap/dist/css/bootstrap.css");
require("font-awesome/css/font-awesome.css");
require("highlight.js/styles/github.css");
require("../scss/angular-calendar.scss");
require("intl");
require("intl/locale-data/jsonp/en");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var hljs = require("highlight.js");
var angular_highlight_js_1 = require("angular-highlight-js");
var demo_app_component_1 = require("./demo-app.component");
var kitchenSink = require("./demo-modules/kitchen-sink");
var asyncEvents = require("./demo-modules/async-events");
var addEventButton = require("./demo-modules/add-event-button");
var optionalEventEndDates = require("./demo-modules/optional-event-end-dates");
var editableDeletableEvents = require("./demo-modules/editable-deletable-events");
var draggableEvents = require("./demo-modules/draggable-events");
var resizableEvents = require("./demo-modules/resizable-events");
var monthViewBadgeTotal = require("./demo-modules/month-view-badge-total");
var recurringEvents = require("./demo-modules/recurring-events");
var customEventClass = require("./demo-modules/custom-event-class");
var clickableEvents = require("./demo-modules/clickable-events");
var dayClick = require("./demo-modules/day-click");
var dayViewStartEnd = require("./demo-modules/day-view-start-end");
var dayViewHourSplit = require("./demo-modules/day-view-hour-split");
var navigatingBetweenViews = require("./demo-modules/navigating-between-views");
var dayModifier = require("./demo-modules/day-modifier");
var i18n = require("./demo-modules/i18n");
var draggableExternalEvents = require("./demo-modules/draggable-external-events");
var allDayEvents = require("./demo-modules/all-day-events");
var customiseDateFormats = require("./demo-modules/customise-date-formats");
var showDatesOnTitles = require("./demo-modules/show-dates-on-titles");
var disableTooltips = require("./demo-modules/disable-tooltips");
var additionalEventProperties = require("./demo-modules/additional-event-properties");
var selectableMonthDay = require("./demo-modules/selectable-month-day");
var minMaxDate = require("./demo-modules/min-max-date");
var DemoAppModule = (function () {
    function DemoAppModule() {
    }
    return DemoAppModule;
}());
DemoAppModule = __decorate([
    core_1.NgModule({
        declarations: [demo_app_component_1.DemoAppComponent],
        imports: [
            platform_browser_1.BrowserModule,
            angular_highlight_js_1.HighlightJsModule.forRoot(hljs),
            kitchenSink.DemoModule,
            addEventButton.DemoModule,
            asyncEvents.DemoModule,
            optionalEventEndDates.DemoModule,
            editableDeletableEvents.DemoModule,
            draggableEvents.DemoModule,
            resizableEvents.DemoModule,
            monthViewBadgeTotal.DemoModule,
            recurringEvents.DemoModule,
            customEventClass.DemoModule,
            clickableEvents.DemoModule,
            dayClick.DemoModule,
            dayViewStartEnd.DemoModule,
            dayViewHourSplit.DemoModule,
            navigatingBetweenViews.DemoModule,
            dayModifier.DemoModule,
            i18n.DemoModule,
            draggableExternalEvents.DemoModule,
            allDayEvents.DemoModule,
            customiseDateFormats.DemoModule,
            showDatesOnTitles.DemoModule,
            disableTooltips.DemoModule,
            additionalEventProperties.DemoModule,
            selectableMonthDay.DemoModule,
            minMaxDate.DemoModule,
            router_1.RouterModule.forRoot([{
                    path: 'kitchen-sink',
                    component: kitchenSink.DemoComponent,
                    data: {
                        label: 'Kitchen sink'
                    }
                }, {
                    path: 'add-event-button',
                    component: addEventButton.DemoComponent,
                    data: {
                        label: 'Add event Button in (mouseenter) month day '
                    }
                }, {
                    path: 'async-events',
                    component: asyncEvents.DemoComponent,
                    data: {
                        label: 'Async events'
                    }
                }, {
                    path: 'optional-event-end-dates',
                    component: optionalEventEndDates.DemoComponent,
                    data: {
                        label: 'Optional event end dates'
                    }
                }, {
                    path: 'editable-deletable-events',
                    component: editableDeletableEvents.DemoComponent,
                    data: {
                        label: 'Editable / deletable events'
                    }
                }, {
                    path: 'draggable-events',
                    component: draggableEvents.DemoComponent,
                    data: {
                        label: 'Draggable events'
                    }
                }, {
                    path: 'resizable-events',
                    component: resizableEvents.DemoComponent,
                    data: {
                        label: 'Resizable events'
                    }
                }, {
                    path: 'month-view-badge-total',
                    component: monthViewBadgeTotal.DemoComponent,
                    data: {
                        label: 'Month view badge total'
                    }
                }, {
                    path: 'recurring-events',
                    component: recurringEvents.DemoComponent,
                    data: {
                        label: 'Recurring events'
                    }
                }, {
                    path: 'custom-event-class',
                    component: customEventClass.DemoComponent,
                    data: {
                        label: 'Custom event class'
                    }
                }, {
                    path: 'clickable-events',
                    component: clickableEvents.DemoComponent,
                    data: {
                        label: 'Clickable events'
                    }
                }, {
                    path: 'clickable-days',
                    component: dayClick.DemoComponent,
                    data: {
                        label: 'Clickable days'
                    }
                }, {
                    path: 'day-view-start-end',
                    component: dayViewStartEnd.DemoComponent,
                    data: {
                        label: 'Day view start / end time'
                    }
                }, {
                    path: 'day-view-hour-split',
                    component: dayViewHourSplit.DemoComponent,
                    data: {
                        label: 'Day view hour split'
                    }
                }, {
                    path: 'navigating-between-views',
                    component: navigatingBetweenViews.DemoComponent,
                    data: {
                        label: 'Navigating between views'
                    }
                }, {
                    path: 'day-modifier',
                    component: dayModifier.DemoComponent,
                    data: {
                        label: 'Day modifier'
                    }
                }, {
                    path: 'i18n',
                    component: i18n.DemoComponent,
                    data: {
                        label: 'Internationalisation'
                    }
                }, {
                    path: 'draggable-external-events',
                    component: draggableExternalEvents.DemoComponent,
                    data: {
                        label: 'Draggable external events'
                    }
                }, {
                    path: 'all-day-events',
                    component: allDayEvents.DemoComponent,
                    data: {
                        label: 'All day events'
                    }
                }, {
                    path: 'customise-date-formats',
                    component: customiseDateFormats.DemoComponent,
                    data: {
                        label: 'Customise date formats'
                    }
                }, {
                    path: 'show-dates-on-titles',
                    component: showDatesOnTitles.DemoComponent,
                    data: {
                        label: 'Show dates on title'
                    }
                }, {
                    path: 'disable-tooltips',
                    component: disableTooltips.DemoComponent,
                    data: {
                        label: 'Disable tooltips'
                    }
                }, {
                    path: 'additional-event-properties',
                    component: additionalEventProperties.DemoComponent,
                    data: {
                        label: 'Additional event properties'
                    }
                }, {
                    path: 'selectable-month-day',
                    component: selectableMonthDay.DemoComponent,
                    data: {
                        label: 'Selectable month day'
                    }
                }, {
                    path: 'min-max-date',
                    component: minMaxDate.DemoComponent,
                    data: {
                        label: 'Min max date'
                    }
                }, {
                    path: '**',
                    redirectTo: 'kitchen-sink'
                }], {
                useHash: true
            })
        ],
        bootstrap: [demo_app_component_1.DemoAppComponent]
    }),
    __metadata("design:paramtypes", [])
], DemoAppModule);
exports.DemoAppModule = DemoAppModule;
//# sourceMappingURL=demo-app.module.js.map