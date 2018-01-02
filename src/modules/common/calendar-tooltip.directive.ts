import {
  Directive,
  Component,
  HostListener,
  OnDestroy,
  Input,
  ComponentRef,
  Injector,
  ComponentFactoryResolver,
  ViewContainerRef,
  ElementRef,
  ComponentFactory,
  Inject,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Positioning } from 'positioning';
import { CalendarEvent } from 'calendar-utils';

@Component({
  template: `
    <ng-template
      #defaultTemplate
      let-contents="contents"
      let-placement="placement"
      let-event="event">
      <div class="cal-tooltip" [ngClass]="'cal-tooltip-' + placement">
        <div class="cal-tooltip-arrow"></div>
        <div class="cal-tooltip-inner" [innerHtml]="contents"></div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        contents: contents,
        placement: placement,
        event: event
      }">
    </ng-template>
  `
})
export class CalendarTooltipWindowComponent {
  @Input() contents: string;

  @Input() placement: string;

  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;
}

@Directive({
  selector: '[mwlCalendarTooltip]'
})
export class CalendarTooltipDirective implements OnDestroy {
  @Input('mwlCalendarTooltip') contents: string; // tslint:disable-line no-input-rename

  @Input('tooltipPlacement') placement: string = 'top'; // tslint:disable-line no-input-rename

  @Input('tooltipTemplate') customTemplate: TemplateRef<any>; // tslint:disable-line no-input-rename

  @Input('tooltipEvent') event: CalendarEvent; // tslint:disable-line no-input-rename

  @Input('tooltipAppendToBody') appendToBody: boolean; // tslint:disable-line no-input-rename

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
    this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(
      CalendarTooltipWindowComponent
    );
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
      this.tooltipRef = this.viewContainerRef.createComponent(
        this.tooltipFactory,
        0,
        this.injector,
        []
      );
      this.tooltipRef.instance.contents = this.contents;
      this.tooltipRef.instance.placement = this.placement;
      this.tooltipRef.instance.customTemplate = this.customTemplate;
      this.tooltipRef.instance.event = this.event;
      if (this.appendToBody) {
        this.document.body.appendChild(this.tooltipRef.location.nativeElement);
      }
      requestAnimationFrame(() => {
        this.positionTooltip();
      });
    }
  }

  private hide(): void {
    if (this.tooltipRef) {
      this.viewContainerRef.remove(
        this.viewContainerRef.indexOf(this.tooltipRef.hostView)
      );
      this.tooltipRef = null;
    }
  }

  private positionTooltip(): void {
    if (this.tooltipRef) {
      const targetPosition: ClientRect = this.positioning.positionElements(
        this.elementRef.nativeElement,
        this.tooltipRef.location.nativeElement.children[0],
        this.placement,
        this.appendToBody
      );

      const elm: HTMLElement = this.tooltipRef.location.nativeElement
        .children[0];

      this.renderer.setStyle(elm, 'top', `${targetPosition.top}px`);
      this.renderer.setStyle(elm, 'left', `${targetPosition.left}px`);
    }
  }
}
