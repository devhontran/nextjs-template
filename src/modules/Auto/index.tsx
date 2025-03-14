'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Observer from 'gsap/dist/Observer';
import type { ReactElement } from 'react';

import SectionPart1 from './SectionPart1';
import SectionPart2 from './SectionPart2';
import SectionPart3 from './SectionPart3';
import s from './styles.module.scss';
import { useVideoContent, VideoContentProvider } from './VideoContentContext';

function Auto(): React.ReactElement {
  const { isPlaying, gotoSection } = useVideoContent();
  useGSAP(() => {
    gsap.registerPlugin(Observer);
    Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => {
        if (!isPlaying.peek()) {
          gotoSection(-1);
        }
      },
      onUp: () => {
        if (!isPlaying.peek()) {
          gotoSection(+1);
        }
      },
      tolerance: 10,
      preventDefault: true,
    });
  });
  return (
    <div className={s.container}>
      <SectionPart1 index={0} />
      <SectionPart2 index={1} />
      <SectionPart3 index={2} />
    </div>
  );
}

const AutoWrapper = (): ReactElement => {
  return (
    <VideoContentProvider>
      <Auto />
    </VideoContentProvider>
  );
};

export default AutoWrapper;
