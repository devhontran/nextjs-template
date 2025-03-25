import cn from 'classnames';
import type { PropsWithChildren, ReactElement, RefObject } from 'react';

import type { TypographyColor } from '..';
import styles from './Label.module.scss';

export interface TypographyLabelProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 12 | 14 | 16 | 18 | 20;
  tag?: 'h5' | 'h6' | 'span' | 'p' | 'div';
  className?: string;
}

const TypographyLabel = ({
  ref,
  ...props
}: TypographyLabelProps & { ref?: RefObject<HTMLHeadingElement | null> }): ReactElement => {
  const { color = 'white', size = 16, tag: Tag = 'h6', className, children, ...restProps } = props;
  const labelClassNames = cn(
    styles.label,
    styles[`label__${color}`],
    styles[`label__${size.toString()}`],
    className
  );
  return (
    <Tag {...restProps} ref={ref} className={labelClassNames}>
      {children}
    </Tag>
  );
};

TypographyLabel.displayName = 'TypographyLabel';

export default TypographyLabel;
