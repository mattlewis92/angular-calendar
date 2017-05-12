import {
  Directive,
  Component,
  HostListener,
  AfterViewChecked,
  OnDestroy,
  Input,
  ComponentRef,
  Injector,
  ComponentFactoryResolver,
  ViewContainerRef,
  ElementRef,
  ComponentFactory,
  Inject,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Positioning } from 'positioning';

@Component({
  styles: [`
    .cal-tooltip {
      position: absolute;
      z-index: 1070;
      display: block;
      font-style: normal;
      font-weight: normal;
      letter-spacing: normal;
      line-break: auto;
      line-height: 1.5;
      text-align: start;
      text-decoration: none;
      text-shadow: none;
      text-transform: none;
      white-space: normal;
      word-break: normal;
      word-spacing: normal;
      font-size: 11px;
      word-wrap: break-word;
      opacity: 0.9;
    }

    .cal-tooltip.cal-tooltip-top {
      padding: 5px 0;
      margin-top: -3px;
    }

    .cal-tooltip.cal-tooltip-top .cal-tooltip-arrow {
      bottom: 0;
      left: 50%;
      margin-left: -5px;
      border-width: 5px 5px 0;
      border-top-color: #000;
    }

    .cal-tooltip.cal-tooltip-right {
      padding: 0 5px;
      margin-left: 3px;
    }

    .cal-tooltip.cal-tooltip-right .cal-tooltip-arrow {
      top: 50%;
      left: 0;
      margin-top: -5px;
      border-width: 5px 5px 5px 0;
      border-right-color: #000;
    }

    .cal-tooltip.cal-tooltip-bottom {
      padding: 5px 0;
      margin-top: 3px;
    }

    .cal-tooltip.cal-tooltip-bottom .cal-tooltip-arrow {
      top: 0;
      left: 50%;
      margin-left: -5px;
      border-width: 0 5px 5px;
      border-bottom-color: #000;
    }

    .cal-tooltip.cal-tooltip-left {
      padding: 0 5px;
      margin-left: -3px;
    }

    .cal-tooltip.cal-tooltip-left .cal-tooltip-arrow {
      top: 50%;
      right: 0;
      margin-top: -5px;
      border-width: 5px 0 5px 5px;
      border-left-color: #000;
    }

    .cal-tooltip-inner {
      max-width: 200px;
      padding: 3px 8px;
      color: #fff;
      text-align: center;
      background-color: #000;
      border-radius: 0.25rem;
    }

    .cal-tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }
  `],
  template: `
    <div class="cal-tooltip" [ngClass]="'cal-tooltip-' + placement">
      <div class="cal-tooltip-arrow"></div>
      <div class="cal-tooltip-inner" [innerHtml]="contents"></div>
    </div>
  `
})
export class CalendarTooltipWindowComponent {

  @Input() contents: string;

  @Input() placement: string;

}

@Directive({
  selector: '[mwlCalendarTooltip]'
})
export class CalendarTooltipDirective implements AfterViewChecked, OnDestroy {

  @Input('mwlCalendarTooltip') contents: string; // tslint:disable-line no-input-rename

  @Input('tooltipPlacement') placement: string = 'top'; // tslint:disable-line no-input-rename

  private tooltipFactory: ComponentFactory<CalendarTooltipWindowComponent>;
  private tooltipRef: ComponentRef<CalendarTooltipWindowComponent>;
  private positioning: Positioning = new Positioning();

  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2,
    componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document //tslint:disable-line
  ) {
    this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
  }

  ngAfterViewChecked(): void {
    // setTimeout is a fix for https://github.com/mattlewis92/angular-calendar/issues/196
    setTimeout(() => {
      this.positionTooltip();
    });
  }

  ngOnDestroy(): void {
    this.hide();
  }

  @HostListener('mouseenter')
  onMouseOver(): void {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseOut(): void {
    this.hide();
  }

  private show(): void {
    if (!this.tooltipRef && this.contents) {
      this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
      this.tooltipRef.instance.contents = this.contents;
      this.tooltipRef.instance.placement = this.placement;
      this.document.body.appendChild(this.tooltipRef.location.nativeElement);
    }
  }

  private hide(): void {
    if (this.tooltipRef) {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
      this.tooltipRef = null;
    }
  }

  private positionTooltip(): void {
    if (this.tooltipRef) {
      const targetPosition: ClientRect = this.positioning.positionElements(
        this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, true
      );

      const elm: HTMLElement = this.tooltipRef.location.nativeElement.children[0];

      this.renderer.setStyle(elm, 'top', `${targetPosition.top}px`);
      this.renderer.setStyle(elm, 'left', `${targetPosition.left}px`);
    }
  }

}