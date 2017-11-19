import { isInside } from './util';

export class CalendarResizeHelper {
  constructor(
    private resizeContainerElement: HTMLElement,
    private minWidth?: number
  ) {}

  validateResize({ rectangle }: { rectangle: ClientRect }): boolean {
    if (this.minWidth && rectangle.width < this.minWidth) {
      return false;
    }

    return isInside(
      this.resizeContainerElement.getBoundingClientRect(),
      rectangle
    );
  }
}
