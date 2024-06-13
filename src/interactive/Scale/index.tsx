'use client';

import { useIsDesktop } from '@Hooks/useWindowResize';
import useScale from '@Interactive/Scale/useScale';
import SimpleAnimation from '@Interactive/SimpleAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationElement } from '@/types/common';

interface IScale extends PropsWithChildren {
  opacityTo?: number;
  opacityFrom?: number;
  opacityActive?: boolean;
  scaleTo: number;
  scaleFrom: number;
  duration?: number;
}

function ScaleFull({
  children,
  duration,
  opacityTo,
  opacityFrom,
  scaleFrom,
  scaleTo,
  opacityActive,
}: IScale): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  useScale({
    refContent,
    duration,
    opacityTo,
    opacityFrom,
    scaleTo,
    scaleFrom,
    opacityActive,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}

export default function Scale(props: IScale): ReactElement {
  const isDesktop = useIsDesktop();
  return isDesktop ? <ScaleFull {...props} /> : <SimpleAnimation {...props} />;
}
