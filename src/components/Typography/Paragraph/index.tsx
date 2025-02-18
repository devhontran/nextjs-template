import cn from 'classnames';
import type { PropsWithChildren } from 'react';

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
}: TypographyParagraphProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { color = 'white', size = 24, tag: Tag = 'p', className, children, ...restProps } = props;
  const paragraphClassNames = cn(
    styles.paragraph,
    color && styles[`paragraph__${color}`],
    styles[`paragraph__${size}`],
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
