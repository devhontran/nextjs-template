import { Box } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { useImperativeHandle, useRef } from 'react';

import ButtonV2Mobile from '@/components/ButtonV2Mobile';

export default function BtnPrevNext({
  onClick,
  onMouseEnter,
  onMouseLeave,
  refMotionControl,
  ...props
}: PropsWithChildren & {
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  refMotionControl?: React.RefObject<IRefMotion | null>;
  [key: string]: unknown;
  children: React.ReactNode;
}): React.ReactElement {
  const refMotion = useRef<IRefMotion | null>(null);
  useImperativeHandle(refMotionControl, () => ({
    motionIn: (twVars?: gsap.TweenVars): void => {
      refMotion.current?.motionIn(twVars);
    },
    motionOut: (twVars?: gsap.TweenVars): void => {
      refMotion.current?.motionOut(twVars);
    },
    motionReset: (twVars?: gsap.TweenVars): void => {
      refMotion.current?.motionReset?.(twVars);
    },
  }));

  return (
    <Box
      position={'absolute'}
      zIndex={5}
      display={'block'}
      {...props}
      css={{
        '& button': {
          borderRadius: '.4rem',
          border: '1px solid rgba(232, 234, 250, 0.15)',
          bg: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <ButtonV2Mobile
        refMotionControl={refMotion}
        onClick={() => {
          onClick();
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {props.children}
      </ButtonV2Mobile>
    </Box>
  );
}
