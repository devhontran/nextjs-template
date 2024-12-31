import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const WithoutFooter = ({ children }: Props): React.ReactElement | React.ReactNode => {
  return children;
};

export default WithoutFooter;
