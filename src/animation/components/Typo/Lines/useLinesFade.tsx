'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

export const useLinesFade = ({
  refContent,
  isTriggerMotion,
  isBlock,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
  isBlock?: boolean;
}): IMotionTypoFunctions => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.4,
    ease: 'power3.out',
  };

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(SplitText);
  });

  const motionInit = contextSafe(async (): Promise<void> => {
    if (!refContent.current || !(await isFontReady())) return;
    const el = isBlock ? refContent.current.children : refContent.current;

    refContent.current.classList.add('will-change-transform-opacity');
    refSplitText.current?.revert();
    refSplitText.current = new SplitText(el, {
      type: 'lines',
      linesClass: `line`,
      aria: 'none',
      onSplit: (splitText: SplitText): void => {
        if (!isBlock) return;
        splitText.lines.forEach((line) => {
          if (line.textContent === '') {
            line.innerHTML = '&nbsp;';
          }
        });
      },
    });

    if (isTriggerMotion && refSplitText.current.lines.length) {
      gsap.set(refSplitText.current.lines, {
        yPercent: 100,
        opacity: 0,
      });
    }
  });

  const motionIn = contextSafe((twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    return gsap.to(refSplitText.current.lines, {
      yPercent: 0,
      opacity: 1,
      ...twVars,
      ...twVarsCustom,
    });
  });

  const motionOut = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.to(refSplitText.current.lines, {
      yPercent: 100,
      ...twVars,
      ...twVarsCustom,
    });
  });

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };

  return { motionIn, motionOut, motionInit, textRevert };
};
