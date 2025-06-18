'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

interface IMaskBox extends PropsWithChildren {
  start?: string;
  end?: string;
}

export default function MaskBoxScrolling({
  children,
  start = 'top bottom',
  end = 'bottom bottom',
}: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!refContent.current) return;
    gsap.fromTo(
      refContent.current,
      { clipPath: 'inset(50% 50% 0% 50%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'linear',
        scrollTrigger: {
          trigger: refContent.current,
          start: start,
          end: end,
          scrub: 1,
        },
      }
    );
    gsap.to(refInner.current, {
      yPercent: 60,
      duration: 1.4,
      ease: 'linear',
      scrollTrigger: {
        trigger: refContent.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
  return (
    <div ref={refContent}>
      <div ref={refInner}>{children}</div>
    </div>
  );
}
