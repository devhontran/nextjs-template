import { ReadonlySignal } from '@preact/signals-core';
import { signal, useComputed } from '@preact/signals-react';

export const requests = signal<number>(0);
export const loadTo = signal<number>(0);

export function registerPreloader(): void {
  requests.value += 1;
  // console.log('____register');
}

export function unRegisterPreloader(): void {
  loadTo.value += 1;
  // console.log('____unRegister');
}

export function usePreloader(): { progress: ReadonlySignal<number> } {
  return {
    progress: useComputed(() => {
      // console.log('____processing', requests.peek(), loadTo.peek());
      // console.log('_____load', loadTo.value, requests.value);
      if (!requests.value) return 0;
      return loadTo.value / requests.value;
    }),
  };
}

export function resetPreloader(): void {
  requests.value = 0;
  loadTo.value = 0;
}
