import { DragMoveEvent } from 'angular-draggable-droppable';

export default class CalendarDayAutoScroll {
  private event: HTMLElement;

  dragStart(event: any) {
    this.event = event;
  }

  dragMove(dragMoveEvent: DragMoveEvent) {
    var boundingContext = this.event.getBoundingClientRect();
    var eventElemHeight = boundingContext.height;
    const eventElementBottom = boundingContext.bottom + dragMoveEvent.y;
    const eventElementTop = eventElementBottom - eventElemHeight;

    if (eventElementTop < 90) window.scroll(0, window.scrollY - 7);
    else if (window.innerHeight - 20 < eventElementBottom)
      window.scroll(0, window.scrollY + 7);
  }
}
