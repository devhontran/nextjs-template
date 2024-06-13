import { Signal, useSignal, useSignalEffect } from '@preact/signals-react';

import useWindowResize from './useWindowResize';

export default function useMouse(): Signal<{ x: number; y: number }> {
  const mouse = useSignal<{ x: number; y: number }>({ x: 0, y: 0 });
  const { isDesktop } = useWindowResize();
  useSignalEffect(() => {
    const move = (e: MouseEvent): void => {
      if (!isDesktop.value) return;
      mouse.value = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
    };
  });

  return mouse;
}
