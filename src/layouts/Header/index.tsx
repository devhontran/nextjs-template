'use client';

import LinkEffect from '@Components/LinkEffect';
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
      <div className={s.header_inner}>
        <ul className={s.list}>
          <li>
            <LinkEffect href={'/'}>HOME</LinkEffect>
          </li>
          <li>
            <LinkEffect href={'/about'}>ABOUT</LinkEffect>
          </li>
          {/* <li>
            <LinkEffect href={'/about'}>About</LinkEffect>
          </li>
          <li>
            <LinkEffect href={'/motions'}>Motion</LinkEffect>
          </li>
          <li>
            <LinkEffect href={'/interactive'}>Interactive</LinkEffect>
          </li>
          <li>
            <LinkEffect href={'/gallery-3d-scrolling'}>Gallery 3d Scrolling</LinkEffect>
          </li> */}
        </ul>
      </div>
    </header>
  );
}
