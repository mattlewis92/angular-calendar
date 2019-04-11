import { Observable } from 'rxjs';

const isSupported =
  typeof window !== 'undefined' &&
  typeof window['requestIdleCallback'] !== 'undefined';

export function requestIdleCallbackObservable() {
  return new Observable(observer => {
    /* istanbul ignore else  */
    if (isSupported) {
      const id = window['requestIdleCallback'](() => {
        observer.next();
        observer.complete();
      });
      return () => {
        window['cancelIdleCallback'](id);
      };
    } else {
      const timeoutId = setTimeout(() => {
        observer.next();
        observer.complete();
      }, 1);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  });
}
