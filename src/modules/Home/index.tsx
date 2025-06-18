'use client';

import About from './About';
import Hero from './Hero';
import Services from './Services';
import s from './styles.module.scss';
import Works from './Works';

export default function HomePageV2(): React.ReactElement {
  return (
    <section className={s.landingPage}>
      <Hero />
      <About />
      <Services />
      <Works />
    </section>
  );
}
