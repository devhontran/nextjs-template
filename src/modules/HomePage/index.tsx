'use client';

import MotionLineFade from '@Motions/Typo/LineFade';

import s from './styles.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <MotionLineFade>
        <h1 className={s.heading}>This is the Home Page</h1>
      </MotionLineFade>
    </section>
  );
}
