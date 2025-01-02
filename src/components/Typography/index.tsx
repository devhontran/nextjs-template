import TypographyHeading, { TypographyHeadingProps } from './Heading';
import TypographyLabel, { TypographyLabelProps } from './Label';
import TypographyParagraph, { TypographyParagraphProps } from './Paragraph';

export type TypographyProps =
  | TypographyHeadingProps
  | TypographyLabelProps
  | TypographyParagraphProps;

export type TypographyColor = 'inherit' | 'white' | 'black';

export { TypographyHeading, TypographyLabel, TypographyParagraph };
