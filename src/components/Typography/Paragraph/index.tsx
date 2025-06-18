import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';

import { Color } from '@/enum/typo';

import styles from './Paragraph.module.scss';

interface ParagraphProps extends TextProps, PropsWithChildren {
  size?: 12 | 14 | 16 | 18 | 20 | 24 | 32 | 48 | 64 | 84 | 100;
  as?: 'h5' | 'h6' | 'span' | 'p' | 'div';
}

const Paragraph = ({
  ref,
  size = 18,
  children,
  color = Color.periwinkle_100,
  fontWeight = 'normal',
  as = 'div',
  ...props
}: ParagraphProps & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}): ReactElement => {
  const paragraphClassNames = cn(
    styles.paragraph,
    styles[`paragraph__${size.toString()}`],
    props.className
  );
  return (
    <Text
      {...props}
      color={color}
      as={as}
      ref={ref}
      className={paragraphClassNames}
      fontWeight={fontWeight}
    >
      {children}
    </Text>
  );
};

Paragraph.displayName = 'Paragraph';

export default Paragraph;
