'use client';

import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import { MotionMaskBoxType } from '@/enum/motion';

interface IMaskBox extends PropsWithChildren, BoxProps {
  motion?: IAnimationProps;
  direction?: MotionMaskBoxType;
  borderRadius?: string;
}

export default function MotionMaskBox({
  children,
  motion,
  direction,
  borderRadius = '.8rem',
  ...rest
}: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const animate = contextSafe((gsapWars: gsap.TweenVars): void => {
    let clipPathTo = `inset(100% round ${borderRadius})`;
    let clipPathForm = `inset(0% round ${borderRadius})`;

    switch (direction) {
      case MotionMaskBoxType.BOTTOM:
        clipPathTo = `inset(0% 0% 0% 0% round ${borderRadius})`;
        clipPathForm = `inset(100% 0% 0% 0% round ${borderRadius})`;
        break;
      case MotionMaskBoxType.BOTTOM_CENTER:
        clipPathTo = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;
        clipPathForm = `polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)`;
        break;
      case MotionMaskBoxType.LEFT:
        clipPathForm = `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`;
        clipPathTo = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;
        break;
      default:
        clipPathTo = `inset(0% round ${borderRadius})`;
        clipPathForm = `inset(100% 0% 0% 0% round ${borderRadius})`;
    }

    gsap.fromTo(
      refContent.current,
      { clipPath: clipPathForm, ...motion?.from },
      {
        ...gsapWars,
        clipPath: clipPathTo,
        ease: 'power3.out',
        duration: 1.6,
        ...motion?.to,
      }
    );
  });

  useAnimate({ refContent, motion, animate });
  return (
    <Box ref={refContent} {...rest}>
      {children}
    </Box>
  );
}
