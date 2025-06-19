import type { BoxProps } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import s from './Container.module.scss';

type Props = PropsWithChildren & BoxProps;

export const GridContent = ({ children, className, ...props }: Props): React.JSX.Element => {
  return (
    <Grid
      gridTemplateColumns={{
        base: 'repeat(6, 1fr)',
        sm: 'repeat(8, 1fr)',
        md: 'repeat(11, 1fr)',
      }}
      width={'100%'}
      className={cn(s.container_grid, className)}
      {...props}
    >
      {children}
    </Grid>
  );
};
