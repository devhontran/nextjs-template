import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import { TypographyColor } from '..';
import styles from './styles.module.scss';

export interface TypographyHeadingProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 80 | 140 | 300 | 420;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  className?: string;
  id?: string;
}

const TypographyHeading = forwardRef<HTMLHeadingElement, TypographyHeadingProps>(
  (props: TypographyHeadingProps, ref) => {
    const {
      color = 'white',
      size = 80,
      tag: Tag = 'h1',
      className,
      children,
      ...restProps
    } = props;
    const headingClassNames = cn(
      styles.heading,
      color && styles[`heading__${color}`],
      styles[`heading__${size}`],
      className
    );
    return (
      <Tag {...restProps} ref={ref} className={headingClassNames} id={restProps.id}>
        {children}
      </Tag>
    );
  }
);

TypographyHeading.displayName = 'TypographyHeading';

export default TypographyHeading;
