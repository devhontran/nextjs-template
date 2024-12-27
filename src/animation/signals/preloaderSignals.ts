import { signal } from '@preact/signals-react';

// Preloader state management
export const preloaderState = signal<{
  requests: number;
  loadTo: number;
  r3f: {
    requests: number;
    loadTo: number;
  };
}>({
  requests: 0,
  loadTo: 0,
  r3f: {
    requests: 0,
    loadTo: 0,
  },
});

// Asset registration functions
export const registerPreloader = (): void => {
  preloaderState.value.requests += 1;
};

export const unRegisterPreloader = (): void => {
  preloaderState.value.loadTo += 1;
};

// R3F specific registration
export const registerR3fPreloader = (): void => {
  preloaderState.value.r3f.requests += 1;
};

export const unRegisterR3fPreloader = (): void => {
  preloaderState.value.r3f.loadTo += 1;
};

// Reset all preloader states
export const resetPreloader = (): void => {
  preloaderState.value.requests = 0;
  preloaderState.value.loadTo = 0;
  preloaderState.value.r3f.requests = 0;
  preloaderState.value.r3f.loadTo = 0;
};
