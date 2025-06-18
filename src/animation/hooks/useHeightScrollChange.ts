import { useSignalEffect } from '@preact/signals-react';

import { useUiContext } from '@/animation/contexts/UiContext';

export function useHeightScrollChange(callback: (height: number) => void): void {
  const { scrollHeight } = useUiContext();

  useSignalEffect(() => {
    callback(scrollHeight.value);
  });
}

export function useWidthWindowChange(callback: (width: number) => void): void {
  const { width } = useUiContext();

  useSignalEffect(() => {
    callback(width.value);
  });
}
