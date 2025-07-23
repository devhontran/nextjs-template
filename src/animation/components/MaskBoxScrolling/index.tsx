'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

interface IMaskBox extends PropsWithChildren {
  start?: string;
  end?: string;
  borderRadius?: string;
}

export default function MaskBoxScrolling({
  children,
  start = 'top bottom',
  end = 'bottom bottom',
  borderRadius = '.8rem',
}: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!refContent.current) return;

    const qxTime = gsap.quickSetter(refInner.current, 'y', '%') as (value: number) => void;
    gsap.fromTo(
      refContent.current,
      { clipPath: `inset(50% 50% 0% 50% round ${borderRadius})` },
      {
        clipPath: `inset(0% 0% 0% 0% round ${borderRadius})`,
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

    ScrollTrigger.create({
      trigger: refContent.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        qxTime(self.progress * 60);
      },
    });
  });
  return (
    <Box height={'100%'} ref={refContent}>
      <Box height={'100%'} willChange={'transform'} ref={refInner}>
        {children}
      </Box>
    </Box>
  );
}
