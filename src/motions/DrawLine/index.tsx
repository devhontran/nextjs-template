import { ReactElement } from 'react';

import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

interface IDrawLineProps extends IAnimationProps {
  className?: string;
}

export default function DrawLine({ className }: IDrawLineProps): ReactElement {
  return <div className={`${s.line} ${className}`}></div>;
}
