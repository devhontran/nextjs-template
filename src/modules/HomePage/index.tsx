'use client';

import About from './About';
import Hero from './Hero';
import s from './styles.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <Hero />
      <About />
    </section>
  );
}
