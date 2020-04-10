import { ValidateDragParams } from 'angular-draggable-droppable';
export declare class CalendarDragHelper {
    private dragContainerElement;
    private readonly startPosition;
    constructor(dragContainerElement: HTMLElement, draggableElement: HTMLElement);
    validateDrag({ x, y, snapDraggedEvents, dragAlreadyMoved, transform, }: {
        x: number;
        y: number;
        snapDraggedEvents: boolean;
        dragAlreadyMoved: boolean;
        transform: ValidateDragParams['transform'];
    }): boolean;
}
