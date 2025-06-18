'use client';

import type { BoxProps } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useImperativeHandle, useRef } from 'react';

interface ArrowSvgProps extends BoxProps {
  ref: React.RefObject<{ onMouseEnter: (twVars?: gsap.TweenVars) => void } | null>;
  className?: string;
  stroke?: string;
  pathTransition?: string;
}
export default function ArrowSvg({
  ref,
  className,
  stroke = '#E8EAFA',
  pathTransition,
}: ArrowSvgProps): React.ReactElement {
  const pathRef = useRef<SVGPathElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin);
  });

  useImperativeHandle(ref, () => ({
    onMouseEnter: (twVars?: gsap.TweenVars): void => {
      const tl = gsap.timeline({ ease: 'power3.out' });
      tl.fromTo(pathRef.current, { drawSVG: '0% 100%' }, { duration: 0.5, drawSVG: '100% 100%' });
      tl.fromTo(
        pathRef.current,
        { drawSVG: '0% 0%' },
        { duration: 0.5, drawSVG: '0% 100%', ...twVars }
      );
    },
  }));
  return (
    <chakra.svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <chakra.path
        d="M4 2V10.5C4 11.6046 4.89543 12.5 6 12.5H16M16 12.5L10 6.5M16 12.5L10 18.5"
        ref={pathRef}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={stroke}
        transition={pathTransition}
      />
    </chakra.svg>
  );
}
