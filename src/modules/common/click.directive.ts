import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

const clickElements = new WeakSet<HTMLElement>();

@Directive({
  selector: '[mwlClick]'
})
export class ClickDirective implements OnInit, OnDestroy {
  @Output('mwlClick') click: EventEmitter<MouseEvent> = new EventEmitter(); // tslint:disable-line

  private removeListener: () => void;

  constructor(
    private renderer: Renderer2,
    private elm: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document
  ) {}

  ngOnInit(): void {
    clickElements.add(this.elm.nativeElement);
    const eventName: string =
      typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
        ? 'tap'
        : 'click';
    this.removeListener = this.renderer.listen(
      this.elm.nativeElement,
      eventName,
      event => {
        // prevent child click events from firing on parent elements that also have click events
        let nearestClickableParent: HTMLElement = event.target;
        while (
          !clickElements.has(nearestClickableParent) &&
          nearestClickableParent !== this.document.body
        ) {
          nearestClickableParent = nearestClickableParent.parentElement;
        }
        const isThisClickableElement =
          this.elm.nativeElement === nearestClickableParent;
        if (isThisClickableElement) {
          this.click.next(event);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.removeListener();
    clickElements.delete(this.elm.nativeElement);
  }
}
