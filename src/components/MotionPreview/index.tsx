'use client';

import { PropsWithChildren, ReactElement } from 'react';

import s from './styles.module.scss';

interface IMotionPreviewProps extends PropsWithChildren {
  heading: string;
}
export default function MotionPreview({ heading, children }: IMotionPreviewProps): ReactElement {
  return (
    <div className={s.motionPreview}>
      <h2 className={s.motionPreview_heading}>{heading}</h2>
      <div className={s.motionPreview_body}>{children}</div>
    </div>
  );
}
