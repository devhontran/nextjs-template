import { useGSAP } from '@gsap/react';
import { useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import { useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';
import { CursorType } from '@/enum/animation';
import VideoButton from '@/modules/components/VideoButton';

import Cursor from '../Cursor';
import styles from './Play.module.scss';

export default function CursorPlay(): React.ReactElement {
  const refCursor = useRef<HTMLDivElement>(null);
  const { cursorType } = useCursorContext();
  const { contextSafe } = useGSAP(() => {
    if (!refCursor.current) return;
    gsap.set(refCursor.current, {
      xPercent: -105,
    });
  });

  const motion = contextSafe((vars: gsap.TweenVars): void => {
    if (!refCursor.current) return;
    gsap.to(refCursor.current, {
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
      ...vars,
    });
  });

  useSignalEffect(() => {
    if (cursorType.value === CursorType.PLAY) {
      motion({
        xPercent: 0,
      });
    } else {
      motion({
        xPercent: -105,
      });
    }
  });

  return (
    <Cursor className={styles.cursor_play}>
      <div ref={refCursor}>
        <VideoButton>Watch my take</VideoButton>
      </div>
    </Cursor>
  );
}
