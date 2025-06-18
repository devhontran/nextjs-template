'use client';

import React, { useRef } from 'react';

import { useHeaderScroller } from '@/animation/hooks/useHeaderScorlling';
import LinkEffect from '@/components/LinkEffect';

import s from './Header.module.scss';
export default function Header(): React.ReactElement {
  const refHeader = useRef<HTMLDivElement>(null);

  useHeaderScroller({ refHeader });

  return (
    <header ref={refHeader} className={s.header}>
      <div className="container">
        <div className={s.header_container}>
          <div className={s.header_logo}>
            <LinkEffect href={'/'}>HONTRAN.DEV</LinkEffect>
          </div>
        </div>
      </div>
    </header>
  );
}
