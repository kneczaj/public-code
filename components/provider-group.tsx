import React from 'react';
import { ReactNode } from 'react';
import { MaybeChildrenAsFn } from 'public/util';

export interface ChildrenFnProviderProps<TContextProps = unknown> {
  children: (context: TContextProps) => React.ReactNode;
}

export interface ProviderComponentProps<TContextProps = unknown> {
  children: MaybeChildrenAsFn<TContextProps>;
}

/**
 * A component the only function of which is to provide a context
 */
export type ProviderComponent = (props: ProviderComponentProps) => JSX.Element;

export interface Props {
  /**
   * The providers at the end will be the inner ones
   */
  providers: Array<ProviderComponent>;
  children: ReactNode;
}

/**
 * Limits indentation changes by grouping all provider components in one place
 */
export function ProviderGroup({ children, providers }: Props): JSX.Element {
  return providers.reduceRight<JSX.Element>(
    (children, Provider): JSX.Element => {
      return <Provider>{children}</Provider>;
    },
    <>{children}</>
  );
}
