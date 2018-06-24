import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

const clickElements = new WeakSet<HTMLElement>();

@Directive({
  selector: '[mwlClick]'
})
export class ClickDirective implements OnInit, OnDestroy {
  @Output('mwlClick') click: EventEmitter<MouseEvent> = new EventEmitter(); // tslint:disable-line

  private removeListener: () => void;

  constructor(
    private renderer: Renderer2,
    private elm: ElementRef<HTMLElement>
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
        const isClickableElement = clickElements.has(event.target);
        const isThisClickableElement = this.elm.nativeElement === event.target;
        if (!isClickableElement || isThisClickableElement) {
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
