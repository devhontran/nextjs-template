'use client';

import Image from 'next/image';
import React from 'react';

import Label from '@/components/Typography/Label';
import { Color } from '@/enum/typo';
import useWinResize from '@/hooks/useWinResize';

import s from './CopyRight.module.scss';

const COPYRIGHT_TEXT = {
  design: 'Design by Uncommon',
  copyright: '©Mark Woodland 2025. All rights reserved',
};

const MASK_IMAGE = {
  src: '/images/mask_footer.svg',
  alt: 'mask_footer',
  width: 1392,
  height: 207,
};

function CopyRight(): React.JSX.Element {
  const { isMobile } = useWinResize();
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper_content}>
        <Label size={14} color={Color.periwinkle_300} fontWeight={'light'} textTransform={'none'}>
          Design by{' '}
          <a
            href="https://uncommonstudio.com.au/"
            rel="noreferrer noopener"
            target="_blank"
            className={s.wrapper_content_link}
          >
            Uncommon
          </a>
        </Label>
        <Label size={14} color={Color.periwinkle_300} fontWeight={'light'}>
          {COPYRIGHT_TEXT.copyright}
        </Label>
      </div>

      <div className={s.wrapper_mask}>
        <Image
          unoptimized
          {...MASK_IMAGE}
          src={isMobile ? '/images/mask_footer_mobile.svg' : '/images/mask_footer.svg'}
        />
      </div>
    </div>
  );
}

export default CopyRight;
