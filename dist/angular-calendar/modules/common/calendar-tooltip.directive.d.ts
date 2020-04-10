import { OnDestroy, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Renderer2, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { PlacementArray } from 'positioning';
import { CalendarEvent } from 'calendar-utils';
export declare class CalendarTooltipWindowComponent {
    contents: string;
    placement: string;
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
}
export declare class CalendarTooltipDirective implements OnDestroy, OnChanges {
    private elementRef;
    private injector;
    private renderer;
    private viewContainerRef;
    private document;
    contents: string;
    placement: PlacementArray;
    customTemplate: TemplateRef<any>;
    event: CalendarEvent;
    appendToBody: boolean;
    delay: number | null;
    private tooltipFactory;
    private tooltipRef;
    private cancelTooltipDelay$;
    constructor(elementRef: ElementRef, injector: Injector, renderer: Renderer2, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, document: any);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onMouseOver(): void;
    onMouseOut(): void;
    private show;
    private hide;
    private positionTooltip;
}
