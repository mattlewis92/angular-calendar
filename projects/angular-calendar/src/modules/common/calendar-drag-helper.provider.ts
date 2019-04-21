import { isInside } from './util';
import { ValidateDragParams } from 'angular-draggable-droppable';

const DRAG_THRESHOLD = 1;

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
    transform
  }: {
    x: number;
    y: number;
    snapDraggedEvents: boolean;
    dragAlreadyMoved: boolean;
    transform: ValidateDragParams['transform'];
  }): boolean {
    const isWithinThreshold =
      Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;

    if (snapDraggedEvents) {
      const newRect: ClientRect = Object.assign({}, this.startPosition, {
        left: this.startPosition.left + transform.x,
        right: this.startPosition.right + transform.x,
        top: this.startPosition.top + transform.y,
        bottom: this.startPosition.bottom + transform.y
      });

      return (
        (isWithinThreshold || dragAlreadyMoved) &&
        isInside(this.dragContainerElement.getBoundingClientRect(), newRect)
      );
    } else {
      return isWithinThreshold || dragAlreadyMoved;
    }
  }
}
