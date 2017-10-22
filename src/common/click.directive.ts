import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[mwlClick]'
})
export class ClickDirective implements OnInit, OnDestroy {
  @Output('mwlClick') click: EventEmitter<MouseEvent> = new EventEmitter(); // tslint:disable-line

  private removeListener: () => void;

  constructor(private renderer: Renderer2, private elm: ElementRef) {}

  ngOnInit(): void {
    const eventName: string =
      typeof window['Hammer'] !== 'undefined' ? 'tap' : 'click';
    this.removeListener = this.renderer.listen(
      this.elm.nativeElement,
      eventName,
      event => {
        this.click.next(event);
      }
    );
  }

  ngOnDestroy(): void {
    this.removeListener();
  }
}
