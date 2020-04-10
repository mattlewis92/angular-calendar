import { isInside, isWithinThreshold } from './util';
var CalendarDragHelper = /** @class */ (function () {
    function CalendarDragHelper(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    CalendarDragHelper.prototype.validateDrag = function (_a) {
        var x = _a.x, y = _a.y, snapDraggedEvents = _a.snapDraggedEvents, dragAlreadyMoved = _a.dragAlreadyMoved, transform = _a.transform;
        if (snapDraggedEvents) {
            var newRect = Object.assign({}, this.startPosition, {
                left: this.startPosition.left + transform.x,
                right: this.startPosition.right + transform.x,
                top: this.startPosition.top + transform.y,
                bottom: this.startPosition.bottom + transform.y,
            });
            return ((isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved) &&
                isInside(this.dragContainerElement.getBoundingClientRect(), newRect));
        }
        else {
            return isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved;
        }
    };
    return CalendarDragHelper;
}());
export { CalendarDragHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUdyRDtJQUdFLDRCQUNVLG9CQUFpQyxFQUN6QyxnQkFBNkI7UUFEckIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFhO1FBR3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLEVBWVo7WUFYQyxRQUFDLEVBQ0QsUUFBQyxFQUNELHdDQUFpQixFQUNqQixzQ0FBZ0IsRUFDaEIsd0JBQVM7UUFRVCxJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLElBQU0sT0FBTyxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQ0wsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUNyRSxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLElBQUksZ0JBQWdCLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNJbnNpZGUsIGlzV2l0aGluVGhyZXNob2xkIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IFZhbGlkYXRlRHJhZ1BhcmFtcyB9IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRyYWdIZWxwZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0YXJ0UG9zaXRpb246IENsaWVudFJlY3Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkcmFnQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgZHJhZ2dhYmxlRWxlbWVudDogSFRNTEVsZW1lbnRcbiAgKSB7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gZHJhZ2dhYmxlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIHZhbGlkYXRlRHJhZyh7XG4gICAgeCxcbiAgICB5LFxuICAgIHNuYXBEcmFnZ2VkRXZlbnRzLFxuICAgIGRyYWdBbHJlYWR5TW92ZWQsXG4gICAgdHJhbnNmb3JtLFxuICB9OiB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBzbmFwRHJhZ2dlZEV2ZW50czogYm9vbGVhbjtcbiAgICBkcmFnQWxyZWFkeU1vdmVkOiBib29sZWFuO1xuICAgIHRyYW5zZm9ybTogVmFsaWRhdGVEcmFnUGFyYW1zWyd0cmFuc2Zvcm0nXTtcbiAgfSk6IGJvb2xlYW4ge1xuICAgIGlmIChzbmFwRHJhZ2dlZEV2ZW50cykge1xuICAgICAgY29uc3QgbmV3UmVjdDogQ2xpZW50UmVjdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhcnRQb3NpdGlvbiwge1xuICAgICAgICBsZWZ0OiB0aGlzLnN0YXJ0UG9zaXRpb24ubGVmdCArIHRyYW5zZm9ybS54LFxuICAgICAgICByaWdodDogdGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0ICsgdHJhbnNmb3JtLngsXG4gICAgICAgIHRvcDogdGhpcy5zdGFydFBvc2l0aW9uLnRvcCArIHRyYW5zZm9ybS55LFxuICAgICAgICBib3R0b206IHRoaXMuc3RhcnRQb3NpdGlvbi5ib3R0b20gKyB0cmFuc2Zvcm0ueSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAoaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH0pIHx8IGRyYWdBbHJlYWR5TW92ZWQpICYmXG4gICAgICAgIGlzSW5zaWRlKHRoaXMuZHJhZ0NvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIG5ld1JlY3QpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH0pIHx8IGRyYWdBbHJlYWR5TW92ZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=