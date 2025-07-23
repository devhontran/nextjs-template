import { Box } from '@chakra-ui/react';
import { useImperativeHandle, useRef } from 'react';

import ButtonV2 from '@/components/ButtonV2';

export default function BtnSkip({
  onClick,
  onMouseEnter,
  onMouseLeave,
  refMotionControl,
}: {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  refMotionControl: React.RefObject<IRefMotion | null>;
}): React.ReactElement {
  const refMotion = useRef<IRefMotion | null>(null);
  useImperativeHandle(refMotionControl, () => ({
    motionIn: (twVars?: gsap.TweenVars): void => {
      refMotion.current?.motionIn(twVars);
    },
    motionOut: (twVars?: gsap.TweenVars): void => {
      refMotion.current?.motionOut(twVars);
    },
  }));

  return (
    <Box
      position={'absolute'}
      bottom={'2.4rem'}
      right={'2.4rem'}
      zIndex={5}
      display={'block'}
      css={{
        '& button': {
          borderRadius: '.4rem',
          border: '1px solid rgba(232, 234, 250, 0.15)',
          bg: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <ButtonV2
        refMotionControl={refMotion}
        onClick={() => {
          refMotion.current?.motionOut();
          onClick();
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        Skip Animation
      </ButtonV2>
    </Box>
  );
}
