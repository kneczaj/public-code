import React from 'react';
import { createContext, createContextHook } from '../../utils/context-hook';
import { ProviderComponentProps } from '../../components/provider-group';
import { useHistory } from '../../routing/hooks/history';
import { useNotifications } from '../../notifications/notifications-provider';
import { useToken } from 'public/auth/providers/token-provider';
import { LoginMutationVariables, MeQuery, useLoginMutation, useMeQuery } from 'generated/graphql';
import { User } from '../models/user';
import { RequestStateBase } from "public/requests/models/state";
import { createRequestWrapper } from "public/requests/request-wrapper/create-request-wrapper";
import { MutationSubmitResult } from "public/graphql/hooks/mutation";

export interface ContextProps extends RequestStateBase<MeQuery | null> {
  isAuthenticated: boolean;
  logout: () => void;
  login: (payload: LoginMutationVariables) => MutationSubmitResult;
}

export const UserApiContext = createContext<ContextProps>('user api');
export const useUserApi = createContextHook(UserApiContext);

export const [UserRequestWrapper, useUser] = createRequestWrapper<MeQuery, User>(useUserApi, response => response.me, 'user');

export function UserProvider({
  children
}: ProviderComponentProps): JSX.Element {
  const {show} = useNotifications();
  const {push} = useHistory();
  const {logout: logoutBase, isAuthenticated, login: setToken} = useToken();
  const meState = useMeQuery();

  const {submit: login} = useLoginMutation({
    onCompleted: payload => {
      if (!payload.login.jwt) {
        throw new Error('No jwt token in response');
      }
      setToken(payload.login.jwt)
    }
  });

  function logout(): void {
    logoutBase();
    push('/', () => ({}));
    show({
      type: 'success',
      message: 'Wylogowano'
    });
  }

  return (
    <UserApiContext.Provider
      value={{
        ...meState,
        isAuthenticated,
        logout,
        login
      }}
    >
      {children}
    </UserApiContext.Provider>
  );
}
