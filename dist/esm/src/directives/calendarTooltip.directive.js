import { Directive, Component, HostListener, ChangeDetectionStrategy, Input, Renderer, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Positioning } from '@ng-bootstrap/ng-bootstrap/util/positioning';
export var CalendarTooltipWindow = (function () {
    function CalendarTooltipWindow() {
    }
    CalendarTooltipWindow.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    .cal-tooltip {\n      position: absolute;\n      z-index: 1070;\n      display: block;\n      font-style: normal;\n      font-weight: normal;\n      letter-spacing: normal;\n      line-break: auto;\n      line-height: 1.5;\n      text-align: start;\n      text-decoration: none;\n      text-shadow: none;\n      text-transform: none;\n      white-space: normal;\n      word-break: normal;\n      word-spacing: normal;\n      font-size: 11px;\n      word-wrap: break-word;\n      opacity: 0.9;\n    }\n\n    .cal-tooltip.cal-tooltip-top {\n      padding: 5px 0;\n      margin-top: -3px;\n    }\n\n    .cal-tooltip.cal-tooltip-top .cal-tooltip-arrow {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 5px 5px 0;\n      border-top-color: #000;\n    }\n\n    .cal-tooltip.cal-tooltip-right {\n      padding: 0 5px;\n      margin-left: 3px;\n    }\n\n    .cal-tooltip.cal-tooltip-right .cal-tooltip-arrow {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000;\n    }\n\n    .cal-tooltip.cal-tooltip-bottom {\n      padding: 5px 0;\n      margin-top: 3px;\n    }\n\n    .cal-tooltip.cal-tooltip-bottom .cal-tooltip-arrow {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 0 5px 5px;\n      border-bottom-color: #000;\n    }\n\n    .cal-tooltip.cal-tooltip-left {\n      padding: 0 5px;\n      margin-left: -3px;\n    }\n\n    .cal-tooltip.cal-tooltip-left .cal-tooltip-arrow {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000;\n    }\n\n    .cal-tooltip-inner {\n      max-width: 200px;\n      padding: 3px 8px;\n      color: #fff;\n      text-align: center;\n      background-color: #000;\n      border-radius: 0.25rem;\n    }\n\n    .cal-tooltip-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-color: transparent;\n      border-style: solid;\n    }\n  "],
                    template: "\n    <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n      <div class=\"cal-tooltip-arrow\"></div>\n      <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarTooltipWindow.ctorParameters = [];
    CalendarTooltipWindow.propDecorators = {
        'contents': [{ type: Input },],
        'placement': [{ type: Input },],
    };
    return CalendarTooltipWindow;
}());
export var CalendarTooltip = (function () {
    function CalendarTooltip(elementRef, renderer, injector, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
        ) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        this.placement = 'top';
        this.positioning = new Positioning();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindow);
    }
    CalendarTooltip.prototype.ngAfterViewChecked = function () {
        this.positionPopover();
    };
    CalendarTooltip.prototype.ngOnDestroy = function () {
        this.hide();
    };
    CalendarTooltip.prototype.onMouseOver = function () {
        this.show();
    };
    CalendarTooltip.prototype.onMouseOut = function () {
        this.hide();
    };
    CalendarTooltip.prototype.show = function () {
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.placement = this.placement;
            this.renderer.invokeElementMethod(this.document.body, 'appendChild', [this.tooltipRef.location.nativeElement]);
        }
    };
    CalendarTooltip.prototype.hide = function () {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
    };
    CalendarTooltip.prototype.positionPopover = function () {
        if (this.tooltipRef) {
            var targetPosition = this.positioning.positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, true);
            var targetStyle = this.tooltipRef.location.nativeElement.children[0].style;
            targetStyle.top = targetPosition.top + "px";
            targetStyle.left = targetPosition.left + "px";
        }
    };
    CalendarTooltip.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarTooltip]'
                },] },
    ];
    /** @nocollapse */
    CalendarTooltip.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
        { type: Injector, },
        { type: ComponentFactoryResolver, },
        { type: ViewContainerRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ];
    CalendarTooltip.propDecorators = {
        'contents': [{ type: Input, args: ['mwlCalendarTooltip',] },],
        'placement': [{ type: Input, args: ['tooltipPlacement',] },],
        'onMouseOver': [{ type: HostListener, args: ['mouseenter',] },],
        'onMouseOut': [{ type: HostListener, args: ['mouseleave',] },],
    };
    return CalendarTooltip;
}());
//# sourceMappingURL=calendarTooltip.directive.js.map