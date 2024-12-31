import { PropsWithChildren } from 'react';

import WithFooter from '@/layouts/WithFooter';

type Props = PropsWithChildren;

export default async function Layout({ children }: Props): Promise<React.ReactElement> {
  return <WithFooter>{children}</WithFooter>;
}
