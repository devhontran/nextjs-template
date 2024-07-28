'use client';

import { useGSAP } from '@gsap/react';
import React from 'react';

import s from './styles.module.scss';
import LinkEffect from '@Components/LinkEffect';

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
      <div className={s.header_inner}>
        <ul className={s.list}>
          <li>
            <LinkEffect href={'/'}>Home</LinkEffect>
          </li>
          <li>
            <LinkEffect href={'/about'}>About</LinkEffect>
          </li>
        </ul>
      </div>
    </header>
  );
}
