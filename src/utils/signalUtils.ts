import type { ReadonlySignal } from '@preact/signals-core';
import { computed, effect } from '@preact/signals-core';
import type { DependencyList } from 'react';
import { useEffect, useMemo } from 'react';

export function useSignalEffectDeps(cb: () => void, deps: DependencyList): void {
  useEffect(() => {
    return effect(cb);
  }, [cb, deps]);
}

export function useComputedDeps<T>(compute: () => T, deps: DependencyList): ReadonlySignal<T> {
  return useMemo(() => computed<T>(() => compute()), [compute, deps]);
}
