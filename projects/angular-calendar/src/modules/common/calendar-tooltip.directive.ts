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
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PlacementArray, positionElements } from 'positioning';
import { CalendarEvent } from 'calendar-utils';
import { Observable, of, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mwl-calendar-tooltip-window',
  template: `
    <ng-template
      #defaultTemplate
      let-contents="contents"
      let-placement="placement"
      let-event="event"
    >
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
      }"
    >
    </ng-template>
  `,
})
export class CalendarTooltipWindowComponent {
  @Input() contents: string;

  @Input() placement: string;

  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;
}

@Directive({
  selector: '[mwlCalendarTooltip]',
})
export class CalendarTooltipDirective implements OnDestroy, OnChanges {
  @Input('mwlCalendarTooltip') contents: string; // eslint-disable-line  @angular-eslint/no-input-rename

  @Input('tooltipPlacement') placement: PlacementArray = 'auto'; // eslint-disable-line  @angular-eslint/no-input-rename

  @Input('tooltipTemplate') customTemplate: TemplateRef<any>; // eslint-disable-line  @angular-eslint/no-input-rename

  @Input('tooltipEvent') event: CalendarEvent; // eslint-disable-line  @angular-eslint/no-input-rename

  @Input('tooltipAppendToBody') appendToBody: boolean; // eslint-disable-line  @angular-eslint/no-input-rename

  @Input('tooltipDelay') delay: number | null = null; // eslint-disable-line  @angular-eslint/no-input-rename

  private tooltipFactory: ComponentFactory<CalendarTooltipWindowComponent>;
  private tooltipRef: ComponentRef<CalendarTooltipWindowComponent>;
  private cancelTooltipDelay$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2,
    componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document // eslint-disable-line
  ) {
    this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(
      CalendarTooltipWindowComponent
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.tooltipRef &&
      (changes.contents || changes.customTemplate || changes.event)
    ) {
      this.tooltipRef.instance.contents = this.contents;
      this.tooltipRef.instance.customTemplate = this.customTemplate;
      this.tooltipRef.instance.event = this.event;
      this.tooltipRef.changeDetectorRef.markForCheck();

      if (!this.contents) {
        this.hide();
      }
    }
  }

  ngOnDestroy(): void {
    this.hide();
  }

  @HostListener('mouseenter')
  onMouseOver(): void {
    const delay$: Observable<any> =
      this.delay === null ? of('now') : timer(this.delay);
    delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe(() => {
      this.show();
    });
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
    this.cancelTooltipDelay$.next();
  }

  private positionTooltip(previousPositions: string[] = []): void {
    if (this.tooltipRef) {
      this.tooltipRef.changeDetectorRef.detectChanges();
      this.tooltipRef.instance.placement = positionElements(
        this.elementRef.nativeElement,
        this.tooltipRef.location.nativeElement.children[0],
        this.placement,
        this.appendToBody
      );
      // keep re-positioning the tooltip until the arrow position doesn't make a difference
      if (
        previousPositions.indexOf(this.tooltipRef.instance.placement) === -1
      ) {
        this.positionTooltip([
          ...previousPositions,
          this.tooltipRef.instance.placement,
        ]);
      }
    }
  }
}
