import type { PropsWithChildren } from 'react';

import WithoutFooter from '@/layouts/WithoutFooter';

type Props = PropsWithChildren;

export default function Layout({ children }: Props): React.ReactElement {
  return <WithoutFooter>{children}</WithoutFooter>;
}
