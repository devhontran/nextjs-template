'use client';

import About from './About';
import Clients from './Clients';
import Contact from './Contact';
import Hero from './Hero';
import Partner from './Partner';
import Services from './Services';
import Works from './Works';

export default function HomePageV2(): React.ReactElement {
  return (
    <section>
      <Hero />
      <About />
      <Services />
      <Works />
      <Clients />
      <Partner />
      <Contact />
    </section>
  );
}
