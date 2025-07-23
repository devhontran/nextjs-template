import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useSignal } from '@preact/signals-react';
import { type ReactElement, useImperativeHandle, useRef } from 'react';

import { useLinesMask } from '../Typo/Lines/useLinesMask';
import styles from './styles.module.scss';

interface IProps extends BoxProps {
  children: ReactElement;
  ref?: React.RefObject<IRefInteraction | null>;
}

export default function Description({ children, ref, ...rest }: IProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const isAnimationIn = useSignal(false);

  const { motionIn, motionOutLines } = useLinesMask({
    refContent,
    isInitEffect: true,
    isTriggerMotion: true,
    isBlock: true,
    fixClip: true,
  });

  useImperativeHandle(ref, () => ({
    motionIn: (twVars?: gsap.TweenVars): void => {
      if (!isAnimationIn.value) {
        // eslint-disable-next-line react-compiler/react-compiler
        isAnimationIn.value = true;
        motionIn(twVars);
      }
    },
    motionOut: (twVars?: gsap.TweenVars): void => {
      if (isAnimationIn.value) {
        isAnimationIn.value = false;
        motionOutLines(twVars);
      }
    },
  }));
  return (
    <Box
      maxW={'48rem'}
      zIndex={4}
      className={styles.description}
      ref={refContent}
      {...rest}
      position="absolute"
      mixBlendMode={'difference'}
      color="white"
    >
      {children}
    </Box>
  );
}
