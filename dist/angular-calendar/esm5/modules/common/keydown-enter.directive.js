import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
var KeydownEnterDirective = /** @class */ (function () {
    function KeydownEnterDirective() {
        this.keydown = new EventEmitter(); // tslint:disable-line
    }
    KeydownEnterDirective.prototype.onKeyPress = function (event) {
        if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.keydown.emit(event);
        }
    };
    tslib_1.__decorate([
        Output('mwlKeydownEnter'),
        tslib_1.__metadata("design:type", Object)
    ], KeydownEnterDirective.prototype, "keydown", void 0);
    tslib_1.__decorate([
        HostListener('keydown', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], KeydownEnterDirective.prototype, "onKeyPress", null);
    KeydownEnterDirective = tslib_1.__decorate([
        Directive({
            selector: '[mwlKeydownEnter]',
        })
    ], KeydownEnterDirective);
    return KeydownEnterDirective;
}());
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24va2V5ZG93bi1lbnRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLOUU7SUFIQTtRQUk2QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUMsQ0FBQyxzQkFBc0I7SUFVaEcsQ0FBQztJQVBDLDBDQUFVLEdBQVYsVUFBVyxLQUFvQjtRQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO1lBQ3ZFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBVDBCO1FBQTFCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzs7MERBQTZDO0lBR3ZFO1FBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztpREFDbEIsYUFBYTs7MkRBTTlCO0lBVlUscUJBQXFCO1FBSGpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQztPQUNXLHFCQUFxQixDQVdqQztJQUFELDRCQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xLZXlkb3duRW50ZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgS2V5ZG93bkVudGVyRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgnbXdsS2V5ZG93bkVudGVyJykga2V5ZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LndoaWNoID09PSAxMyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMua2V5ZG93bi5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==