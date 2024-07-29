'use client';

import { cloneElement, isValidElement, PropsWithChildren, ReactElement, useRef } from 'react';

export default function InteractiveTextGlitch({ children }: PropsWithChildren): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  if (!isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return cloneElement(children, { ...{ ref: refContent } });
}
