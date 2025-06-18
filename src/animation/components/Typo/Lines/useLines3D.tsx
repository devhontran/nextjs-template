'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

import s from './Lines.module.scss';

export const useLines3D = ({
  refContent,
  isTriggerMotion,
  isInitEffect,
  isBlock = false,
  fixClip,
  debug,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
  isInitEffect?: boolean;
  isBlock?: boolean;
  fixClip?: boolean;
  debug?: boolean;
}): IMotionTypoFunctions => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.6,
    stagger: 0.1,
    ease: 'power3.out',
  };

  const formVars = {
    yPercent: 100,
    rotationX: -90,
    rotationY: -30,
  };

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

    if (isTriggerMotion) {
      gsap.set(refSplitText.current.lines, formVars);
    }
  };

  const motionOut = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.to(refSplitText.current.lines, {
      yPercent: 100,
      ...twVars,
      ...twVarsCustom,
      duration: 0.8,
      stagger: -0.065,
    });
  };

  const motionIn = (twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    gsap.killTweensOf(refSplitText.current.lines);
    return gsap.fromTo(
      refSplitText.current.lines,
      { ...formVars },
      {
        yPercent: 0,
        rotationX: 0,
        rotationY: 0,
        ...twVars,
        ...twVarsCustom,
      }
    );
  };

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      if (isInitEffect) motionInit().catch(() => null);
      return (): void => {
        textRevert();
      };
    },
    { dependencies: [isInitEffect, refContent, motionInit, debug] }
  );

  return { motionIn, motionOut, motionInit, textRevert };
};
