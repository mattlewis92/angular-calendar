function isInside(outer: ClientRect, inner: ClientRect): boolean {
  return outer.left <= inner.left &&
    inner.left <= outer.right &&
    outer.left <= inner.right &&
    inner.right <= outer.right &&
    outer.top <= inner.top &&
    inner.top <= outer.bottom &&
    outer.top <= inner.bottom &&
    inner.bottom <= outer.bottom;
}

export class CalendarDragHelper {

  startPosition: ClientRect;

  constructor(private dragContainerElement: HTMLElement, draggableElement: HTMLElement) {
    this.startPosition = draggableElement.getBoundingClientRect();
  }

  validateDrag({x, y}: {x: number, y: number}): boolean {

    const newRect: ClientRect = Object.assign({}, this.startPosition, {
      left: this.startPosition.left + x,
      right: this.startPosition.right + x,
      top: this.startPosition.top + y,
      bottom: this.startPosition.bottom + y
    });

    return isInside(this.dragContainerElement.getBoundingClientRect(), newRect);

  }

}