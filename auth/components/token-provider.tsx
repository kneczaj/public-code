import React from 'react';
import { getInitialState } from '../models/user';
import { isNull } from '../../util';
import { createContext, createContextHook } from '../../utils/context-hook';
import { ProviderComponentProps } from '../../components/provider-group';
import { useState } from '../../hooks/state';
import { useHistory } from '../../routing/hooks/history';

export interface ContextProps {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
}

export const TokenContext = createContext<ContextProps>('user');
export const useToken = createContextHook(TokenContext);

export function TokenProvider({
  children
}: ProviderComponentProps): JSX.Element {
  const { push } = useHistory();
  const { value: token, set } = useState<string | null>(getInitialState());

  function login(token: string): void {
    set(token);
    localStorage.setItem('token', token);
  }

  function logout(): void {
    set(null);
    localStorage.removeItem('token');
    // TODO: should probably call graphql too!
    // clear search parameters from url
    push('/', () => ({}));
  }

  return (
    <TokenContext.Provider
      value={{
        token,
        isAuthenticated: !isNull(token),
        logout,
        login
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
