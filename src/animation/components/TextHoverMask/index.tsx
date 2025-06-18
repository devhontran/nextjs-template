'use client';

import { Box } from '@chakra-ui/react';
import gsap from 'gsap';
import { useImperativeHandle, useRef } from 'react';

export default function TextHoverMask({ ref, children }: TextHoverMaskProps): React.ReactElement {
  const refText = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    onHover: (twVars?: gsap.TweenVars): void => {
      gsap.fromTo(
        refText.current,
        { yPercent: 0 },
        { yPercent: -100, ease: 'power3.out', duration: 0.8, ...twVars }
      );
    },
    motionIn: (twVars?: gsap.TweenVars): void => {
      gsap.killTweensOf(refText.current);
      gsap.fromTo(
        refText.current,
        { yPercent: 100 },
        { yPercent: 0, ease: 'power3.out', duration: 0.8, ...twVars }
      );
    },
    motionOut: (twVars?: gsap.TweenVars): void => {
      gsap.killTweensOf(refText.current);
      gsap.to(refText.current, { yPercent: 100, ease: 'power3.out', duration: 0.8, ...twVars });
    },
  }));

  return (
    <Box as={'span'} display={'block'} contain={'content'}>
      <Box as={'span'} display={'block'} position={'relative'} ref={refText}>
        <Box as={'span'} display={'block'} className={'text'}>
          {children}
        </Box>
        <Box as={'span'} display={'block'} position={'absolute'} className={'text__clone'}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
