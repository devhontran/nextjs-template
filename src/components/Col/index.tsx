import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  span?:
    | {
        base?: number;
        sm?: number;
        md?: number;
      }
    | number
    | string;
  start?:
    | {
        base?: number;
        sm?: number;
        md?: number;
      }
    | number
    | string;
} & BoxProps;

export default function Col({ children, span, start, ...props }: Props): React.ReactElement {
  return (
    <Box gridColumn={span} gridColumnStart={start} {...props}>
      {children}
    </Box>
  );
}
