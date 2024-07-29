'use client';

import MotionLines, { MotionLinesType } from '@Motions/Typo/Lines';

import s from './styles.module.scss';

export default function AboutPage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <MotionLines type={MotionLinesType.fade}>
        <h1 className={s.heading}>This is the About Page</h1>
      </MotionLines>
    </section>
  );
}
