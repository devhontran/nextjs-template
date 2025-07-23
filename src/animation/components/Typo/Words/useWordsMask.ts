'use client';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

export default function useWordsMask({
  refContent,
  fixClip,
  isTriggerMotion,
  isBlock,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  fixClip?: boolean;
  isTriggerMotion?: boolean;
  isBlock?: boolean;
}): IMotionTypoFunctions {
  const refSplitText = useRef<SplitText | null>(null);

  const twConfig = {
    stagger: 0.06,
    duration: 1.2,
    ease: 'power3.out',
  };
  const fromTweenVars = { yPercent: 100 };
  const toTweenVars = { yPercent: 0 };

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(SplitText);
  });

  const motionInit = contextSafe(async (): Promise<void> => {
    if (!refContent.current || !(await isFontReady())) return;
    refContent.current.classList.add('will-change-transform');
    const el = isBlock ? refContent.current.children : refContent.current;

    refSplitText.current?.revert();
    refSplitText.current = new SplitText(el, {
      type: 'lines, words',
      wordsClass: 'word',
      linesClass: `line ${fixClip ? 'fix-clip' : ''}`,
      mask: 'lines',
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

    if (isTriggerMotion && refSplitText.current.words.length) {
      gsap.set(refSplitText.current.words, {
        yPercent: 100,
        rotationX: -90,
        rotationY: -30,
      });
    }
  });

  const motionIn = contextSafe((twVars?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    return gsap.fromTo(refSplitText.current.words, fromTweenVars, {
      ...toTweenVars,
      ...twVars,
    });
  });

  const motionOut = contextSafe((twVars?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.to(refSplitText.current.words, { yPercent: 100, ...twConfig, ...twVars });
  });

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };
  return {
    motionInit,
    motionIn,
    motionOut,
    textRevert,
  };
}
