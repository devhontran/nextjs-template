import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type RefObject, useRef } from 'react';

import { isFontReady } from '@/utils/uiHelper';

import s from './Words.module.scss';

export const useWords3D = ({
  refContent,
  isTriggerMotion,
  fixClip,
  isBlock,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
  fixClip?: boolean;
  isBlock?: boolean;
}): IMotionTypoFunctions => {
  const refSplitText = useRef<SplitText | null>(null);
  const twVars = {
    duration: 1.6,
    stagger: 0.1,
    ease: 'power3.out',
  };

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(SplitText);
  });

  const motionInit = contextSafe(async (): Promise<void> => {
    if (!refContent.current || !(await isFontReady())) return;

    refContent.current.classList.add(s.chars_3d__words, 'will-change-transform');
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
        yPercent: 105,
        rotationX: -90,
        rotationY: -30,
      });
    }
  });

  const motionIn = contextSafe((twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current || !refSplitText.current) return null;

    return gsap.to(refSplitText.current.words, {
      yPercent: 0,
      rotationX: 0,
      rotationY: 0,
      ...twVars,
      ...twVarsCustom,
    });
  });

  const motionOut = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current || !refSplitText.current) return;

    gsap.to(refSplitText.current.words, {
      yPercent: 105,
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
