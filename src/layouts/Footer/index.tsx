import React from 'react';

import s from './Footer.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <>
      <footer className={s.footer}>
        <p>Footer</p>
      </footer>
    </>
  );
}
