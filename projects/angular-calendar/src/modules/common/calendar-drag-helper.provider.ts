import { isInsideLeftAndRight, isWithinThreshold } from './util';
import { ValidateDragParams } from 'angular-draggable-droppable';

export class CalendarDragHelper {
  private readonly startPosition: ClientRect;

  constructor(
    private dragContainerElement: HTMLElement,
    draggableElement: HTMLElement
  ) {
    this.startPosition = draggableElement.getBoundingClientRect();
  }

  validateDrag({
    x,
    y,
    snapDraggedEvents,
    dragAlreadyMoved,
    transform,
  }: {
    x: number;
    y: number;
    snapDraggedEvents: boolean;
    dragAlreadyMoved: boolean;
    transform: ValidateDragParams['transform'];
  }): boolean {
    const isDraggedWithinThreshold =
      isWithinThreshold({ x, y }) || dragAlreadyMoved;

    if (snapDraggedEvents) {
      const inner: ClientRect = Object.assign({}, this.startPosition, {
        left: this.startPosition.left + transform.x,
        right: this.startPosition.right + transform.x,
        top: this.startPosition.top + transform.y,
        bottom: this.startPosition.bottom + transform.y,
      });

      if (isDraggedWithinThreshold) {
        const outer = this.dragContainerElement.getBoundingClientRect();

        const isTopInside = outer.top < inner.top && inner.top < outer.bottom;

        const isBottomInside =
          outer.top < inner.bottom && inner.bottom < outer.bottom;

        return (
          isInsideLeftAndRight(outer, inner) && (isTopInside || isBottomInside)
        );
      }

      /* istanbul ignore next */
      return false;
    } else {
      return isDraggedWithinThreshold;
    }
  }
}
