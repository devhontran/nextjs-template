import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren, ReactElement, RefObject } from 'react';

import { Color } from '@/enum/typo';

import styles from './Label.module.scss';

interface LabelProps extends TextProps, PropsWithChildren {
  size?: 12 | 14 | 16 | 18 | 20 | 24 | 32 | 34 | 48 | 64;
  as?: 'h5' | 'h6' | 'span' | 'p' | 'div';
}

const Label = ({
  ref,
  size = 16,
  as = 'div',
  fontWeight = 'medium',
  color = Color.periwinkle_100,
  children,
  ...props
}: LabelProps & { ref?: RefObject<HTMLHeadingElement | null> }): ReactElement => {
  const labelClassNames = cn(styles.label, styles[`label__${size.toString()}`], props.className);

  return (
    <Text
      {...props}
      as={as}
      color={color}
      ref={ref}
      className={labelClassNames}
      fontWeight={fontWeight}
    >
      {children}
    </Text>
  );
};

Label.displayName = 'Label';

export default Label;
