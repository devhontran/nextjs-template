import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren & BoxProps;

export const Container = ({ children, ...props }: Props): React.JSX.Element => {
  return (
    <Box className={cn('container')} width={'100%'} {...props}>
      {children}
    </Box>
  );
};
