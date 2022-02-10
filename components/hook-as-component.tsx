import { ProviderComponentProps } from 'public/components/provider-group';
import { maybePassProps } from 'public/util';

export interface Props<THook, TArgs extends Array<any>>
  extends ProviderComponentProps<THook> {
  useHook: (...args: TArgs) => THook;
  args: TArgs;
}

export function HookAsComponent<THook, TArgs extends Array<any>>({
  children,
  useHook,
  args
}: Props<THook, TArgs>): JSX.Element {
  const value = useHook(...args);
  return <>{maybePassProps(children, value)}</>;
}
