import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type RefObject, useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

import s from './Chars.module.scss';

export const useCharsScale = ({
  refContent,
  isTriggerMotion = true,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
}): IMotionTypoFunctions => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.2,
    stagger: 0.06,
    ease: 'power3.out',
  };

  const motionInit = async (): Promise<void> => {
    gsap.registerPlugin(SplitText);
    if (!refContent.current || !(await isFontReady())) return;
    refContent.current.classList.add(s.chars__mask_rand, 'will-change-transform');

    refSplitText.current?.revert();
    refSplitText.current = new SplitText(refContent.current, {
      type: 'chars,lines',
      charsClass: 'char',
      smartWrap: true,
      mask: 'lines',
      linesClass: 'line',
      aria: 'none',
    });

    if (isTriggerMotion && refSplitText.current.chars.length) {
      gsap.set(refSplitText.current.chars, {
        yPercent: () => {
          return Math.random() < 0.5 ? -100 : 100;
        },
      });
    }
  };

  const motionIn = (twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    return gsap.to(refSplitText.current.chars, {
      yPercent: 0,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };

  return { motionIn, motionInit, textRevert };
};
