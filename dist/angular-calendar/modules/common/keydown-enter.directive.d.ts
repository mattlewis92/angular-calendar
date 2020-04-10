import { EventEmitter } from '@angular/core';
export declare class KeydownEnterDirective {
    keydown: EventEmitter<KeyboardEvent>;
    onKeyPress(event: KeyboardEvent): void;
}
