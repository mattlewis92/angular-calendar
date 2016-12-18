import { isInside } from './calendarUtils.provider';

export class CalendarResizeHelper {

  constructor(private resizeContainerElement: HTMLElement, private dayColumnWidth: number) {}

  validateResize({rectangle}: {rectangle: ClientRect}): boolean {
    return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle) && rectangle.width >= this.dayColumnWidth;
  }

}