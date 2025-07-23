'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import { useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';
import { CursorType } from '@/enum/animation';

import Cursor from '../Cursor';
import styles from './Grow.module.scss';

export default function CursorGrow(): React.ReactElement {
  const { cursorType, isGrowDeep } = useCursorContext();
  const mouseRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  useSignalEffect(() => {
    if (cursorType.value === CursorType.HIDE_GROW) {
      if (mouseRef.current) {
        contextSafe(() => {
          gsap.killTweensOf(mouseRef.current);
          gsap.to(mouseRef.current, {
            duration: 0.8,
            opacity: 0,
            ease: 'power3.inOut',
          });
        })();
      }
    } else {
      if (mouseRef.current) {
        contextSafe(() => {
          gsap.killTweensOf(mouseRef.current);
          gsap.to(mouseRef.current, {
            duration: 0.8,
            opacity: 1,
            ease: 'power3.inOut',
          });
        })();
      }
    }
  });

  useSignalEffect(
    contextSafe(() => {
      if (isGrowDeep.value) {
        gsap.killTweensOf(mouseRef.current);
        gsap.to(mouseRef.current, {
          duration: 0.4,
          opacity: 0.5,
          ease: 'power3.out',
        });
      } else if (cursorType.peek() !== CursorType.HIDE_GROW) {
        gsap.killTweensOf(mouseRef.current);
        gsap.to(mouseRef.current, {
          duration: 0.4,
          opacity: 1,
          ease: 'power3.out',
        });
      }
    })
  );

  return (
    <Cursor className={styles.cursor}>
      <Box
        ref={mouseRef}
        css={{
          '--s-w': '159.7rem',
          '--s-h': '149.8rem',
          width: 'var(--s-w)',
          height: 'var(--s-h)',
          top: 'calc(var(--s-h) * -0.5)',
          left: 'calc(var(--s-w) * -0.5)',
          position: 'fixed',
          '& img': { aspectRatio: '1597/1498', width: 'var(--s-w)', height: 'var(--s-h)' },
        }}
      >
        <Image
          unoptimized
          loading="eager"
          src={'/glow.svg'}
          alt="grow"
          width={1597}
          height={1498}
        />
      </Box>
    </Cursor>
  );
}
