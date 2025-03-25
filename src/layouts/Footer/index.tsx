'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { TypographyHeading, TypographyLabel, TypographyParagraph } from '@/components/Typography';

import s from './Footer.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer className={s.footer}>
      <div className={s.bg}>
        <div className="container">
          <Image src="/images/bg-covert.jpg" alt="hero" width={1920} height={770} />
        </div>
      </div>
      <div className={`${s.content} `}>
        <div className="container">
          <TypographyHeading className={s.title} size={140}>
            Contact.
          </TypographyHeading>
          <div className="grid grid-cols-10 gap-24">
            <div className="col-span-3">
              <TypographyParagraph className={s.heading} size={18}>
                Now that you already know me, it is time to start to build something amazing
                together.
              </TypographyParagraph>
            </div>
          </div>
          <div className="bottom">
            <ul className="social">
              <li>
                <Link href="/">
                  <Image src="/images/social/facebook.svg" alt="facebook" width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image
                    src="/images/social/instagram.svg"
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
            </ul>
            <div className="copyright">
              <TypographyLabel size={12}>© 2025. All rights reserved.</TypographyLabel>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
