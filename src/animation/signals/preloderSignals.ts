import { signal } from '@preact/signals-react';

// Preloader state management
export const preloaderState = {
  requests: signal<number>(0),
  loadTo: signal<number>(0),
  r3f: {
    requests: signal<number>(0),
    loadTo: signal<number>(0),
  },
};

// Asset registration functions
export const registerPreloader = (): void => {
  preloaderState.requests.value += 1;
};

export const unRegisterPreloader = (): void => {
  preloaderState.loadTo.value += 1;
};

// R3F specific registration
export const registerR3fPreloader = (): void => {
  preloaderState.r3f.requests.value += 1;
};

export const unRegisterR3fPreloader = (): void => {
  preloaderState.r3f.loadTo.value += 1;
};

// Reset all preloader states
export const resetPreloader = (): void => {
  preloaderState.requests.value = 0;
  preloaderState.loadTo.value = 0;
  preloaderState.r3f.requests.value = 0;
  preloaderState.r3f.loadTo.value = 0;
};
