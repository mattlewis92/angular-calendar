import { DragMoveEvent } from 'angular-draggable-droppable';

export default class CalendarDayAutoScroll {
  private event: HTMLElement;

  private scrollContainer: HTMLElement | Window;

  constructor(scrollContainer : HTMLElement | Window){

    console.log("scrollContainer", scrollContainer);

    if(scrollContainer != null){
      this.scrollContainer = scrollContainer;
    }else{
      this.scrollContainer = window;
    }
  }

  dragStart(event: any) {
    this.event = event;

  }

  dragMove(dragMoveEvent: DragMoveEvent) {
    const boundingContext = this.event.getBoundingClientRect();
    const eventElemHeight = boundingContext.height;
    const eventElementBottom = boundingContext.bottom + dragMoveEvent.y;
    const eventElementTop = eventElementBottom - eventElemHeight;

    if (eventElementTop < 90) {
      this.scrollContainer.scroll(0, window.scrollY - 7);
    } else if (window.innerHeight - 20 < eventElementBottom) {
      this.scrollContainer.scroll(0, window.scrollY + 7);
    }
  }
}
