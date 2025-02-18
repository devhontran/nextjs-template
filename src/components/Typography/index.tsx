import type { TypographyHeadingProps } from './Heading';
import TypographyHeading from './Heading';
import type { TypographyLabelProps } from './Label';
import TypographyLabel from './Label';
import type { TypographyParagraphProps } from './Paragraph';
import TypographyParagraph from './Paragraph';

export type TypographyProps =
  | TypographyHeadingProps
  | TypographyLabelProps
  | TypographyParagraphProps;

export type TypographyColor = 'inherit' | 'white' | 'black';

export { TypographyHeading, TypographyLabel, TypographyParagraph };
