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
  NgZone
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { requestIdleCallbackObservable } from './request-idle-callback';
import { switchMapTo, takeUntil } from 'rxjs/operators';

const keydownElements = new Set<HTMLElement>();

const eventName = 'keydown.enter';

@Directive({
  selector: '[mwlKeydown]'
})
export class KeydownDirective implements OnInit, OnDestroy {
  @Input() keydownListenerDisabled = false;

  @Output('mwlKeydown') keydown = new EventEmitter<KeyboardEvent>(); // tslint:disable-line

  private destroy$ = new Subject();

  constructor(
    private renderer: Renderer2,
    private elm: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    if (!this.keydownListenerDisabled) {
      this.renderer.setAttribute(
        this.elm.nativeElement,
        'data-calendar-keyable',
        'true'
      );
      keydownElements.add(this.elm.nativeElement);

      requestIdleCallbackObservable()
        .pipe(
          switchMapTo(this.listen()),
          takeUntil(this.destroy$)
        )
        .subscribe(event => {
          // prevent default override of the enter key
          if (
            event.keyCode === 13 ||
            event.which === 13 ||
            event.key === 'Enter'
          ) {
            event.preventDefault();
          }
          // prevent child click events from firing on parent elements that also have click events
          let nearestClickableParent = event.target as HTMLElement;
          while (
            !keydownElements.has(nearestClickableParent) &&
            nearestClickableParent !== this.document.body
          ) {
            nearestClickableParent = nearestClickableParent.parentElement;
          }
          const isThisClickableElement =
            this.elm.nativeElement === nearestClickableParent;
          if (isThisClickableElement) {
            this.zone.run(() => {
              if (
                event.keyCode === 13 ||
                event.which === 13 ||
                event.key === 'Enter'
              ) {
                this.keydown.next(event);
              }
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    keydownElements.delete(this.elm.nativeElement);
  }

  private listen() {
    return new Observable<KeyboardEvent>(observer => {
      return this.renderer.listen(this.elm.nativeElement, eventName, event => {
        observer.next(event);
      });
    });
  }
}
