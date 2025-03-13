import cn from 'classnames';
import type { PropsWithChildren, ReactElement, RefObject } from 'react';

import type { TypographyColor } from '..';
import styles from './styles.module.scss';

export interface TypographyHeadingProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 48 | 80 | 140 | 200;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  className?: string;
  id?: string;
}

const TypographyHeading = ({
  ref,
  ...props
}: TypographyHeadingProps & { ref?: RefObject<HTMLHeadingElement | null> }): ReactElement => {
  const { color = 'white', size = 80, tag: Tag = 'h1', className, children, ...restProps } = props;
  const headingClassNames = cn(
    styles.heading,
    styles[`heading__${color}`],
    styles[`heading__${size.toString()}`],
    className
  );
  return (
    <Tag {...restProps} ref={ref} className={headingClassNames} id={restProps.id}>
      {children}
    </Tag>
  );
};

TypographyHeading.displayName = 'TypographyHeading';

export default TypographyHeading;
