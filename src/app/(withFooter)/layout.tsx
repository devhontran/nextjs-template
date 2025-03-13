import type { PropsWithChildren } from 'react';

import WithFooter from '@/layouts/WithFooter';

type Props = PropsWithChildren;

export default function Layout({ children }: Props): React.ReactElement {
  return <WithFooter>{children}</WithFooter>;
}
