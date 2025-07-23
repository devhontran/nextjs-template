import { useSignalEffect } from '@preact/signals-react';

import { useUiContext } from '../contexts/UiContext';

export default function useOnWidthResize(callback: () => void): void {
  const { width } = useUiContext();
  useSignalEffect(() => {
    if (width.value) callback();
  });
}
