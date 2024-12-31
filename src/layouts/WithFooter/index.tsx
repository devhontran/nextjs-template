import React, { PropsWithChildren } from 'react';

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
