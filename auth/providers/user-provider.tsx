import React from 'react';
import { createContext, createContextHook } from '../../utils/context-hook';
import { ProviderComponentProps } from '../../components/provider-group';
import { useHistory } from '../../routing/hooks/history';
import { useNotifications } from '../../notifications/notifications-provider';
import { useToken } from 'public/auth/providers/token-provider';
import { useMeQuery } from 'generated/graphql';
import { User } from '../models/user';

export interface ContextProps {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
}

export const UserContext = createContext<ContextProps>('user');
export const useUser = createContextHook(UserContext);

export function UserProvider({
  children
}: ProviderComponentProps): JSX.Element {
  const { show } = useNotifications();
  const { push } = useHistory();
  const { logout: logoutBase, isAuthenticated, login } = useToken();
  const { data: { me } = {}, loading } = useMeQuery();

  function logout(): void {
    logoutBase();
    push('/', () => ({}));
    show({
      type: 'success',
      message: 'Wylogowano'
    });
  }

  if (loading) {
    return <>loading...</>;
  }

  return (
    <UserContext.Provider
      value={{
        user: me || null,
        isAuthenticated,
        logout,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
