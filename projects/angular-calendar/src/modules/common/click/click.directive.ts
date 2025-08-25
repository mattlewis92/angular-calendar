import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  NgZone,
  DOCUMENT,
  inject,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[mwlClick]',
  standalone: false,
})
export class ClickDirective implements OnInit, OnDestroy {
  @Input() clickListenerDisabled = false;

  @Output('mwlClick') click = new EventEmitter<MouseEvent>(); // eslint-disable-line

  private destroy$ = new Subject<void>();

  private renderer = inject(Renderer2);

  private elm = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    if (!this.clickListenerDisabled) {
      this.listen()
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          event.stopPropagation();
          this.click.emit(event);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private listen() {
    return new Observable<MouseEvent>((observer) => {
      return this.renderer.listen(this.elm.nativeElement, 'click', (event) => {
        observer.next(event);
      });
    });
  }
}
