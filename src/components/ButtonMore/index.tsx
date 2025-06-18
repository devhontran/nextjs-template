'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import type { PropsWithChildren } from 'react';
import React, { useImperativeHandle, useRef } from 'react';

import MotionFadeBox from '@/animation/components/FadeBox';
import TextHoverMask from '@/animation/components/TextHoverMask';
import Label from '@/components/Typography/Label';
import type { IAnimationProps } from '@/types/animation';

import ImgSvg from '../ImgSvg';
import s from './ButtonMore.module.scss';
interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  motion?: IAnimationProps;
  refMotionControl?: React.RefObject<IRefMotion | null>;
}

function ButtonMore({ ...props }: ButtonProps): React.JSX.Element {
  const { onClick, className, children, type = 'button', motion, refMotionControl } = props;
  const btnRef = useRef<HTMLButtonElement>(null);
  const txtRef = useRef<TextHoverMaskRef>(null);
  const refIcon = useRef<HTMLDivElement>(null);
  const refMotion = useRef<IRefMotion>(null);
  const rePathMotion = useRef<{ onMouseEnter: (twVars?: gsap.TweenVars) => void }>(null);

  useGSAP(() => {
    gsap.registerPlugin(DrawSVGPlugin);
  });

  const handleMouseEnter = (): void => {
    rePathMotion.current?.onMouseEnter();
    txtRef.current?.onHover();
    gsap.fromTo(
      refIcon.current,
      { rotate: '0deg' },
      {
        rotate: '180deg',
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  };

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
    <MotionFadeBox {...motion} ref={refMotion}>
      <button
        ref={btnRef}
        type={type}
        onClick={onClick}
        className={cn(s.button, className)}
        onMouseEnter={handleMouseEnter}
      >
        <div className={s.button_container}>
          <div className={s.button_wrapper}>
            <Box
              w={'2rem'}
              h={'2rem'}
              ref={refIcon}
              className={s.button_wrapper_icon}
              css={{
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                },
              }}
            >
              <ImgSvg src={'/icons/ic_plus.svg'} alt={'ic_plus'} width={20} height={20} />
            </Box>
          </div>
          <div className={s.button_content_container}>
            <Label size={16} className={s.button_txt} as="div">
              <TextHoverMask ref={txtRef}>{children}</TextHoverMask>
            </Label>
          </div>
        </div>
      </button>
    </MotionFadeBox>
  );
}

export default ButtonMore;
