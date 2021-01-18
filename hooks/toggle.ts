import { useState } from "./state";


export interface Hook {
  value: boolean;
  setFalse: () => void;
  setTrue: () => void;
  toggle: () => void;
}

export function useToggle(initialValue: boolean): Hook {
  const state = useState<boolean>(initialValue);
  function toggle() {
    state.set(!state.value);
  }
  function setFalse() {
    state.set(false);
  }
  function setTrue() {
    state.set(true);
  }
  return {
    value: state.value,
    toggle,
    setFalse,
    setTrue
  };
}
