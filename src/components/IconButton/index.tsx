import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import gsap from 'gsap';
import { MutableRefObject, type ReactNode, useImperativeHandle, useRef } from 'react';

import s from './styles.module.scss';

export type IHover = { onHover: () => void };
interface IIconButton
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'color'> {
  icon: ReactNode;
  variant: 'contained' | 'outlined';
  refFuns: MutableRefObject<IHover | undefined>;
  onClick: () => void;
}

export default function IconButton({
  icon,
  variant,
  className,
  onClick,
  refFuns,
  ...props
}: IIconButton): React.ReactElement {
  const iconButtonRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP(() => {}, { scope: iconButtonRef });

  const onHover = contextSafe((): void => {
    const listIcon = gsap.utils.toArray('.js-icon-button');
    gsap.killTweensOf(listIcon);
    listIcon[0] &&
      gsap.fromTo(
        listIcon[0],
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          delay: 0.1,
          ease: 'power3.out',
          duration: 1.2,
          overwrite: 'auto',
        }
      );
    listIcon[1] &&
      gsap.fromTo(
        listIcon[1],
        {
          yPercent: 0,
        },
        {
          yPercent: -110,
          ease: 'power3.out',
          duration: 1.2,
          overwrite: 'auto',
        }
      );
  });
  useImperativeHandle(refFuns, () => ({
    onHover,
  }));
  return (
    <button
      ref={iconButtonRef}
      id="trackButton"
      style={{ pointerEvents: 'auto' }}
      className={cn(s[variant], s.iconBtn, className)}
      onClick={onClick}
      onMouseEnter={onHover}
      {...props}
    >
      <span className={s.iconBtn_groups}>
        <span className={cn(s.iconBtn_groups_icon, ' block js-icon-button')}>{icon}</span>
        <span
          className={cn(
            s.iconBtn_groups_icon,
            s.iconBtn_groups_icon__clone,
            'block js-icon-button'
          )}
        >
          {icon}
        </span>
      </span>
    </button>
  );
}
