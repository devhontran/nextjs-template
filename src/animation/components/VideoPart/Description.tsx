'use client';

import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { type ReactElement, useImperativeHandle, useRef } from 'react';

import { useLinesMask } from '../Typo/Lines/useLinesMask';

interface IProps extends BoxProps {
  children: ReactElement;
  ref?: (el: IRefInteraction | null) => void;
}

export default function Description({ children, ref, ...rest }: IProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const isAnimationIn = useRef(false);
  const { motionIn, motionOutLines, reset } = useLinesMask({
    refContent,
    isInitEffect: true,
    isTriggerMotion: true,
    isBlock: true,
    fixClip: true,
  });

  useImperativeHandle(ref, () => ({
    motionIn: (twVars?: gsap.TweenVars): void => {
      if (isAnimationIn.current) return;
      isAnimationIn.current = true;
      motionIn(twVars);
    },
    motionOut: (twVars?: gsap.TweenVars): void => {
      isAnimationIn.current = false;
      motionOutLines({ ...twVars, yPercent: 105, stagger: -0.015 });
    },
    reset: (): void => {
      reset?.();
      isAnimationIn.current = false;
    },
  }));
  return (
    <Box zIndex={4} ref={refContent} {...rest} position="absolute" color="white">
      {children}
    </Box>
  );
}
