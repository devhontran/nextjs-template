'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import { useSignal } from '@preact/signals-react';
import { gsap } from 'gsap';
import { useRef } from 'react';

import useOnWinResize from '@/animation/hooks/useOnWinResize';

interface HrMouseParallaxProps {
  root?: boolean;
  offsetX?: number;
  offsetY?: number;
  children: React.ReactNode;
}

export default function MouseParallax({
  children,
  root,
  offsetX,
  offsetY,
}: HrMouseParallaxProps): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refX = useRef<gsap.QuickToFunc>(null);
  const refY = useRef<gsap.QuickToFunc>(null);
  const sRect = useSignal<DOMRect | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent): void => {
    const rect = sRect.value;
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100 * (offsetX ?? 1);
    const yPercent = (y / rect.height) * 100 * (offsetY ?? 1);

    refX.current?.(xPercent);
    refY.current?.(yPercent);
  };

  const onMouseLeave = (): void => {
    refX.current?.(0);
    refY.current?.(0);
  };

  useGSAP(() => {
    refX.current = gsap.quickTo(refContent.current, 'xPercent', {
      duration: 0.5,
      ease: 'power3',
    });

    refY.current = gsap.quickTo(refContent.current, 'yPercent', {
      duration: 0.5,
      ease: 'power3',
    });

    if (root) {
      document.addEventListener('mousemove', onMouseMove);
    }

    return (): void => {
      if (root) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
  });

  useOnWinResize(() => {
    const rect = refWrapper.current?.getBoundingClientRect();
    if (!rect) return;

    // eslint-disable-next-line react-compiler/react-compiler
    sRect.value = rect;
  });

  return (
    <Box
      onMouseMove={!root ? onMouseMove : undefined}
      onMouseLeave={!root ? onMouseLeave : undefined}
      ref={refWrapper}
    >
      <Box ref={refContent} willChange={'transform'}>
        {children}
      </Box>
    </Box>
  );
}
