import React, { useCallback } from 'react';
import { createContext, createContextHook } from '../../utils/context-hook';
import { ProviderComponentProps } from '../../components/provider-group';
import { useToken } from 'public/auth/providers/token-provider';
import {
  LoginMutationVariables,
  MeQuery,
  RegisterMutationVariables,
  useLoginMutation,
  useRegisterMutation,
  UsersPermissionsLoginPayload
} from 'generated/graphql';
import { RequestStateBase } from 'public/requests/models/state';
import { MutationSubmitResult } from 'public/graphql/hooks/mutation';
import { mergeErrors } from 'public/requests/models/errors';

export interface ContextProps
  extends Omit<RequestStateBase<MeQuery | null>, 'data'> {
  isAuthenticated: boolean;
  logout: () => void;
  redirectToLogin: () => void;
  login: (payload: LoginMutationVariables) => MutationSubmitResult;
  register: (payload: RegisterMutationVariables) => MutationSubmitResult;
}

export const AuthContext = createContext<ContextProps>('authenticatio');
export const useAuth = createContextHook(AuthContext);

/**
 * High level authentication provider which calls GraphQL API
 * @param children
 * @constructor
 */
export function AuthProvider({
  children
}: ProviderComponentProps): JSX.Element {
  const {
    logout,
    isAuthenticated,
    login: setToken,
    redirectToLogin
  } = useToken();
  const onLogin = useCallback(
    (payload: Pick<UsersPermissionsLoginPayload, 'jwt'>) => {
      if (!payload.jwt) {
        throw new Error('No jwt token in response');
      }
      setToken(payload.jwt);
    },
    [setToken]
  );

  const {
    submit: login,
    loading: loginLoading,
    error: loginError
  } = useLoginMutation({
    onCompleted: payload => onLogin(payload.login)
  });
  const {
    submit: register,
    loading: registerLoading,
    error: registerError
  } = useRegisterMutation({
    onCompleted: payload => onLogin(payload.register)
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        login,
        register,
        loading: loginLoading || registerLoading,
        error: mergeErrors([loginError, registerError]),
        redirectToLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
