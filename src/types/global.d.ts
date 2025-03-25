import type { LenisRef } from 'lenis/react';

interface Navigation extends EventTarget {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opera?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha?: any;
    lenis?: LenisRef | null;
    navigation?: Navigation;
  }
}
