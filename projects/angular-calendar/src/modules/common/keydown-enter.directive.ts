import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[mwlKeydownEnter]',
})
export class KeydownEnterDirective implements OnInit, OnDestroy {
  @Output('mwlKeydownEnter') keydown = new EventEmitter<KeyboardEvent>(); // eslint-disable-line

  private keydownListener: VoidFunction | null = null;

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.keydownListener = this.renderer.listen(
        this.host.nativeElement,
        'keydown',
        (event: KeyboardEvent) => {
          if (
            event.keyCode === 13 ||
            event.which === 13 ||
            event.key === 'Enter'
          ) {
            event.preventDefault();
            event.stopPropagation();

            this.ngZone.run(() => {
              this.keydown.emit(event);
            });
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.keydownListener !== null) {
      this.keydownListener();
      this.keydownListener = null;
    }
  }
}
