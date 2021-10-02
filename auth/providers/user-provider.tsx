import React, { useCallback } from 'react';
import { createContext, createContextHook } from '../../utils/context-hook';
import { ProviderComponentProps } from '../../components/provider-group';
import { useHistory } from '../../routing/hooks/history';
import { useNotifications } from '../../notifications/notifications-provider';
import { useToken } from 'public/auth/providers/token-provider';
import {
  LoginMutationVariables,
  MeQuery, RegisterMutationVariables,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
  UsersPermissionsLoginPayload
} from 'generated/graphql';
import { User } from '../models/user';
import { RequestStateBase } from "public/requests/models/state";
import { createRequestWrapper } from "public/requests/request-wrapper/create-request-wrapper";
import { MutationSubmitResult } from "public/graphql/hooks/mutation";
import { mergeErrors } from "public/requests/models/errors";

export interface ContextProps extends RequestStateBase<MeQuery | null> {
  isAuthenticated: boolean;
  logout: () => void;
  login: (payload: LoginMutationVariables) => MutationSubmitResult;
  register: (payload: RegisterMutationVariables) => MutationSubmitResult;
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
  const {loading: meLoading, error: meError, ...meState} = useMeQuery();
  const onLogin = useCallback((payload: Pick<UsersPermissionsLoginPayload, 'jwt'>) => {
    if (!payload.jwt) {
        throw new Error('No jwt token in response');
      }
      setToken(payload.jwt)
  }, [setToken])

  const {submit: login, loading: loginLoading, error: loginError} = useLoginMutation({
    onCompleted: payload => onLogin(payload.login)
  });
  const { submit: register } = useRegisterMutation({
    onCompleted: payload => onLogin(payload.register)
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
        login,
        register,
        loading: meLoading || loginLoading,
        error: mergeErrors([meError, loginError])
      }}
    >
      {children}
    </UserApiContext.Provider>
  );
}
