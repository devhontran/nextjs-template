'use client';

import React from 'react';
import s from './styles.module.scss';
import { useGSAP } from '@gsap/react';

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
      <h1>Header</h1>
    </header>
  );
}
