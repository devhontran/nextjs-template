import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren, ReactElement, RefObject } from 'react';

import { Color } from '@/enum/typo';

import styles from './Heading.module.scss';

interface HeadingProps extends TextProps, PropsWithChildren {
  size?: 48 | 64 | 80 | 140 | 112 | 200 | 230 | 276 | 284 | 354 | 138;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

const Heading = ({
  ref,
  size = 80,
  as = 'h4',
  color = Color.periwinkle_100,
  children,
  ...props
}: HeadingProps & { ref?: RefObject<HTMLHeadingElement | null> }): ReactElement => {
  const headingClassNames = cn(
    styles.heading,
    styles[`heading__${size.toString()}`],
    props.className
  );

  return (
    <Text {...props} color={color} ref={ref} as={as} className={headingClassNames}>
      {children}
    </Text>
  );
};

Heading.displayName = 'Heading';
export default Heading;
