import { RefObject, useRef } from 'react';

export type AnyFunction = (...args: readonly any[]) => any;

export function useCallbackRef<T extends AnyFunction>(callback: T): RefObject<T> {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return callbackRef;
}
