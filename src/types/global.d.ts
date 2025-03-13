import type { LenisRef } from 'lenis/react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opera?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha?: any;
    lenis?: LenisRef;
  }
}
