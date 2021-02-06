import { useState as useStateBase } from 'react';

export interface Hook<T> {
  value: T;
  set: (value: T) => void;
}

export function useState<T>(initialValue: T): Hook<T> {
  const [state, setState] = useStateBase<T>(initialValue);
  function set(value: T) {
    return setState(value);
  }
  return {
    value: state,
    set
  };
}
