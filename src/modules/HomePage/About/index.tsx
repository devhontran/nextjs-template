import Link from 'next/link';

import { TypographyHeading, TypographyLabel, TypographyParagraph } from '@/components/Typography';

import s from './styles.module.scss';
export default function About(): React.ReactElement {
  return (
    <div className={s.about}>
      <div className="container">
        <div className="grid grid-cols-10 gap-24">
          <div className="col-span-6">
            <ul className={'flex gap-24'}>
              <li>
                <TypographyLabel className={s.labelContent}>
                  <span className="yellow">
                    x <strong>4</strong>
                  </span>{' '}
                  DEV AWARDS
                </TypographyLabel>
              </li>
              <li>
                <TypographyLabel className={s.labelContent}>
                  <span className="yellow">
                    x <strong>5</strong>
                  </span>{' '}
                  TheFWA
                </TypographyLabel>
              </li>
              <li>
                <TypographyLabel className={s.labelContent}>
                  <span className="yellow">
                    x <strong>5</strong>
                  </span>{' '}
                  SOTD
                </TypographyLabel>
              </li>
            </ul>
            <TypographyHeading className={s.mainContent}>
              I'm a creative developer and founder at hontran.dev, based in HCM City,
              <span className="yellow">Vietnam.</span>
            </TypographyHeading>
            <div className={s.contact}>
              <Link className={s.btnContact} href={'mailto:dev.hontran@gmail.com'}>
                Contact Me
              </Link>
            </div>
          </div>
          <div className="col-span-3 col-start-8">
            <TypographyLabel className={s.labelContent}>Principles and Values</TypographyLabel>
            <div className={s.value}>
              <span className={s.dot}>1.</span>
              <TypographyParagraph className={s.subContent}>
                Consistently delivering work with precision and openness is essential to building
                trust and reliability.
              </TypographyParagraph>
            </div>
            <div className={s.value}>
              <span className={s.dot}>2.</span>
              <TypographyParagraph className={s.subContent}>
                Crafting a high-quality website demands significant effort and a deep understanding
                of both design and functionality.
              </TypographyParagraph>
            </div>
            <div className={s.value}>
              <span className={s.dot}>3.</span>
              <TypographyParagraph className={s.subContent}>
                Maintaining focus is crucial, as every moment contributes to the overall success of
                a project.
              </TypographyParagraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
