import type { PropsWithChildren } from 'react';
import React from 'react';

import Footer from '../Footer';

const WithFooter = ({ children }: PropsWithChildren): React.ReactElement => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default WithFooter;
