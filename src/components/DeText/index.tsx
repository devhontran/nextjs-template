'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType from 'split-type';

import { usePageEnter } from '@/layouts/Animation/usePageStatus';

export default function DeText(): JSX.Element {
  const elTextClose = useRef<HTMLDivElement>(null);
  const refSplitClose = useRef<SplitType>();

  const { contextSafe } = useGSAP(
    () => {
      if (!elTextClose.current) return;

      refSplitClose.current = new SplitType(elTextClose.current, { types: 'chars' });
      refSplitClose?.current && gsap.set(refSplitClose?.current.chars, { yPercent: 125, y: 0 });

      return () => {
        refSplitClose?.current?.revert();
      };
    },
    { dependencies: [] }
  );

  const motionPlay = contextSafe(
    (splitText: SplitType, duration: number = 1.2, delay: number = 0) => {
      gsap.killTweensOf(splitText.chars);
      gsap.to(splitText.chars, {
        yPercent: 0,
        y: 0,
        duration,
        ease: 'power3.out',
        stagger: 0.05,
        overwrite: 'auto',
        delay,
      });
    }
  );

  usePageEnter(() => {
    refSplitClose.current && motionPlay(refSplitClose.current, 1.2);
  });

  return (
    <div ref={elTextClose} style={{ fontSize: '100px' }}>
      CON ME MAY
    </div>
  );
}
