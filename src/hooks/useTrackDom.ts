'use client';

import { Signal, useSignal } from '@preact/signals-react';
import { useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isMouseInside: boolean;
}

export default function useTrackDom(targetDomId: string): Signal<MousePosition> {
  const mouse = useSignal<MousePosition>({ x: 0, y: 0, isMouseInside: false });

  useEffect(() => {
    const dom = document.getElementById(targetDomId);

    if (!dom) {
      console.warn(`Element with ID ${targetDomId} not found.`);
      return;
    }

    const move = (e: MouseEvent): void => {
      const rect = dom.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / dom.offsetWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / dom.offsetHeight) * 2 + 1;

      const isMouseInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      mouse.value = { x, y, isMouseInside };
    };

    const enter = (): void => {
      mouse.value.isMouseInside = true;
    };

    const leave = (): void => {
      mouse.value.isMouseInside = false;
    };

    dom.addEventListener('mousemove', move);
    dom.addEventListener('mouseenter', enter);
    dom.addEventListener('mouseleave', leave);

    return () => {
      dom.removeEventListener('mousemove', move);
      dom.removeEventListener('mouseenter', enter);
      dom.removeEventListener('mouseleave', leave);
    };
  }, [targetDomId]);

  return mouse;
}
