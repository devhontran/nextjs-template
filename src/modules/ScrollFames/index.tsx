'use client';

import { ReactElement } from 'react';

import FameScrolling from '@/animation/components/FameScrolling';

import s from './style.module.scss';
export default function ScrollFameModule(): ReactElement {
  return (
    <div className={s.container}>
      <FameScrolling
        totalFrames={200}
        urlFrame={
          'https://pub-d862a324de1f42fc827b4ab7158a00ef.r2.dev/production-motion/fame_%d.jpg'
        }
        width={1920}
        height={1080}
        firstFame={0}
      />
    </div>
  );
}
