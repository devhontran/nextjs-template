import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import Label from '@/components/Typography/Label';
import { Color } from '@/enum/typo';

import s from './Tag.module.scss';
interface Props {
  label: string;
  className?: string;
  haveDot?: boolean;
  isDark?: boolean;
  icon?: string;
}

function Tag({ ...props }: Props): React.ReactElement {
  const { label = 'text', className, haveDot = true, isDark, icon } = props;
  return (
    <div className={cn(s.wrapper, isDark && s.wrapper_dark, className)}>
      {haveDot && <div className={s.wrapper_dot} />}
      {icon && (
        <div className={s.wrapper_icon}>
          <Image unoptimized src={icon} alt={label} width={12} height={12} />
        </div>
      )}

      <Label
        size={14}
        fontWeight={'medium'}
        textTransform={'capitalize'}
        color={Color.charcoal_100}
      >
        {label}
      </Label>
    </div>
  );
}

export default Tag;
