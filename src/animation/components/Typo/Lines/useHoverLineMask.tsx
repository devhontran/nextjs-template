'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { useRef } from 'react';

import s from './Lines.module.scss';

export const useHoverLineMask = ({
  refContent,
  isMotionTrigger = true,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isMotionTrigger?: boolean;
}): { onHover: (twVars?: gsap.TweenVars) => void; motionIn: () => void } => {
  const refLines = useRef<HTMLSpanElement[]>([]);

  const { contextSafe } = useGSAP(
    () => {
      if (!refContent.current) return;

      refContent.current.classList.add(s.lineMask__hover);
      const text = refContent.current.textContent ?? '';

      const newContent = document.createElement('div');
      newContent.innerHTML = `<span class="block">${text}</span><span class="block">${text}</span>`;
      refContent.current.replaceChildren(newContent);

      if (isMotionTrigger) gsap.set(refLines.current, { yPercent: 100 });
    },
    { dependencies: [isMotionTrigger] }
  );

  const motionIn = contextSafe((): void => {
    if (!refContent.current) return;

    gsap.to(refContent.current.querySelectorAll('span'), {
      yPercent: -100,
      ease: 'power3.out',
      duration: 1.4,
    });
  });

  const onHover = contextSafe((twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.fromTo(
      refContent.current.querySelectorAll('span'),
      { yPercent: 0 },
      { yPercent: -100, ease: 'power3.out', duration: 1.4, ...twVars }
    );
  });

  return { onHover, motionIn };
};
