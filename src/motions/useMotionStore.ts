import { signal, useSignalEffect } from '@preact/signals-react';

export const motionEnabled = signal<boolean>(true);

export function enabledMotion(): void {
  motionEnabled.value = true;
}

export function disableMotion(): void {
  motionEnabled.value = false;
}

export function useMotionEnabled(callback: () => void): void {
  return useSignalEffect(() => {
    motionEnabled.value && callback();
  });
}
