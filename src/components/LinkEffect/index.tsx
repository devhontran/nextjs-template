'use client';
import Link from 'next/link';
import React from 'react';

import useRouterEffect from '@/animation/hooks/useRouterEffect';

interface Props {
  ref?: React.RefObject<HTMLAnchorElement | null>;
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
export default function LinkEffect({
  ref,
  href,
  className,
  target,
  children,
  onMouseEnter,
  onMouseLeave,
}: Props): React.ReactElement {
  const { routerPrefetch } = useRouterEffect();
  return (
    <Link
      ref={ref}
      href={href}
      target={target}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
