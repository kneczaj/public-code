import { ComponentType } from 'react';

export interface DialogEventsBase {
  close: () => void;
}

export interface Hook<TEventHandlers, TProps = unknown, TReturnValue = void> {
  open: (props: TEventHandlers & TProps) => void;
  openAsync: (props: TProps) => Promise<TReturnValue>;
}

export interface DialogPropsBase {
  id: string;
}

export type DialogProps<TEvents = DialogEventsBase> = DialogPropsBase & TEvents;
export type DialogComponent<TEvents = DialogEventsBase> = ComponentType<
  DialogProps<TEvents>
>;
