import cn from 'classnames';
import React from 'react';

import Fade from '@/interactive/Fade';
import Line from '@/interactive/Line';

import { TypographyBody } from '../Typography';
import styles from './styles.module.scss';

type InputSize = 'medium';

type HtmlInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;

interface Props extends HtmlInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  size?: InputSize;
  delay: number;
}

export default function Input({
  label,
  placeholder,
  className,
  size = 'medium',
  disabled,
  delay,
  ...props
}: Props): React.ReactElement {
  return (
    <Fade delayTrigger={delay} direction={'bottom'} from={'20%'} isObserver={true}>
      <div
        className={cn(styles.container, styles[size], disabled ? styles.disabled : null, className)}
      >
        <TypographyBody size={'input'} className={cn('small', styles.label)}>
          {label}
        </TypographyBody>
        <input placeholder={placeholder} className={styles.input} {...props} />
        <Line direction="bottom" color="silver" delayTrigger={delay + 0.15} />
      </div>
    </Fade>
  );
}
