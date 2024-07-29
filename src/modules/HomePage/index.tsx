'use client';

import MotionLines, { MotionLinesType } from '@Motions/Typo/Lines';

import s from './styles.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <MotionLines type={MotionLinesType.chars_glitch}>
        <h1 className={s.paragraph}>
          This is the Home Page This is the Home Page This is the Home Page This is the Home Page
          This is the Home Page This is the Home Page This is the Home Page This is the Home Page
          This is the Home Page This is the Home Page This is the Home Page This is the Home Page
          This is the Home Page This is the Home Page This is the Home Page This is the Home Page
          This is the Home Page This is the Home Page This is the Home Page This is the Home Page
        </h1>
      </MotionLines>
    </section>
  );
}
