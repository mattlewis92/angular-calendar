export declare class CalendarResizeHelper {
    private resizeContainerElement;
    private minWidth?;
    constructor(resizeContainerElement: HTMLElement, minWidth?: number);
    validateResize({ rectangle }: {
        rectangle: ClientRect;
    }): boolean;
}
