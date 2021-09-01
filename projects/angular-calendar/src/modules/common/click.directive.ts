import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  Input,
  NgZone,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[mwlClick]',
})
export class ClickDirective implements OnInit, OnDestroy {
  @Input() clickListenerDisabled = false;

  @Output('mwlClick') click = new EventEmitter<MouseEvent>(); // eslint-disable-line

  private destroy$ = new Subject<void>();

  constructor(
    private renderer: Renderer2,
    private elm: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document
  ) {}

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
