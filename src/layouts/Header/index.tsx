'use client';

import { useGSAP } from '@gsap/react';
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
      <div className={s.header_inner}></div>
    </header>
  );
}
