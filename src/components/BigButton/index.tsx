'use client';

import { Box, Button, Flex } from '@chakra-ui/react';
import cn from 'classnames';
import { useRef } from 'react';

import TextHoverMask from '@/animation/components/TextHoverMask';
import { Heading } from '@/components/Typography';

import ArrowSvg from '../ArrowSvg';

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  classNames?: string;
  children: React.ReactNode;
}
export default function BigButton({
  onClick,
  classNames,
  children,
  ...props
}: BigButtonProps): React.ReactElement {
  const pathRef = useRef<{ onMouseEnter: (twVars?: gsap.TweenVars) => void }>(null);
  const txtRef = useRef<TextHoverMaskRef>(null);

  const handleMouseEnter = (): void => {
    pathRef.current?.onMouseEnter();
    txtRef.current?.onHover();
  };

  return (
    <Button
      type="submit"
      height={'fit-content'}
      className={cn(classNames)}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      _disabled={{ opacity: 1 }}
      backgroundColor={'transparent'}
      {...props}
    >
      <Flex gap={['0.8rem', '1.6rem']} alignItems={'center'}>
        <Box w={['1.6rem', '4rem']} h={['1.6rem', '4rem']}>
          <ArrowSvg
            pathTransition={'stroke 0.6s var(--easeOutQuart)'}
            ref={pathRef}
            stroke={props.disabled ? 'var(--fg-quaternary-dark)' : 'var(--white)'}
          />
        </Box>
        <Heading
          size={64}
          as={'span'}
          fontWeight={'normal'}
          transition={'color 0.6s var(--easeOutQuart)'}
          color={props.disabled ? 'var(--fg-quaternary-dark)' : 'var(--white)'}
        >
          <TextHoverMask ref={txtRef}>{children}</TextHoverMask>
        </Heading>
      </Flex>
    </Button>
  );
}
