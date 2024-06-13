import TypographyBody, { TypographyBodyProps } from './Body';
import TypographyHeading, { TypographyHeadingProps } from './Heading';
import TypographyLabel, { TypographyLabelProps } from './Label';
import TypographyParagraph, { TypographyParagraphProps } from './Paragraph';

export type TypographyProps =
  | TypographyBodyProps
  | TypographyHeadingProps
  | TypographyLabelProps
  | TypographyParagraphProps;

export type TypographyColor =
  | 'inherit'
  | 'white'
  | 'black'
  | 'blue'
  | 'greyBlue'
  | 'lightGrey'
  | 'mediumGrey'
  | 'darkGrey';

// export interface TypographyProps extends React.HTMLProps<HTMLOrSVGElement> {
//   color?: TypographyColor;
//   tag?: React.ElementType;
//   target?: string;
//   href?: string;
// }

export { TypographyBody, TypographyHeading, TypographyLabel, TypographyParagraph };
