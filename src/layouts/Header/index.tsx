'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React from 'react';

import s from './styles.module.scss';

export default function Header(): React.ReactElement {
  useGSAP(() => {
    const onScroll = (): void => {};
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  return (
    <header className={s.header}>
      <div className="container">
        <div className={`${s.header_container} grid grid-cols-10 gap-24 justify-between`}>
          <div className={`${s.header_logo} col-span-1`}>
            <Image src="/logo-yellow.svg" alt="logo" width={40} height={40} />
          </div>
          <div className={`${s.header_label} col-span-2`}>
            HONTRAN. <br /> DEV
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
