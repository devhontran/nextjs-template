'use client';

import LinkEffect from '@/components/LinkEffect';

import About from './About';
import Hero from './Hero';
import Services from './Services';
import s from './styles.module.scss';
import Works from './Works';

export default function HomePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <Works />
      <Hero />
      <About />
      <Services />
      <LinkEffect className={s.btnContact} href={'/about'}>
        About
      </LinkEffect>
    </section>
  );
}
