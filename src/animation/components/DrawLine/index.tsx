import { ReactElement } from 'react';

import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

interface IDrawLineProps extends IAnimationProps {
  className?: string;
}

export default function MotionDrawLine({ className }: IDrawLineProps): ReactElement {
  return <div className={`${s.drawLine} ${className}`}></div>;
}
