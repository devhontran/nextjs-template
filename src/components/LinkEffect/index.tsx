'use client';
import Link from 'next/link';
import React from 'react';

import useRouterEffect from '@/animation/hooks/useRouterEffect';

interface Props {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}
export default function LinkEffect({
  href,
  className,
  target,
  children,
}: Props): React.ReactElement {
  const { routerPrefetch } = useRouterEffect();
  return (
    <Link
      href={href}
      target={target}
      className={className}
      onClick={(e): void => {
        routerPrefetch({ pathName: href, isPrefetch: false });
        e.preventDefault();
      }}
      passHref
    >
      {children}
    </Link>
  );
}
