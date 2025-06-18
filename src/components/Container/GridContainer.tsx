import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import s from './Container.module.scss';

type Props = PropsWithChildren & BoxProps;

export const GridContainer = ({ children, className, ...props }: Props): React.JSX.Element => {
  return (
    <Box
      gridTemplateColumns={{
        base: 'repeat(6, 1fr)',
        sm: 'repeat(8, 1fr)',
        md: 'repeat(12, 1fr)',
      }}
      display="grid"
      width={'100%'}
      px={{
        base: '1.6rem',
        sm: '2.4rem',
        // md: '3.2rem',
      }}
      className={cn(s.container_grid, className)}
      {...props}
    >
      {children}
    </Box>
  );
};
