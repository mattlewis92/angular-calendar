import {
  Directive,
  Component,
  HostListener,
  AfterViewChecked,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  ComponentRef,
  Renderer,
  Injector,
  ComponentFactoryResolver,
  ViewContainerRef,
  ElementRef,
  ComponentFactory,
  Inject
} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Positioning} from '@ng-bootstrap/ng-bootstrap/util/positioning';

interface Coords {
  top: number;
  left: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class CalendarTooltipWindow {

  @Input() public contents: string;

  @Input() public placement: string;

}

@Directive({
  selector: '[mwlCalendarTooltip]'
})
export class CalendarTooltip implements AfterViewChecked, OnDestroy {

  @Input('mwlCalendarTooltip') contents: string;

  @Input('tooltipPlacement') placement: string = 'top';

  private tooltipFactory: ComponentFactory<CalendarTooltipWindow>;
  private tooltipRef: ComponentRef<CalendarTooltipWindow>;
  private positioning: Positioning = new Positioning();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private injector: Injector,
    componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document //tslint:disable-line
  ) {
    this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindow);
  }

  ngAfterViewChecked(): void {
    this.positionPopover();
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private show(): void {
    if (!this.tooltipRef && this.contents) {
      this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
      this.tooltipRef.instance.contents = this.contents;
      this.tooltipRef.instance.placement = this.placement;
      this.renderer.invokeElementMethod(this.document.body, 'appendChild', [this.tooltipRef.location.nativeElement]);
    }
  }

  private hide(): void {
    if (this.tooltipRef) {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
      this.tooltipRef = null;
    }
  }

  @HostListener('mouseenter')
  onMouseOver(): void {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseOut(): void {
    this.hide();
  }

  private positionPopover(): void {
    if (this.tooltipRef) {
      const targetPosition: Coords = this.positioning.positionElements(
        this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, true
      );

      const targetStyle: CSSStyleDeclaration = this.tooltipRef.location.nativeElement.children[0].style;
      targetStyle.top = `${targetPosition.top}px`;
      targetStyle.left = `${targetPosition.left}px`;
    }
  }

}