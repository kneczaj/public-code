import { useQuery as useQueryBase } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { QueryHookOptions } from '@apollo/client/react/types/types';
import { isNullOrUndefined, isUndefined } from 'public/util';
import { convertApolloError2Errors } from 'public/graphql/utils';
import { AuthenticationError, Errors } from 'public/requests/models/errors';
import { QueryResult } from 'public/graphql/models';
import { Notifications } from 'public/notifications/notifications-provider';
import { useCT } from 'public/hooks/translation';
import { Token } from 'public/auth/providers/token-provider';

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  const response = useQueryBase(query, options);
  const { redirectToLogin } = Token.useContext();
  const { show } = Notifications.useContext();
  const ct = useCT();
  const error: Errors | null = (() => {
    try {
      return isUndefined(response.error)
        ? isNullOrUndefined(response.data) && !response.loading
          ? { messages: [`Empty response from server`] }
          : null
        : convertApolloError2Errors(response.error);
    } catch (e) {
      if (e instanceof AuthenticationError) {
        redirectToLogin();
      } else {
        show({ type: 'error', message: ct('unknown error occurred') });
      }
      return null;
    }
  })();
  return {
    ...response,
    data: response.data || null,
    error: error || null
  };
}
