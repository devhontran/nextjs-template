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
  useGSAP(() => {
    gsap.set(refCursor.current, {
      clipPath: 'inset(0 50% 0 50%)',
    });
  });

  const motion = (vars: gsap.TweenVars): void => {
    if (!refCursor.current) return;
    gsap.to(refCursor.current, {
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
      ...vars,
    });
  };

  useSignalEffect(() => {
    if (cursorType.value === CursorType.PLAY) {
      motion({
        clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
      });
    } else {
      motion({
        clipPath: ' polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
      });
    }
  });

  return (
    <Cursor className={styles.cursor_play}>
      <div ref={refCursor}>
        <VideoButton>Watch my views</VideoButton>
      </div>
    </Cursor>
  );
}
