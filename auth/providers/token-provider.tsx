import React from 'react';
import { getInitialState } from '../models/user';
import { isNull } from '../../util';
import { createContext, createContextHook } from '../../utils/context-hook';
import { ProviderComponentProps } from '../../components/provider-group';
import { useState } from '../../hooks/state';
import { useHistory } from '../../routing/hooks/history';
import { LOGIN } from "public/auth/models/urls";
import { useNotifications } from "public/notifications/notifications-provider";
import { useCT } from "public/hooks/translation";

export interface ContextProps {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
  /**
   * To be run on authentication problems, also when token is invalid because of redeploy
   */
  redirectToLogin: () => void;
}

export const TokenContext = createContext<ContextProps>('user');
export const useToken = createContextHook(TokenContext);

/**
 * Low level authentication info which holds authentication token, and synchronises it with localStorage
 * @param children
 * @constructor
 */
export function TokenProvider({
  children
}: ProviderComponentProps): JSX.Element {
  const { push } = useHistory();
  const { value: token, set } = useState<string | null>(getInitialState());
  const {show} = useNotifications();
  const ct = useCT();

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
    show({
      type: 'success',
      message: ct('logged out')
    });
  }

  function redirectToLogin(): void {
    set(null);
    localStorage.removeItem('token');
    push(LOGIN, () => ({ from: window.location.href }));
    show({
      type: "info",
      message: ct('login first')
    });
  }

  return (
    <TokenContext.Provider
      value={{
        token,
        isAuthenticated: !isNull(token),
        logout,
        login,
        redirectToLogin
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
