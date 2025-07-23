'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';
import useWinResize from '@/hooks/useWinResize';

export default function BoxMouseSnap({
  children,
  offset = 0.5,
}: PropsWithChildren<{ offset?: number }>): ReactElement {
  const refBtn = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const { isDesktop } = useWinResize();
  const { clientX, clientY } = useCursorContext();

  useGSAP(() => {
    if (!isDesktop) return;
    const rfx = gsap.quickTo(refInner.current, 'x', {
      duration: 0.5,
      ease: 'power3.out',
    });

    const rfy = gsap.quickTo(refInner.current, 'y', {
      duration: 0.5,
      ease: 'power3.out',
    });

    const onLeave = (): void => {
      rfx(0);
      rfy(0);
    };

    const onMove = (): void => {
      const rect = refBtn.current?.getBoundingClientRect();
      if (!rect) return;

      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      const x = clientX.value - cX;
      const y = clientY.value - cY;

      rfx(x * offset);
      rfy(y * offset);
    };

    refBtn.current?.addEventListener('mouseleave', onLeave);
    refBtn.current?.addEventListener('mousemove', onMove);

    return (): void => {
      refBtn.current?.removeEventListener('mouseleave', onLeave);
      refBtn.current?.removeEventListener('mousemove', onMove);
    };
  });

  return (
    <Box ref={refBtn} w="fit-content" fontSize={0} position={'relative'}>
      <Box fontSize={0} ref={refInner} willChange={'transform'}>
        {children}
      </Box>
    </Box>
  );
}
