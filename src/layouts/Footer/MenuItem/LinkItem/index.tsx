'use client';

import { Box } from '@chakra-ui/react';
import classNames from 'classnames';
import gsap from 'gsap';
import { useRef } from 'react';

import LinkEffect from '@/components/LinkEffect';
import Label from '@/components/Typography/Label';
import { Color } from '@/enum/typo';

import s from '../MenuItem.module.scss';

interface LinkItemProps {
  item: {
    label: string;
    href: string;
  };
}
function LinkItem({ item }: LinkItemProps): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (): void => {
    gsap.to(refContent.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = (): void => {
    gsap.to(refContent.current, {
      yPercent: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  };
  return (
    <LinkEffect href={item.href} key={item.label} className={s.hover_line}>
      <div
        className={classNames(s.wrapper_link)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box willChange={'transform'} ref={refContent}>
          <Label
            size={24}
            color={Color.periwinkle_100}
            as={'h6'}
            fontWeight={'light'}
            className={s.wrapper_link_label}
          >
            {item.label}
          </Label>
          <Label
            size={24}
            color={Color.blue}
            as={'h6'}
            fontWeight={'light'}
            className={classNames(s.wrapper_link_label, s.wrapper_link_label_secondary)}
          >
            {item.label}
          </Label>
        </Box>
      </div>
    </LinkEffect>
  );
}

export default LinkItem;
