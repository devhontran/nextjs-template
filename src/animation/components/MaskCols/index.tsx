'use client';

import { Box } from '@chakra-ui/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';

import useMaskCols from './useMaskCols';

interface IMaskCols extends PropsWithChildren {
  motion?: IAnimationProps;
  className?: string;
  ref?: React.RefObject<IRefMotion | null>;

  isOnce?: boolean;
}

export default function MotionMaskCols({
  children,
  motion,
  className,
  isOnce = false,
}: IMaskCols): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { motionIn } = useMaskCols({ refContent, isInit: true });

  useAnimate({
    refContent,
    motion,
    animate: (twVarsCustom?: gsap.TweenVars): void => {
      motionIn({ ...twVarsCustom, duration: 1.4 });
    },
    isOnce,
  });
  return (
    <Box willChange={'transform, opacity'} ref={refContent} className={className}>
      {children}
    </Box>
  );
}
