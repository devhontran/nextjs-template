import Image from 'next/image';
import React from 'react';

import DrawLine from '@/animation/components/DrawLine';
import { Container } from '@/components/Container';
import CopyRight from '@/layouts/Footer/CopyRight';
import { DATA_SOCIAL, MENU_FOOTER } from '@/layouts/Footer/data';
import MenuItem from '@/layouts/Footer/MenuItem';
import CtaSection from '@/modules/components/ctaSection';

import s from './Footer.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <>
      <CtaSection />
      <footer className={s.footer}>
        <Container>
          <DrawLine>
            <div className={s.line} />
          </DrawLine>
          <div className={s.footer_menu}>
            {MENU_FOOTER.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}

            <div className={s.footer_menu_social}>
              {DATA_SOCIAL.map((item) => (
                <a
                  href={item.href}
                  key={item.icon}
                  target="_blank"
                  className={s.footer_menu_social_item}
                >
                  <div className={s.footer_menu_social_item_icon}>
                    <Image unoptimized src={item.icon} alt={'icons'} width={24} height={24} />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <CopyRight />
        </Container>
      </footer>
    </>
  );
}
