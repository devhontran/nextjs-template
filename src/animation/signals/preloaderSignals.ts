import { signal } from '@preact/signals-react';

export const preloaderState_requests = signal(0);
export const preloaderState_loadTo = signal(0);
export const preloaderState_r3f_requests = signal(0);
export const preloaderState_r3f_loadTo = signal(0);

// Asset registration functions
export const registerPreloader = (): void => {
  preloaderState_requests.value += 1;
};

export const unRegisterPreloader = (): void => {
  preloaderState_loadTo.value += 1;
};

// R3F specific registration
export const registerR3fPreloader = (): void => {
  preloaderState_r3f_requests.value += 1;
};

export const unRegisterR3fPreloader = (): void => {
  preloaderState_r3f_loadTo.value += 1;
};

// Reset all preloader states
export const resetPreloader = (): void => {
  // console.log('____resetPreloader');
  preloaderState_requests.value = 0;
  preloaderState_loadTo.value = 0;
  preloaderState_r3f_requests.value = 0;
  preloaderState_r3f_loadTo.value = 0;
};
