import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[mwlKeydownEnter]'
})
export class KeydownEnterDirective {
  @Output('mwlKeydownEnter') keydown = new EventEmitter<KeyboardEvent>(); // tslint:disable-line

  @HostListener('keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.keydown.emit(event);
    }
  }
}
