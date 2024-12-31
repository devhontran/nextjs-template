'use client';

import React from 'react';

import MotionLines, { MotionLinesType } from '@/animation/components/Typo/Lines';

import s from './styles.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer className={s.footer}>
      <h1 style={{ fontSize: '55px', color: 'white' }}>FOOTER</h1>
      <MotionLines motion={{ delayEnter: 0.2 }} type={MotionLinesType.fade}>
        <h1 className={s.heading} style={{ fontSize: '55px', color: 'white' }}>
          This is the Home Page
        </h1>
      </MotionLines>
    </footer>
  );
}
