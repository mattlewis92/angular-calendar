import { isInside } from './util';

export class CalendarDragHelper {
  private readonly startPosition: ClientRect;

  constructor(
    private dragContainerElement: HTMLElement,
    draggableElement: HTMLElement
  ) {
    this.startPosition = draggableElement.getBoundingClientRect();
  }

  validateDrag({ x, y }: { x: number; y: number }): boolean {
    const newRect: ClientRect = Object.assign({}, this.startPosition, {
      left: this.startPosition.left + x,
      right: this.startPosition.right + x,
      top: this.startPosition.top + y,
      bottom: this.startPosition.bottom + y
    });

    return isInside(this.dragContainerElement.getBoundingClientRect(), newRect);
  }
}
