import { TypographyHeading, TypographyLabel, TypographyParagraph } from '@/components/Typography';

import s from './styles.module.scss';
export default function About(): React.ReactElement {
  return (
    <div className={s.about}>
      <div className="container">
        <div className="grid grid-cols-10 gap-24">
          <div className="col-span-6">
            <TypographyHeading className={s.mainContent}>
              Hon Q. Tran is a creative developer and freelancer based in Ho Chi Minh, Vietnam.
            </TypographyHeading>
          </div>
          <div className="col-span-3 col-start-8">
            <TypographyLabel className={s.labelContent}>Principles and Values</TypographyLabel>
            <div className={s.value}>
              <span className={s.dot}>1.</span>
              <TypographyParagraph className={s.subContent}>
                I believe in the power of simplicity and the importance of being true to oneself. I
                believe in the power of simplicity and the importance of being true to oneself.
              </TypographyParagraph>
            </div>
            <div className={s.value}>
              <span className={s.dot}>2.</span>
              <TypographyParagraph className={s.subContent}>
                I believe in the power of simplicity and the importance of being true to oneself. I
                believe in the power of simplicity and the importance of being true to oneself.
              </TypographyParagraph>
            </div>
            <div className={s.value}>
              <span className={s.dot}>3.</span>
              <TypographyParagraph className={s.subContent}>
                I believe in the power of simplicity and the importance of being true to oneself. I
                believe in the power of simplicity and the importance of being true to oneself.
              </TypographyParagraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
