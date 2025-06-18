import cn from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Color, Font } from '@/enum/typo';

import { Container } from '../Container';
import { Heading } from '../Typography';
import s from './HeroGrow.module.scss';

interface HeroGrowProps extends PropsWithChildren {
  className?: string;
  title: string;
  bigText?: boolean;
}

function HeroGrow({ className, children, title, bigText }: HeroGrowProps): React.ReactElement {
  return (
    <div className={cn(s.wrapper, className)}>
      <div className={s.wrapper_bg}>
        <Heading
          size={354}
          fontWeight={'bold'}
          color={Color.midnight_500}
          fontFamily={Font.f37Judge}
          textTransform={'uppercase'}
          className={cn(s.wrapper_bg_title, { [s.bigText]: bigText })}
        >
          {title}
        </Heading>
      </div>
      <div className={s.wrapper_inner}>
        <Container className={s.wrapper_inner_container}>{children}</Container>
      </div>
    </div>
  );
}

export default HeroGrow;
