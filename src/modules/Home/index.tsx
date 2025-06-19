'use client';

import About from './About';
import Hero from './Hero';
import Services from './Services';
import Works from './Works';

export default function HomePageV2(): React.ReactElement {
  return (
    <section>
      <Hero />
      <About />
      <Services />
      <Works />
    </section>
  );
}
