import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type RefObject, useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

export const useCharsScale = ({
  refContent,
  isTriggerMotion = true,
  fixClip,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
  fixClip?: boolean;
}): IMotionTypoFunctions => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.6,
    stagger: 0.08,
    ease: 'power3.out',
  };

  const textRevert = (): void => {
    refSplitText.current?.revert();
    refSplitText.current = null;
  };

  const motionInit = async (): Promise<void> => {
    gsap.registerPlugin(SplitText);

    if (!refContent.current || !(await isFontReady())) return;

    refContent.current.classList.add('will-change-transform');

    refSplitText.current?.revert();
    refSplitText.current = new SplitText(refContent.current, {
      type: 'chars,lines',
      linesClass: `line ${fixClip ? 'fix-clip' : ''}`,
      charsClass: 'char',
      smartWrap: true,
      mask: 'lines',
      aria: 'none',
    });

    if (isTriggerMotion && refSplitText.current.chars.length) {
      gsap.set(refSplitText.current.chars, {
        yPercent: 100,
        rotationX: -90,
        rotationY: -30,
      });
    }
  };

  const motionIn = (twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    return gsap.to(refSplitText.current.chars, {
      yPercent: 0,
      rotationX: 0,
      rotationY: 0,
      ...twVars,
      ...twVarsCustom,
    });
  };

  const motionOut = (twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.to(refSplitText.current.chars, {
      yPercent: -115,
      ...twVars,
      ...twVarsCustom,
    });
  };

  return { motionIn, motionOut, motionInit, textRevert };
};
