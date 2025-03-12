import type { ReadonlySignal } from '@preact/signals-core';
import { computed, effect } from '@preact/signals-core';
import type { DependencyList } from 'react';
import { useEffect, useMemo, useRef } from 'react';

export function useSignalEffectDeps(cb: () => null | (() => void), deps: DependencyList): void {
  const callback = useRef<() => null | (() => void)>(cb);

  // Update ref in useEffect to avoid accessing during render
  useEffect(() => {
    callback.current = cb;
  }, [cb]);

  useEffect(() => {
    return effect(() => callback.current());
  }, deps);
}

export function useComputedDeps<T>(compute: () => T, deps: DependencyList): ReadonlySignal<T> {
  const computeRef = useRef<() => T>(compute);

  useEffect(() => {
    computeRef.current = compute;
  }, [compute]);

  return useMemo(() => computed<T>(() => computeRef.current()), [deps]);
}
