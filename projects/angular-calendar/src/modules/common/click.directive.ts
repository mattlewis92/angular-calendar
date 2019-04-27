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

const clickElements = new Set<HTMLElement>();

const eventName: string =
  typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
    ? 'tap'
    : 'click';

@Directive({
  selector: '[mwlClick]'
})
export class ClickDirective implements OnInit, OnDestroy {
  @Input() clickListenerDisabled = false;

  @Output('mwlClick') click = new EventEmitter<MouseEvent>(); // tslint:disable-line

  private destroy$ = new Subject();

  constructor(
    private renderer: Renderer2,
    private elm: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    if (!this.clickListenerDisabled) {
      this.renderer.setAttribute(
        this.elm.nativeElement,
        'data-calendar-clickable',
        'true'
      );
      clickElements.add(this.elm.nativeElement);

      // issue #942 - lazily initialise all click handlers after initial render as hammerjs is slow
      requestIdleCallbackObservable()
        .pipe(
          switchMapTo(this.listen()),
          takeUntil(this.destroy$)
        )
        .subscribe(event => {
          // prevent child click events from firing on parent elements that also have click events
          let nearestClickableParent = event.target as HTMLElement;
          while (
            !clickElements.has(nearestClickableParent) &&
            nearestClickableParent !== this.document.body
          ) {
            nearestClickableParent = nearestClickableParent.parentElement;
          }
          const isThisClickableElement =
            this.elm.nativeElement === nearestClickableParent;
          if (isThisClickableElement) {
            this.zone.run(() => {
              this.click.next(event);
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    clickElements.delete(this.elm.nativeElement);
  }

  private listen() {
    return new Observable<MouseEvent>(observer => {
      return this.renderer.listen(this.elm.nativeElement, eventName, event => {
        observer.next(event);
      });
    });
  }
}
