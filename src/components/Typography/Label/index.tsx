import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import { TypographyColor } from '..';
import styles from './styles.module.scss';

export interface TypographyLabelProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 20;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const TypographyLabel = forwardRef<HTMLHeadingElement, TypographyLabelProps>(
  (props: TypographyLabelProps, ref) => {
    const {
      color = 'white',
      size = 20,
      tag: Tag = 'h1',
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
