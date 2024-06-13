import { TypographyHeading, TypographyLabel } from '@Components/Typography';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import HeadingRotate from '@/interactive/Heading/Type/Rotate';
import HeadingSnap from '@/interactive/Heading/Type/Snap';
import ParagraphLineMask from '@/interactive/Paragraph/Mask';

import s from './styles.module.scss';

interface ITitle extends PropsWithChildren {
  title?: string;
  children: string | React.ReactNode;
  isBig?: boolean;
  isCentered?: boolean;
  pd?: 15 | 25 | 40;
  isParallaxScroll: boolean;
  isHeadingIntro?: boolean;
  className?: string;
}

export default function Title({
  isHeadingIntro,
  title,
  children,
  isBig,
  isCentered,
  pd = 40,
  isParallaxScroll,
  className,
}: ITitle): React.ReactElement {
  const titleClassNames = cn(pd && s[`pd__${pd}`]);
  return (
    <div className={cn(className, s.title_wrapper, isCentered ? s.center : '')}>
      {title && (
        <ParagraphLineMask delayEnter={0.15}>
          <TypographyLabel className={cn(s.title, titleClassNames)} color="lightGrey">
            {title}
          </TypographyLabel>
        </ParagraphLineMask>
      )}

      {isHeadingIntro ? (
        <HeadingSnap isParallaxScroll={isParallaxScroll}>
          <TypographyHeading size={isBig ? 140 : 80} className={cn(s.about_topDesc)}>
            {children}
          </TypographyHeading>
        </HeadingSnap>
      ) : (
        <HeadingRotate
          isParallaxScroll={isParallaxScroll}
          startInner="top bottom-=10%"
          endInner="bottom center"
        >
          <TypographyHeading size={isBig ? 140 : 80} className={cn(s.about_topDesc)}>
            {children}
          </TypographyHeading>
        </HeadingRotate>
      )}
    </div>
  );
}
