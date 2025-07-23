'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

type LinesMaskDeps = readonly unknown[];

export const useLinesMask = (
  {
    refContent,
    isTriggerMotion,
    isInitEffect,
    isBlock,
    fixClip,
    initTwVars,
  }: {
    refContent: RefObject<HTMLDivElement | null>;
    isTriggerMotion?: boolean;
    isInitEffect?: boolean;
    isBlock?: boolean;
    fixClip?: boolean;
    initTwVars?: gsap.TweenVars;
  },
  deps?: LinesMaskDeps
): IMotionTypoFunctions & {
  motionOutLines: (twVarsCustom?: gsap.TweenVars) => void;
  motionToLines: (twVarsCustom?: gsap.TweenVars) => void;
} => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.6,
    stagger: 0.1,
    ease: 'power3.out',
  } as const;

  const { contextSafe } = useGSAP(
    () => {
      if (!refContent.current || !isInitEffect) return;
      motionInit().catch(() => null);
      return (): void => {
        textRevert();
      };
    },
    { dependencies: [isInitEffect, deps] }
  );

  // Rest of the code remains unchanged...
  const motionInit = async (): Promise<void> => {
    gsap.registerPlugin(SplitText);

    if (!refContent.current || !(await isFontReady())) return;

    const el = isBlock ? refContent.current.children : refContent.current;
    refContent.current.classList.add('will-change-transform');

    refSplitText.current?.revert();
    refSplitText.current = new SplitText(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: `line ${fixClip ? 'fix-clip' : ''}`,
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

    if ((isTriggerMotion || initTwVars) && refSplitText.current.lines.length) {
      gsap.set(refSplitText.current.lines, {
        yPercent: 100,
        ...initTwVars,
      });
    }
  };

  const motionIn = (twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    gsap.killTweensOf(refContent.current);
    gsap.killTweensOf(refSplitText.current.lines);
    return gsap.fromTo(
      refSplitText.current.lines,
      {
        opacity: 1,
        yPercent: 105,
      },
      {
        yPercent: 0,
        ...twVars,
        ...twVarsCustom,
      }
    );
  };

  const motionOut = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.to(refContent.current, {
      mask: 'none',
      yPercent: -105,
      opacity: 0,
      ...twVars,
      ...twVarsCustom,
    });
  });

  const motionOutLines = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.killTweensOf(refSplitText.current.lines);
    gsap.to(refSplitText.current.lines, {
      yPercent: -105,
      ...twVars,
      ...twVarsCustom,
    });
  });

  const motionToLines = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.killTweensOf(refSplitText.current.lines);
    gsap.to(refSplitText.current.lines, {
      ...twVars,
      ...twVarsCustom,
    });
  });

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };

  const reset = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refSplitText.current) return;
    gsap.set(refSplitText.current.lines, {
      yPercent: 105,
      ...twVars,
      ...twVarsCustom,
    });
  });

  return {
    motionInit,
    motionIn,
    motionOut,
    motionOutLines,
    motionToLines,
    textRevert,
    reset,
  };
};
