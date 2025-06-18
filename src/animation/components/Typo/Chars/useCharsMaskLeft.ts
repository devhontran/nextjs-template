import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type RefObject, useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

import s from './Chars.module.scss';

export const useCharsMaskLeft = ({
  refContent,
  isTriggerMotion,
  isInitEffect,
}: {
  refContent: RefObject<HTMLSpanElement | null>;
  isTriggerMotion?: boolean;
  isInitEffect?: boolean;
}): IMotionTypoFunctions & {
  motionOutRight: (twVarsCustom?: gsap.TweenVars) => void;
  motionToTop: (twVarsCustom?: gsap.TweenVars) => void;
  motionTopIn: (twVarsCustom?: gsap.TweenVars) => void;
} => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.2,
    ease: 'power3.out',
  };

  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    if (!refContent.current || !isInitEffect) return;

    motionInit().catch(() => null);
    return (): void => {
      textRevert();
    };
  });

  const motionInit = async (): Promise<void> => {
    if (!refContent.current || !(await isFontReady())) return;

    refContent.current.classList.add(s.chars, 'will-change-transform');

    refSplitText.current?.revert();
    refSplitText.current = new SplitText(refContent.current, {
      type: 'chars',
      charsClass: 'char',
      smartWrap: true,
      mask: 'chars',
      aria: 'none',
    });
    if (isTriggerMotion && refSplitText.current.chars.length) {
      gsap.set(refSplitText.current.chars, {
        xPercent: -115,
      });
    }
  };

  const motionIn = (twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    gsap.killTweensOf(refSplitText.current.chars);
    return gsap.fromTo(
      refSplitText.current.chars,
      { yPercent: 0, xPercent: -115 },
      {
        xPercent: 0,
        stagger: 0.025,
        ...twVars,
        ...twVarsCustom,
      }
    );
  };

  const motionOut = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.to(refSplitText.current.chars, {
      yPercent: 115,
      stagger: 0.015,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const motionToTop = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.killTweensOf(refSplitText.current.chars);
    gsap.to(refSplitText.current.chars, {
      yPercent: -115,
      stagger: 0.015,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const motionTopIn = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.killTweensOf(refSplitText.current.chars);
    gsap.to(refSplitText.current.chars, {
      yPercent: 0,
      stagger: 0.015,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const motionOutRight = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.killTweensOf(refSplitText.current.chars);
    gsap.to(refSplitText.current.chars, {
      xPercent: 115,
      stagger: 0.015,
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
    motionOutRight,
    motionToTop,
    motionTopIn,
    textRevert,
  };
};
