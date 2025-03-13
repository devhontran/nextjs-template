import cn from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';

import type { TypographyColor } from '..';
import styles from './styles.module.scss';

export interface TypographyParagraphProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 18 | 20 | 24;
  tag?: 'p' | 'span' | 'div';
  className?: string;
}

const TypographyParagraph = ({
  ref,
  ...props
}: TypographyParagraphProps & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}): ReactElement => {
  const { color = 'white', size = 24, tag: Tag = 'p', className, children, ...restProps } = props;
  const paragraphClassNames = cn(
    styles.paragraph,
    styles[`paragraph__${color}`],
    styles[`paragraph__${size.toString()}`],
    className
  );
  return (
    <Tag {...restProps} ref={ref} className={paragraphClassNames}>
      {children}
    </Tag>
  );
};

TypographyParagraph.displayName = 'TypographyParagraph';

export default TypographyParagraph;
