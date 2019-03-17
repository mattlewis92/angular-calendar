import { HammerGestureConfig } from '@angular/platform-browser';

declare const Hammer: any;

export class CustomHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let options = {};

    if (element.hasAttribute('data-calendar-clickable')) {
      options = { touchAction: 'pan-y' };
    }

    const mc = new Hammer(element, options);

    // keep default angular config
    mc.get('pinch').set({ enable: true });
    mc.get('rotate').set({ enable: true });

    // retain support for angular overrides object
    Object.keys(this.overrides).forEach(eventName => {
      mc.get(eventName).set(this.overrides[eventName]);
    });

    return mc;
  }
}
