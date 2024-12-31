import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const WithoutFooter = ({ children }: Props): React.ReactElement => {
  return <>{children}</>;
};

export default WithoutFooter;
