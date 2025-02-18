import type Lenis from 'lenis';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opera?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha?: any;
    lenis?: { wrapper?: HTMLElement; content?: HTMLElement; lenis?: Lenis };
  }
}
