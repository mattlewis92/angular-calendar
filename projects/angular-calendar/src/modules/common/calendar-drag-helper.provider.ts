import { isInside } from './util';

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
    dragAlreadyMoved
  }: {
    x: number;
    y: number;
    snapDraggedEvents: boolean;
    dragAlreadyMoved: boolean;
  }): boolean {
    const isWithinThreshold =
      Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;

    if (snapDraggedEvents) {
      const newRect: ClientRect = Object.assign({}, this.startPosition, {
        left: this.startPosition.left + x,
        right: this.startPosition.right + x,
        top: this.startPosition.top + y,
        bottom: this.startPosition.bottom + y
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
