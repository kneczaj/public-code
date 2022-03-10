export interface Hook<TEventHandlers, TProps = unknown, TReturnValue = void> {
  open: (props: TEventHandlers & TProps) => void;
  openAsync: (props: TProps) => Promise<TReturnValue>;
}
