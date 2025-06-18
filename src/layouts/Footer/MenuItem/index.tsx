'use client';

import React, { useRef } from 'react';

import Label from '@/components/Typography/Label';
import { Color } from '@/enum/typo';

import LinkItem from './LinkItem';
import s from './MenuItem.module.scss';

interface MenuItemProps {
  label: string;
  links: {
    label: string;
    href: string;
  }[];
}

function MenuItem({ label, links }: MenuItemProps): React.ReactElement {
  const refLabel = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);

  return (
    <div className={s.wrapper} ref={refContent}>
      <Label
        ref={refLabel}
        size={14}
        fontWeight={'medium'}
        textTransform={'capitalize'}
        color={Color.periwinkle_300}
      >
        {label}
      </Label>
      {links.map((item) => (
        <LinkItem key={item.label} item={item} />
      ))}
    </div>
  );
}

export default MenuItem;
