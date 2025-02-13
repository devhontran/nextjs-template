import cn from 'classnames';
import { forwardRef, PropsWithChildren } from 'react';

import { TypographyColor } from '..';
import styles from './styles.module.scss';

export interface TypographyLabelProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 12 | 14 | 16 | 18 | 20;
  tag?: 'h5' | 'h6' | 'span' | 'p' | 'div';
  className?: string;
}

const TypographyLabel = forwardRef<HTMLHeadingElement, TypographyLabelProps>(
  (props: TypographyLabelProps, ref) => {
    const {
      color = 'white',
      size = 16,
      tag: Tag = 'h6',
      className,
      children,
      ...restProps
    } = props;
    const labelClassNames = cn(
      styles.label,
      color && styles[`label__${color}`],
      styles[`label__${size}`],
      className
    );
    return (
      <Tag {...restProps} ref={ref} className={labelClassNames}>
        {children}
      </Tag>
    );
  }
);

TypographyLabel.displayName = 'TypographyLabel';

export default TypographyLabel;
