import { useState } from 'react';
import { List } from 'immutable';

export interface Hook<T> {
  value: T[];
  add: (toAdd: T) => void;
  remove: (toRemove: T) => void;
}

export function useArray<T>(initialValue: T[]): Hook<T> {
  const [state, setState] = useState(List(initialValue));
  function add(toAdd: T) {
    return setState(state.push(toAdd));
  }
  function remove(toRemove: T) {
    const idx = state.findIndex(value => value === toRemove);
    if (idx === -1) {
      return;
    }
    return setState(state.remove(idx));
  }
  return {
    value: [...state],
    add,
    remove
  };
}
