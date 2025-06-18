'use client';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

import s from './Lines.module.scss';

export const useLinesMask = ({
  refContent,
  isTriggerMotion,
  isInitEffect,
  isBlock,
  fixClip,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
  isInitEffect?: boolean;
  isBlock?: boolean;
  fixClip?: boolean;
}): IMotionTypoFunctions & { motionOutLines: (twVarsCustom?: gsap.TweenVars) => void } => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.6,
    stagger: 0.1,
    ease: 'power3.out',
  };

  useLayoutEffect(() => {
    if (!refContent.current || !isInitEffect) return;
    motionInit().catch(() => null);
    return (): void => {
      textRevert();
    };
  }, [refContent, isInitEffect]);

  const motionInit = async (): Promise<void> => {
    gsap.registerPlugin(SplitText);

    if (!refContent.current || !(await isFontReady())) return;

    refContent.current.classList.add(s.lines__3d);
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

    if (isTriggerMotion && refSplitText.current.lines.length) {
      gsap.set(refSplitText.current.lines, {
        yPercent: 100,
      });
    }
  };

  const motionIn = (twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    gsap.killTweensOf(refContent.current);
    return gsap.fromTo(
      refSplitText.current.lines,
      {
        opacity: 1,
        yPercent: 100,
      },
      {
        yPercent: 0,
        ...twVars,
        ...twVarsCustom,
      }
    );
  };

  const motionOut = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.to(refContent.current, {
      mask: 'none',
      yPercent: -100,
      opacity: 0,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const motionOutLines = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.killTweensOf(refSplitText.current.lines);
    gsap.to(refSplitText.current.lines, {
      yPercent: -100,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };

  return {
    motionInit,
    motionIn,
    motionOut,
    motionOutLines,
    textRevert,
  };
};
