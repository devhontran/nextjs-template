'use client';

import Image from 'next/image';
import React from 'react';

import { TypographyParagraph } from '@/components/Typography';

import BackToTop from './BackToTop';
import s from './styles.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer className={s.footer}>
      <div className={s.bg}>
        <div className="container">
          <Image src="/images/bg-covert.jpg" alt="hero" width={1920} height={770} />
        </div>
      </div>
      <div className={s.content}>
        <div className="container grid grid-cols-10 gap-24">
          <div className="col-span-3">
            <TypographyParagraph className={s.heading} size={24}>
              NOW THAT YOU ALREADY KNOW ME, IT IS TIME TO START TO BUILD SOMETHING AMAZING TOGETHER.
            </TypographyParagraph>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
