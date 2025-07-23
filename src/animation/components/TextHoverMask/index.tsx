'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useImperativeHandle, useRef } from 'react';
export default function TextHoverMask({
  ref,
  children,
  fixClip,
}: TextHoverMaskProps): React.ReactElement {
  const refText = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  useImperativeHandle(ref, () => ({
    onHover: contextSafe((twVars?: gsap.TweenVars): void => {
      gsap.fromTo(
        refText.current,
        { yPercent: 0 },
        { yPercent: -100, ease: 'power3.out', duration: 1.2, ...twVars }
      );
    }),
    motionIn: contextSafe((twVars?: gsap.TweenVars): void => {
      gsap.killTweensOf(refText.current);
      gsap.fromTo(
        refText.current,
        { yPercent: 100 },
        { yPercent: 0, ease: 'power3.out', duration: 1.2, ...twVars }
      );
    }),
    motionOut: contextSafe((twVars?: gsap.TweenVars): void => {
      gsap.killTweensOf(refText.current);
      gsap.to(refText.current, { yPercent: 100, ease: 'power3.out', duration: 1.2, ...twVars });
    }),
  }));

  return (
    <Box
      as={'span'}
      display={'block'}
      overflow={'clip'}
      className={fixClip ? 'fix-mask-clip-mask' : ''}
    >
      <Box
        as={'span'}
        display={'block'}
        position={'relative'}
        ref={refText}
        className={'will-change-transform'}
      >
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
