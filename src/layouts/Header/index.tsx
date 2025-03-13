'use client';

import Image from 'next/image';
import React from 'react';

import LinkEffect from '@/components/LinkEffect';

import s from './styles.module.scss';

export default function Header(): React.ReactElement {
  return (
    <header className={`${s.header} js-header`}>
      <div className="container">
        <div className={`${s.header_container} grid grid-cols-10 items-end justify-between gap-24`}>
          <div className={`${s.header_logo} col-span-1`}>
            <LinkEffect href="/">
              <Image src="/logo-white.svg" alt="logo" width={40} height={40} />
            </LinkEffect>
          </div>
          <div className={`${s.header_label} col-span-2`}>
            <LinkEffect href="/about">
              HONTRAN. <br /> DEV
            </LinkEffect>
          </div>
          <div className={`${s.header_label} col-span-2`}>
            CREATIVE <br /> DEVELOPER IN SAIGON
          </div>
          <div className={`${s.header_label} col-span-2 col-start-8`}>AVAILABLE FOR FREELANCE</div>
        </div>
      </div>
    </header>
  );
}
