'use client';

import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
} from 'react';

export enum TextGlitch {
  auto_stop = 'auto_stop',
  leave_stop = 'leave_stop',
  step_stop = 'step_stop',
}

interface IProps extends PropsWithChildren {
  type?: TextGlitch;
}

export default function InteractiveTextGlitch({
  children,
  type = TextGlitch.auto_stop,
}: IProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refTextContent = useRef<string>('');
  const refTime = useRef<NodeJS.Timeout | null>(null);
  const refTimAutoStop = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isLeaveStop = type === TextGlitch.leave_stop;
    const isAutoStop = type === TextGlitch.auto_stop;
    const isStepStop = type === TextGlitch.step_stop;

    if (!refContent.current) return;
    refTextContent.current = refContent.current.textContent || '';

    const text = '12345667890';
    const onEnter = (): void => {
      refTime.current && clearInterval(refTime.current);
      isAutoStop && refTimAutoStop.current && clearTimeout(refTimAutoStop.current);
      const currentText = refTextContent.current.split('');

      let index = -1;

      refTime.current = setInterval(() => {
        for (let i = Math.floor(index); i < currentText.length; i++) {
          if (currentText[i] !== ' ') {
            currentText[i] = text[Math.floor(Math.random() * text.length)];
          }
        }

        if (isStepStop) {
          currentText[Math.floor(index)] = refTextContent.current[Math.floor(index)];
          index += 0.3;
          if (Math.floor(index) >= refTextContent.current.length) {
            refTime.current && clearInterval(refTime.current);
          }
        }
        if (refContent.current) refContent.current.textContent = currentText.join('');
      }, 40);

      if (isAutoStop) {
        refTimAutoStop.current = setTimeout(() => {
          refTime.current && clearInterval(refTime.current);
          if (refContent.current) refContent.current.textContent = refTextContent.current;
        }, 600);
      }
    };
    const onLeave = (): void => {
      refTime.current && clearInterval(refTime.current);
      if (refContent.current) refContent.current.textContent = refTextContent.current;
    };

    refContent.current?.addEventListener('mouseenter', onEnter);
    isLeaveStop && refContent.current?.addEventListener('mouseleave', onLeave);

    return () => {
      refContent.current?.removeEventListener('mouseenter', onEnter);
      isLeaveStop && refContent.current?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return cloneElement(children, { ...{ ref: refContent } });
}
